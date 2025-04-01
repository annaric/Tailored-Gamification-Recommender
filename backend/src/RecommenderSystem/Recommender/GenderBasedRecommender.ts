import { RecommendationObject } from "../RecommendationObjectTypes";
import AbstractRecommender from "./AbstractRecommender";
let CompetitionDictonary: { female: number; male: number };

class GenderBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationObject): number {
    if (input.gender === "female" || input.gender === "male") {
      return CompetitionDictonary[input.gender];
    }
    throw new Error("Invalid input");
  }

  updateAlgorithm() {
    CompetitionDictonary = { female: 1.5, male: 0.5 };
  }
}

export default GenderBasedRecommender;
