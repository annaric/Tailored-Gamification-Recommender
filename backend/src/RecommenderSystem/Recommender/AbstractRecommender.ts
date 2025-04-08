import { RecommendationInputObject } from "../../types/RecommendationObjectTypes";

abstract class AbstractRecommender {
  constructor() {
    if (new.target === AbstractRecommender) {
      throw new Error("Cannot instantiate an abstract class directly");
    } else {
      this.updateAlgorithm();
    }
  }

  abstract recommend(input: RecommendationInputObject): unknown;

  abstract updateAlgorithm(): void;
}

export default AbstractRecommender;
