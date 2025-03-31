import { RecommendationObject } from "../RecommendationObject";

abstract class AbstractRecommender {
  constructor() {
    if (new.target === AbstractRecommender) {
      throw new Error("Cannot instantiate an abstract class directly");
    } else {
      this.updateAlgorithm();
    }
  }

  abstract recommend(input: RecommendationObject): number;

  abstract updateAlgorithm(): void;
}

export default AbstractRecommender;
