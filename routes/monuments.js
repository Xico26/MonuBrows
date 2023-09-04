const express = require("express")
const router = express.Router()
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateMonument } = require("../middleware")
const multer = require("multer")
const {storage} = require("../cloudinary/index")
const upload = multer({storage})

const monumentsController = require("../controllers/monuments")

router.route("/")
  .get(catchAsync(monumentsController.index))
  .post(isLoggedIn, upload.array("monument[image]"), validateMonument, catchAsync(monumentsController.createMonument));

router.get("/new", isLoggedIn, monumentsController.renderNewForm);

router.post("/search", catchAsync(monumentsController.searchMonuments))

router.post("/filter", catchAsync(monumentsController.filterMonuments))

router.route("/:id")
  .get(catchAsync(monumentsController.monumentDetails))
  .put(isLoggedIn, isAuthor, upload.array("monument[image]"), validateMonument, catchAsync(monumentsController.editMonument))
  .delete(isLoggedIn, isAuthor, catchAsync(monumentsController.deleteMonument))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(monumentsController.renderEditForm));

module.exports = router