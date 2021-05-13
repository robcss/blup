const express = require("express")
const router = express.Router();

const catchAsync = require("../utils/catchAsync")

const { validateFountain, isLoggedIn, isAuthor } = require("../middleware")

const fountains = require("../controllers/fountains-controller")


router.route("/")
    .get(catchAsync(fountains.showIndex))
    .post(isLoggedIn({ isOut: "redirect" }), validateFountain, catchAsync(fountains.createFountain))

router.get("/new", isLoggedIn({ isOut: "redirect" }), fountains.renderNewForm)

router.route("/:id")
    .get(catchAsync(fountains.showFountain))
    .put(isLoggedIn({ isOut: "redirect" }), isAuthor, validateFountain, catchAsync(fountains.updateFountain))
    .delete(isLoggedIn({ isOut: "redirect" }), isAuthor, catchAsync(fountains.deleteFountain))

router.get("/:id/edit", isLoggedIn({ isOut: "redirect" }), isAuthor, catchAsync(fountains.renderEditForm))

module.exports = router;