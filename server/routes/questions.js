const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Deck = require("../models/Deck");

router.post("/createdeck", async(req, res) => {
    try {
        const deck = new Deck(req.body);
        await deck.save();
        res.status(201).json(deck);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

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