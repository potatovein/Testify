const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.post("/add", async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;