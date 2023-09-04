const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    }
}) 

userSchema.plugin(passportLocalMongoose) // adds username and password

module.exports = mongoose.model("User", userSchema)