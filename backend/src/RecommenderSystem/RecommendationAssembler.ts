import {
  RecommendationInputObject,
  RecommendationResult,
} from "../types/RecommendationObjectTypes";
import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }

  assembleRecommendations(
    input: RecommendationInputObject,
  ): RecommendationResult {
    const genderBasedRecommendation =
      this.genderBasedRecommender.recommend(input);
    const result = new RecommendationResult();

    result.elements = result.elements.map((element) => {
      element.scores.overallScore = genderBasedRecommendation.score;
      element.standardDeviations.overallStandardDeviation =
        genderBasedRecommendation.standardDeviation;
      return element;
    });

    result.elements = result.elements.sort((a, b) => {
      return b.scores.overallScore - a.scores.overallScore;
    });

    return result;
  }
}

export default RecommendationAssembler;
