const express = require("express");
const RecommendationManager = require("./RecommenderSystem/RecommendationManager");
const app = express();
const recommendationManager = RecommendationManager();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;

app.get("/recommendation", (req, res) => {
  const { input } = req.query;
  console.log(input);

  if (!input) {
    return res.status(400).send("Input parameter is required");
  }

  // Example recommendation logic based on input and algorithm settings
  const recommendation = recommendationManager.recommend(input);
  res.json({ recommendation });
});

app.post("/update-algorithm", (req, res) => {
  const newSettings = req.body;

  if (typeof newSettings !== "object" || !newSettings) {
    return res.status(400).send("Invalid input. Expected a dictionary.");
  }

  // Update algorithm settings
  algorithmSettings = { ...algorithmSettings, ...newSettings };

  res.json({ message: "Algorithm settings updated", algorithmSettings });
});
