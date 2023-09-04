const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Review = require("./review")

// https://res.cloudinary.com/dkticcrbh/image/upload/w_200/v1693305187/MonuBrows/tuckhcnxzfrx4vlc5hac.jpg

const ImageSchema = new Schema({
    url: String,
    fileName: String
})

ImageSchema.virtual("thumbnail").get(function() {
    return this.url.replace("/upload", "/upload/w_200")
})

ImageSchema.virtual("indexImg").get(function() {
    return this.url.replace("/upload", "/upload/c_scale,w_300,h_200")
})

const opts = { toJSON: {virtuals: true}}

const MonumentSchema = new Schema ({
    name: String,
    price: Number,
    description: String,
    city: String,
    country: String,
    geometry: {
        type: {
            type: String,
            enum: ["Point"], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts)

MonumentSchema.virtual("properties.popupMarkup").get(function () {
    return `<b><a href="/monuments/${this._id}">${this.name}</a></b>
    <p>${this.city}, ${this.country}</p>`
})

MonumentSchema.post("findOneAndRemove", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Monument", MonumentSchema)