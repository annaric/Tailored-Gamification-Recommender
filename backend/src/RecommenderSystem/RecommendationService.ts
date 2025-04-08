import RecommendationAssembler from "./RecommendationAssembler";
import {
  RecommendationInputObject,
  RecommendationResult,
} from "../types/RecommendationObjectTypes";

class RecommendationService {
  recommendationAssembler: RecommendationAssembler;

  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  recommend(input: RecommendationInputObject): RecommendationResult {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  getRecommender() {
    console.log("getRecommender not implemented yet");
    return "not implemented yet";
  }
}

export default RecommendationService;
