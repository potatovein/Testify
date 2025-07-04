const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const Question = require("../models/Question");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        importQuestions();
    })
    .catch(err => console.error("MongoDB connection error:", err));

/**
    {
        "201": [
            {
                "Title": "Physiology of Skeletal Muscle",
                "Thread": "Physiology",
                "MCQ": [
                    {
                        "Question": "Why do muscles require a good blood supply?",
                        "Options": [
                            "High demand for oxygen",
                            "To maintain flexibility",
                            "To reduce body temperature during exercise",
                            "To store excess nutrients for later use",
                            "To provide ATP for contraction"
                        ],
                        "Answer": "High demand for oxygen"
                    },]
                "SAQ": [
                {
                    "Question": "How do muscle fibres maintain a high blood supply and energy? ",
                    "Answer": "High blood supply (1) from blood vessels to each muscle bundle. High mitochondria count (1) in muscle fibers.",
                    "TotalMarks": 2
                },]
            }]
    }
*/

function importQuestions(){
    const data = JSON.parse(fs.readFileSync("../data/QBank.json", "utf-8"));

    const questionsToInsert = [];
    
    for (const mod in data) {
        data[mod].forEach(lesson => {
            const topic = lesson["Title"];
            const thread = lesson["Thread"];

            lesson["MCQ"].forEach(mcq => {
                if (mcq["Answer"] != null){
                    questionsToInsert.push({
                        type: "MCQ",
                        questionText: mcq.Question,
                        options: mcq.Options,
                        correctAnswer: mcq.Answer,
                        topic,
                        thread,
                        difficulty: "N/A",
                        deckTitle: "PHR"+mod,
                        isPublic: true,
                        createdBy: null
                    })
                }
            });
            lesson["SAQ"].forEach(saq => {
                if (saq["Answer"] != null){
                    questionsToInsert.push({
                        type: "SAQ",
                        questionText: saq.Question,
                        modelAnswer: saq.Answer,
                        topic,
                        thread,
                        totalMarks: saq.TotalMarks || null,
                        difficulty : "N/A",
                        deckTitle: "PHR"+mod,
                        isPublic: true,
                        createdBy: null
                    })
                }
            })
        })
    }

    Question.insertMany(questionsToInsert).then(res => {
        console.log("Inserted $(res.length) questions");
        process.exit();
    }).catch (err => {
        console.error("Error inserting questions:", err);
        process.exit(1);
    })
}