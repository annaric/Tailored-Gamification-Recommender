const express = require("express");
const cors = require("cors"); // Import cors
const RecommendationManager = require("./RecommenderSystem/RecommendationManager");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3050;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

const recommendationManager = new RecommendationManager();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;

app.get("/recommendation", (req, res) => {
  console.log(req);
  const { input } = req.query.input;
  console.log(input);

  if (!input) {
    console.log("no input parameter");
    return res.status(400).send("Input parameter is required");
  }

  // Example recommendation logic based on input and algorithm settings
  const recommendation = recommendationManager.recommend(input);
  res.json({ recommendation: recommendation }); // Ensure the response includes the recommendation property
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

app.post("/recommendation", (req, res) => {
  const { input } = req.body; // Extract input from the request body
  console.log(input);

  if (!input) {
    console.log("no input parameter");
    return res.status(400).send("Input parameter is required");
  }

  // Example recommendation logic based on input and algorithm settings
  const recommendation = recommendationManager.recommend(input);
  res.json({ recommendation: recommendation }); // Ensure the response includes the recommendation property
});
