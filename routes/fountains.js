const express = require("express")
const router = express.Router();

const catchAsync = require("../utils/catchAsync")
const ExpressError = require("../utils/ExpressError")

const { addressSchema } = require("../joiSchemas")

const Fountain = require("../models/fountain")


const validateFountain = (req, res, next) => {

    const { address } = req.body

    const { error } = addressSchema.validate(address);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


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

    res.redirect(`/fountains/${newFountain._id}`)
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id).populate('comments')
    res.render("fountains/show", { fountain })
}))

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id)
    res.render("fountains/edit", { fountain })
}))


router.put("/:id", validateFountain, catchAsync(async (req, res) => {
    const { id } = req.params
    const { address } = req.body

    const fountain = await Fountain.findByIdAndUpdate(id, { address })

    res.redirect(`/fountains/${fountain._id}`)
}))


router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params

    await Fountain.findByIdAndDelete(id)

    res.redirect("/fountains")
}))

module.exports = router;