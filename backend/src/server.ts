import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import RecommendationService from "./RecommenderSystem/RecommendationService";
import {
  RecommendationInputDTO,
  RecommendationResultDTO,
} from "./types/RecommendationObjectTypes";
import path from "path";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3050", 10);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../public/images")));

const recommendationService = new RecommendationService();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/recommendation", (req: Request, res: Response) => {
  const input: RecommendationInputDTO = req.body;
  console.log("input", input);

  if (!input || Object.keys(input).length === 0) {
    console.log("no input parameter");
    res.status(400).send("Input parameter is required");
  }

  const recommendation: RecommendationResultDTO =
    recommendationService.recommend(input);
  res.json({ recommendation: recommendation });
});

app.get("/recommender", (req: Request, res: Response) => {
  console.log(req.body);
  const recommender = recommendationService.getRecommender();
  res.json({ recommender });
});

app.get("/api/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../public/images", imageName);

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).send("Image not found");
    }
  });
});

export default app;
