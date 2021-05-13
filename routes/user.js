const express = require('express');
const router = express.Router();
const passport = require('passport')

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn } = require("../middleware")

const users = require("../controllers/users-controller")

router.route('/register')
    .get(isLoggedIn({ isIn: "forbidLogin" }), users.renderRegisterForm)
    .post(isLoggedIn({ isIn: "forbidLogin" }), catchAsync(users.register));

router.route('/login')
    .get(isLoggedIn({ isIn: "forbidLogin" }), users.renderLoginForm)
    .post(isLoggedIn({ isIn: "forbidLogin" }), passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router


