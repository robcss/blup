const express = require('express');
const router = express.Router();
const passport = require('passport')

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn } = require("../middleware")

const users = require("../controllers/users-controller")

router.get('/register', isLoggedIn({ isIn: "forbidLogin" }), users.renderRegisterForm)


router.post('/register', isLoggedIn({ isIn: "forbidLogin" }), catchAsync(users.register));


router.get('/login', isLoggedIn({ isIn: "forbidLogin" }), users.renderLoginForm)

router.post('/login', isLoggedIn({ isIn: "forbidLogin" }), passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


router.get('/logout', users.logout)

module.exports = router


