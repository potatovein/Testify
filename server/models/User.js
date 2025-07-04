const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true},
    email: {type: String, required: false, unique: true, lowercase: true},
    passHash: {type: String, required: false},
    role: {type: String, enum: ["user", "admin"], default: "user"}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)