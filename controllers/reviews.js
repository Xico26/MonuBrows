const Monument = require("../models/monument");
const Review = require("../models/review");

module.exports.addReview = async (req, res) => {
  const { id } = req.params;
  const monument = await Monument.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  monument.reviews.push(review);
  await review.save();
  await monument.save();
  req.flash("success", "Successefully added the review!");
  res.redirect(`/monuments/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewID } = req.params;
  const review = await Monument.findByIdAndUpdate(id, {
    $pull: { reviews: reviewID },
  });
  await Review.findByIdAndDelete(reviewID);
  req.flash("success", "Successefuly deleted the review!");
  res.redirect(`/monuments/${id}`);
};