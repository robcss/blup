const ExpressError = require("./utils/ExpressError")

const { addressSchema, commentSchema } = require("./joiSchemas")


module.exports.validateFountain = (req, res, next) => {

    const { address } = req.body

    const { error } = addressSchema.validate(address);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


module.exports.validateComment = (req, res, next) => {

    const commentBody = req.body

    const { error } = commentSchema.validate({ body: commentBody });
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


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

module.exports.isLoggedIn = ({ isIn = null, isOut = null }) => {
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


// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {

//         req.flash('error', 'You must be signed in!');
//         return res.redirect('/login');
//     }
//     next();
// }


// module.exports.isLoggedInComments = (req, res, next) => {
//     if (!req.isAuthenticated()) {

//         req.flash('loginRedirect', 'You must be signed in!');
//         return res.status(401).send("")
//     }
//     next();
// }
