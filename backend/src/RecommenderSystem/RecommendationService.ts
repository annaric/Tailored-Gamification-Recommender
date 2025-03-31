import RecommendationAssembler from "./RecommendationAssembler";
import { RecommendationObject } from "./RecommendationObject";

class RecommendationService {
  recommendationAssembler: RecommendationAssembler;

  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  recommend(input: RecommendationObject) {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  getRecommender() {
    console.log("getRecommender not implemented yet");
    return "not implemented yet";
  }
}

export default RecommendationService;
