const express = require("express")
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize')

const { helmet, contentSecurityPolicyOpts } = require("./helmet")

const ExpressError = require("../utils/ExpressError")

const User = require('../models/user');

const userRoutes = require("../routes/user")
const fountainsRoutes = require("../routes/fountains")
const commentsRoutes = require("../routes/comments")
const verificationsRoutes = require("../routes/verifications")
const reportsRoutes = require("../routes/reports")

const isEnvProduction = require("../utils/isEnvProduction")

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

    const sessionConfig = {
        name: "session",
        secret: 'replaceMePlease',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: isEnvProduction(),
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
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
