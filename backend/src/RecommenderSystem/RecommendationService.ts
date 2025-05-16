import RecommendationAssembler from "./RecommendationAssembler";
import {
  RecommendationInputObject,
  RecommendationEndResult,
} from "../types/RecommendationObjectTypes";
import { RecommenderValuesObject } from "../types/RecommenderObjectTypes";

class RecommendationService {
  recommendationAssembler: RecommendationAssembler;

  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  recommend(input: RecommendationInputObject): RecommendationEndResult {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  getRecommender() {
    return RecommenderValuesObject;
  }
}

export default RecommendationService;
