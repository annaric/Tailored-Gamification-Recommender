import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import RecommendationService from "./RecommenderSystem/RecommendationService";
import {
  RecommendationObject,
  RecommendationResult,
} from "./types/RecommendationObjectTypes";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3050", 10);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const recommendationService = new RecommendationService();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/recommendation", (req: Request, res: Response) => {
  const input: RecommendationObject = req.body;

  if (!input) {
    console.log("no input parameter");
    res.status(400).send("Input parameter is required");
  }

  const recommendation: RecommendationResult =
    recommendationService.recommend(input);
  res.json({ recommendation: recommendation });
});

app.get("/recommender", (req: Request, res: Response) => {
  console.log("/recommender not implemented yet");
  console.log(req.body);
  const recommendation = recommendationService.getRecommender();
  res.status(501).send(recommendation);
});

export default app;
