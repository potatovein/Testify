const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Deck = require("../models/Deck");

router.post("/create", async (req, res) => {
    const {
        deckId,
        ...questionData
    } = req.body;

    try {
        const question = await Question.create(questionData)
        
        if (deckId){
            const deck = await Deck.findById(deckId);
            if (!deck) {
                return res.status(404).json({error: "No deck found"});
            }

            if (!deck.questionids.includes(question._id)){
                deck.questionids.push(question._id);
                await deck.save();
            }
        }   

        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;