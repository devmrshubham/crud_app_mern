const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,

        },
        gender: {
            type: String,

        },
        age: {
            type: Number,
            min: 18,
            max: 30,
            required: true
        },
        image: {
            type: String
        }
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;