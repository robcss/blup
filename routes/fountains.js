const express = require("express")
const router = express.Router()

const { upload } = require("../loaders/multer")

const catchAsync = require("../utils/catchAsync")

const isUserLoggedIn = require("../middleware/isUserLoggedIn")
const { validateFountain, isUserFountainAuthor } = require("../middleware/fountains-middleware")

const fountains = require("../controllers/fountains-controller")

router.route("/")
    .get(catchAsync(fountains.showIndex))
    .post(upload.array("image", 3), (req, res) => {
        res.send(req.files)
    })
// .post(isUserLoggedIn({ isOut: "redirect" }), validateFountain, catchAsync(fountains.createFountain))

router.get("/new", isUserLoggedIn({ isOut: "redirect" }), fountains.renderNewForm)

router.route("/:id")
    .get(catchAsync(fountains.showFountain))
    .put(isUserLoggedIn({ isOut: "redirect" }), catchAsync(isUserFountainAuthor), validateFountain, catchAsync(fountains.updateFountain))
    .delete(isUserLoggedIn({ isOut: "redirect" }), catchAsync(isUserFountainAuthor), catchAsync(fountains.deleteFountain))

router.get("/:id/edit", isUserLoggedIn({ isOut: "redirect" }), catchAsync(isUserFountainAuthor), catchAsync(fountains.renderEditForm))

module.exports = router;