import express from "express";
import cors from "cors";
import "dotenv/config";
import RecommendationService from "./RecommenderSystem/RecommendationService";
import ElementRepository from "./GamificationElementSystem/ElementRepository";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3050", 10);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const recommendationService = new RecommendationService();
const elementRepository = new ElementRepository();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/recommendation", (req: any, res: any) => {
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

app.get("/recommender", (req: any, res: any) => {
  console.log("/recommender not implemented yet");
  const recommendation = recommendationService.getRecommender();
  res.status(501).send(recommendation);
});

app.get("/gamification-elements", (req: any, res: any) => {
  console.log("/gamification-elements not implemented yet");
  const elements = elementRepository.getAllElements();
  res.status(501).send(elements);
});

app.get("/gamification-element", (req: any, res: any) => {
  console.log("/gamification-element not implemented yet");
  const element = elementRepository.getElementById();
  res.status(501).send(element);
});

export default app;
