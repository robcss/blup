const ExpressError = require("./utils/ExpressError")
const isVerifiedByUser = require("./utils/isVerifiedByUser")

const { addressSchema, commentSchema, reportSchema } = require("./joiSchemas")

const Fountain = require("./models/fountain")
const Comment = require("./models/comment")


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


module.exports.validateReport = (req, res, next) => {

    const reportBody = req.body

    const { error } = reportSchema.validate(reportBody);
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


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const fountain = await Fountain.findById(id);
    if (!fountain.author.equals(req.user._id)) {
        req.flash('error', "You don't have permission to do that!");
        return res.redirect(`/fountains/${id}`);
    }
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', "You don't have permission to do that!");
        return res.status(401).send("")
    }
    next();
}

module.exports.isVerifiedByCurrentUser = async (req, res, next) => {
    const fountainId = req.params.id
    const userId = req.user._id

    const alreadyVerified = await isVerifiedByUser(fountainId, userId)

    if (alreadyVerified && req.method === "POST") {

        req.flash('error', "You already verified this fountain!");
        return res.status(401).send("")
    }

    if (!alreadyVerified && req.method === "DELETE") {

        req.flash('error', "You never verified this fountain!");
        return res.status(401).send("")
    }

    next();
}
