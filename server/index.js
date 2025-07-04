const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/questions");
const deckRoutes = require("./routes/decks");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.use("/api/decks", deckRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Testify Backend Running"));

app.listen(5000, () => console.log("Server running on 5000"));