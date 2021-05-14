
const loggedStrategies = {
    forbidLogin(req, res) {
        return res.redirect('/fountains');
    }
}

const notLoggedStrategies = {
    redirect(req, res) {
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    },

    sendStatus(req, res) {
        req.flash('loginRedirect', 'You must be signed in!');
        return res.status(401).send("")
    }

}

const isUserLoggedIn = ({ isIn = null, isOut = null }) => {
    return function (req, res, next) {

        if (!req.isAuthenticated()) {//if user is NOT logged in
            const strategy = isOut

            if (!notLoggedStrategies[strategy]) { // if strategy doesn't exist  proceed
                return next()
            }

            return notLoggedStrategies[strategy](req, res) //else use specified strategy

        }

        const strategy = isIn

        if (loggedStrategies[strategy]) {//if user is logged in and there is a logged in strategy then use it
            return loggedStrategies[strategy](req, res)
        }

        next(); // else proceed
    }
}

module.exports = isUserLoggedIn