import { RecommendationInputObject } from "../../types/RecommendationObjectTypes";

abstract class AbstractRecommender {
  ResultDictonary: unknown = {};

  constructor() {
    this.updateAlgorithm();
  }

  abstract recommend(input: RecommendationInputObject): unknown;

  abstract updateAlgorithm(): void;
}

export default AbstractRecommender;
