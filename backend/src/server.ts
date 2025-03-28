import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import RecommendationService from "./RecommenderSystem/RecommendationService";
import ElementRepository from "./GamificationElementSystem/ElementRepository";
import { RecommendationObject } from "./RecommenderSystem/RecommendationObject"; 

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

app.post("/recommendation", (req: Request<object, object, RecommendationObject>, res: Response) => {
  console.log(req.body);
  const input = req.body;
  console.log(input);

  if (!input) {
    console.log("no input parameter");
    return res.status(400).send("Input parameter is required");
  }

  const recommendation = recommendationService.recommend(input);
  res.json({ recommendation: recommendation });
});

app.get("/recommender", (req: Request, res: Response) => {
  console.log("/recommender not implemented yet");
  console.log(req.body);
  const recommendation = recommendationService.getRecommender();
  res.status(501).send(recommendation);
});

app.get("/gamification-elements", (req: Request, res: Response) => {
  console.log("/gamification-elements not implemented yet");
  console.log(req.body);
  const elements = elementRepository.getAllElements();
  res.status(501).send(elements);
});

app.get("/gamification-element", (req: Request, res: Response) => {
  console.log("/gamification-element not implemented yet");
  console.log(req.body);
  const element = elementRepository.getElementById();
  res.status(501).send(element);
});

export default app;
