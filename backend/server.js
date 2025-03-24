const express = require("express");
const cors = require("cors");
const RecommendationService = require("./RecommenderSystem/RecommendationService");
const ElementRepository = require("./GamificationElementSystem/ElementRepository");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3050;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const recommendationService = new RecommendationService();
const elementRepository = new ElementRepository();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;

app.post("/recommendation", (req, res) => {
  const { input } = req.body; // Extract input from the request body
  console.log(input);

  if (!input) {
    console.log("no input parameter");
    return res.status(400).send("Input parameter is required");
  }

  const recommendation = recommendationService.recommend(input);
  res.json({ recommendation: recommendation });
});

app.get("/recommender", (req, res) => {
  console.log("/recommender not implemented yet");
  const recommendation = recommendationService.getRecommender();
  res.status(501).send(recommendation);
});

app.get("/gamification-elements", (req, res) => {
  console.log("/gamification-elements not implemented yet");
  const elements = elementRepository.getAllElements();
  res.status(501).send(elements);
});

app.get("/gamification-element", (req, res) => {
  console.log("/gamification-element not implemented yet");
  const element = elementRepository.getElementById();
  res.status(501).send(element);
});
