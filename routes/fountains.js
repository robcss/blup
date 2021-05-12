const express = require("express")
const router = express.Router();

const catchAsync = require("../utils/catchAsync")
const isVerifiedByUser = require("../utils/isVerifiedByUser")

const { validateFountain, isLoggedIn, isAuthor } = require("../middleware")

const Fountain = require("../models/fountain")


router.get("/", catchAsync(async (req, res) => {
    const fountains = await Fountain.find({}).populate('author')
    res.render("fountains/index", { fountains })
}))

router.get("/new", isLoggedIn({ isOut: "redirect" }), (req, res) => {
    res.render("fountains/new")
})

router.post("/", isLoggedIn({ isOut: "redirect" }), validateFountain, catchAsync(async (req, res) => {
    const { address } = req.body
    const newFountain = new Fountain({ address })
    newFountain.author = req.user._id
    await newFountain.save()

    req.flash('success', 'Fountain added!')
    res.redirect(`/fountains/${newFountain._id}`)
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate({
        path: 'reports',
        populate: [
            { path: 'author', select: '_id username' },
            { path: 'resolvedAuthor', select: '_id username' }
        ],
        options: { sort: { resolved: 1, createdAt: -1 } }
    }).populate('author').populate("verifications", "username")

    if (!fountain) {
        req.flash("error", "Can't find this fountain!")
        return res.redirect("/fountains")
    }

    let verifiedByCurrentUser = false

    if (req.isAuthenticated()) {
        const userId = req.user._id

        verifiedByCurrentUser = await isVerifiedByUser(id, userId)
    }

    res.render("fountains/show", { fountain, verifiedByCurrentUser })
}))

router.get("/:id/edit", isLoggedIn({ isOut: "redirect" }), isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id)

    if (!fountain) {
        req.flash("error", "Can't find this fountain!")
        return res.redirect("/fountains")
    }

    res.render("fountains/edit", { fountain })
}))


router.put("/:id", isLoggedIn({ isOut: "redirect" }), isAuthor, validateFountain, catchAsync(async (req, res) => {
    const { id } = req.params
    const { address } = req.body

    const fountain = await Fountain.findByIdAndUpdate(id, { address })

    req.flash('success', 'Fountain successfully updated!')
    res.redirect(`/fountains/${fountain._id}`)
}))


router.delete("/:id", isLoggedIn({ isOut: "redirect" }), isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params

    await Fountain.findByIdAndDelete(id)

    req.flash('success', 'Fountain successfully deleted!')
    res.redirect("/fountains")
}))

module.exports = router;