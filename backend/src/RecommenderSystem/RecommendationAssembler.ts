import {
  RecommendationObject,
  RecommendationResult,
} from "../types/RecommendationObjectTypes";
import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }

  assembleRecommendations(input: RecommendationObject): RecommendationResult {
    const genderBasedRecommendation =
      this.genderBasedRecommender.recommend(input);
    const result = new RecommendationResult();
    result.elements = result.elements.map((element) => {
      const recommendationPercentage = genderBasedRecommendation;
      element.percentages.overallPercentage = recommendationPercentage;
      return element;
    });
    result.elements = result.elements.sort((a, b) => {
      return b.percentages.overallPercentage - a.percentages.overallPercentage;
    });
    for (let i = 0; i < result.elements.length; i++) {
      const element = result.elements[i];
      element.ranking = i + 1;
    }
    return result;
  }
}

export default RecommendationAssembler;
