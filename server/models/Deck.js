const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    isPrivate: {type: Boolean, default: false},
    questionIds: [{type: mongoose.Schema.Types.ObjectId, ref: "Question"}]
})