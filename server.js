const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Page Routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// API Routes
app.get("/api/workouts", async (req, res) => {
    const workouts = await db.Workout.find({});
    res.json(workouts);
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body);
});

app.put("/api/workouts/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});