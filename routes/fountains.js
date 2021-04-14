const express = require("express")
const router = express.Router();

const catchAsync = require("../utils/catchAsync")

const { validateFountain } = require("../middleware")

const Fountain = require("../models/fountain")


router.get("/", catchAsync(async (req, res) => {
    const fountains = await Fountain.find({})
    res.render("fountains/index", { fountains })
}))

router.get("/new", (req, res) => {
    res.render("fountains/new")
})

router.post("/", validateFountain, catchAsync(async (req, res) => {
    const { address } = req.body
    const newFountain = new Fountain({ address })
    await newFountain.save()

    req.flash('success', 'Fountain added!')
    res.redirect(`/fountains/${newFountain._id}`)
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id).populate('comments')

    if (!fountain) {
        req.flash("error", "Can't find this fountain!")
        return res.redirect("/fountains")
    }


    res.render("fountains/show", { fountain })
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id)

    if (!fountain) {
        req.flash("error", "Can't find this fountain!")
        return res.redirect("/fountains")
    }

    res.render("fountains/edit", { fountain })
}))


router.put("/:id", validateFountain, catchAsync(async (req, res) => {
    const { id } = req.params
    const { address } = req.body

    const fountain = await Fountain.findByIdAndUpdate(id, { address })

    req.flash('success', 'Fountain successfully updated!')
    res.redirect(`/fountains/${fountain._id}`)
}))


router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params

    await Fountain.findByIdAndDelete(id)

    req.flash('success', 'Fountain successfully deleted!')
    res.redirect("/fountains")
}))

module.exports = router;