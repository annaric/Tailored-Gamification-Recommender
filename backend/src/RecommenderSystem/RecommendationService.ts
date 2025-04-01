import RecommendationAssembler from "./RecommendationAssembler";
import { RecommendationObject, RecommendationResult } from "./RecommendationObjectTypes";

class RecommendationService {
  recommendationAssembler: RecommendationAssembler;

  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  recommend(input: RecommendationObject): RecommendationResult {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  getRecommender() {
    console.log("getRecommender not implemented yet");
    return "not implemented yet";
  }
}

export default RecommendationService;
