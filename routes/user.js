const express = require('express');
const router = express.Router();
const passport = require('passport')

const catchAsync = require("../utils/catchAsync")

const isUserLoggedIn = require("../middleware/isUserLoggedIn")

const users = require("../controllers/users-controller")

router.route('/register')
    .get(isUserLoggedIn({ isIn: "forbidLogin" }), users.renderRegisterForm)
    .post(isUserLoggedIn({ isIn: "forbidLogin" }), catchAsync(users.register));

router.route('/login')
    .get(isUserLoggedIn({ isIn: "forbidLogin" }), users.renderLoginForm)
    .post(isUserLoggedIn({ isIn: "forbidLogin" }), passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router


