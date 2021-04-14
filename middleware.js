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


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {

        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}


module.exports.isLoggedInComments = (req, res, next) => {
    if (!req.isAuthenticated()) {

        req.flash('loginRedirect', 'You must be signed in to post and delete comments!');
        return res.status(401).send("")
    }
    next();
}
