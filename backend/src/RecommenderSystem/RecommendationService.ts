import RecommendationAssembler from "./RecommendationAssembler";
import {
  RecommendationInputObject,
  RecommendationEndResult,
} from "../types/RecommendationObjectTypes";

class RecommendationService {
  recommendationAssembler: RecommendationAssembler;

  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  recommend(input: RecommendationInputObject): RecommendationEndResult {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  getRecommender() {
    console.log("getRecommender not implemented yet");
    return "not implemented yet";
  }
}

export default RecommendationService;
