const express = require("express")
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize')

const { session, sessionConfig } = require("./session")
const { helmet, contentSecurityPolicyOpts } = require("./helmet")

const isEnvProduction = require("../utils/isEnvProduction")

const ExpressError = require("../utils/ExpressError")

const User = require('../models/user');

const userRoutes = require("../routes/user")
const fountainsRoutes = require("../routes/fountains")
const commentsRoutes = require("../routes/comments")
const verificationsRoutes = require("../routes/verifications")
const reportsRoutes = require("../routes/reports")

module.exports = (rootName) => {
    const app = express();

    app.engine('ejs', ejsMate)
    app.set('view engine', 'ejs');
    app.set('views', path.join(rootName, 'views'))

    app.use(express.urlencoded({ extended: true }))
    app.use(methodOverride('_method'))
    app.use(express.text())

    app.use(express.static(path.join(rootName, 'public')))

    app.use(mongoSanitize({
        replaceWith: '_'
    }))

    if (isEnvProduction()) {
        app.set('trust proxy', 1) //heroku uses a proxy
    }
    app.use(session(sessionConfig))
    app.use(flash())

    app.use(helmet())
    app.use(helmet.contentSecurityPolicy(contentSecurityPolicyOpts))

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    const dontReturnToRoutes = ["/", "/login", "/register"]

    app.use((req, res, next) => {
        if (!dontReturnToRoutes.includes(req.originalUrl)) {
            req.session.returnTo = req.originalUrl
        }
        res.locals.currentUser = req.user
        res.locals.success = req.flash('success')
        res.locals.error = req.flash('error')
        res.locals.loginRedirect = req.flash('loginRedirect')
        next()
    })

    app.use('/', userRoutes)
    app.use("/fountains", fountainsRoutes)
    app.use("/fountains/:id/comments", commentsRoutes)
    app.use("/fountains/:id/verify", verificationsRoutes)
    app.use("/fountains/:id/report", reportsRoutes)

    app.get("/", (req, res) => {
        res.render("home")
    })

    app.get("/about", (req, res) => {
        res.render("about")
    })

    app.all('*', (req, res, next) => {
        next(new ExpressError('Page Not Found', 404))
    })

    app.use((err, req, res, next) => {
        const { statusCode = 500 } = err;
        if (!err.message) err.message = 'Something Went Wrong!'
        res.status(statusCode).render('error', { err })
    })

    return app
}
