const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    isPrivate: {type: Boolean, default: false},
    questionids: [{type: mongoose.Schema.Types.ObjectId, ref: "Question"}]
})

module.exports = mongoose.model("Deck", DeckSchema)