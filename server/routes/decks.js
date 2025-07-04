const express = require("express");
const router = express.Router();
const Deck = require("../models/Deck");

router.post("/create", async(req, res) => {
    try {
        const deck = Deck.create(req.body);
        res.status(201).json(deck);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});


module.exports = router;