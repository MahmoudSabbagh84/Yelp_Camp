const Review = require('../models/Review');
const Campground = require('../models/campground');




module.exports.createReview = async(req,res) =>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Created New Review')
    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.deleteReview = async(req,res) =>{
    const {id , reviewId} = req.params;
    Campground.findByIdAndUpdate(id , {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`campgrounds/${id}`);
};