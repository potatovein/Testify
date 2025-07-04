const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
     
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    isPublic: {type: Boolean, default: false},
    deckTitle: {type: String, required: true},

    type: {type: String, enum: ["MCQ", "SAQ"], required: true},
    questionText: String,
    options: [String], // MCQ only
    correctAnswer: String, // MCQ only
    modelAnswer: String, // SAQ only
    totalMarks: Number, // SAQ only
    topic: String,
    thread: String,
    difficulty: {type: String, enum: ["Easy", "Medium", "Hard", "N/A"]},
});

module.exports = mongoose.model("Question", QuestionSchema);