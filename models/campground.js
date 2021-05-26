const mongoose = require('mongoose');
const Review = require('./Review')
const Schema = mongoose.Schema;

// https://res.cloudinary.com/dxbouoiqv/image/upload/v1621671605/YelpCamp/zuu4l0oltxtgnak4lbji.jpg

const ImageSchema = new Schema({
        url: String,
        filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload' , '/upload/w_200');
})

//Construct Schema for mongoose and data
const CampgroundSchema = new Schema({
    title: String,
    images:[ImageSchema],
    geometry:{
        type:{
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type:[Number],
            required: true
        }
    },
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    reviews: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete' , async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground' , CampgroundSchema);