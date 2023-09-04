const express = require("express");
const router = express.Router({mergeParams: true}); //to get access to the ID
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware")

const reviewsController = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(reviewsController.addReview));

router.delete("/:reviewID", isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview));

module.exports = router