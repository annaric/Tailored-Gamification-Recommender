"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const RecommendationService_1 = __importDefault(
  require("./RecommenderSystem/RecommendationService"),
);
const ElementRepository_1 = __importDefault(
  require("./GamificationElementSystem/ElementRepository"),
);
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3050", 10);
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const recommendationService = new RecommendationService_1.default();
const elementRepository = new ElementRepository_1.default();
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
app.post("/recommendation", (req, res) => {
  console.log(req);
  console.log(req.body);
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
exports.default = app;
