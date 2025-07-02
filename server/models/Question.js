const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    type: {type: String, enum: ["MCQ", "SAQ"], required: true},
    questionText: String,
    options: [String], // MCQ only
    correctAnswer: String, // MCQ only
    modelAnswer: String, // SAQ only
    topic: String,
    thread: String,
    difficulty: {type: String, enum: ["Easy", "Medium", "Hard"]},
});

module.exports = mongoose.model("Question", QuestionSchema);