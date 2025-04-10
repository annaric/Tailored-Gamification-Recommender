import { GamificationElements } from "../types/GamificationElementRepository";
import {
  RecommendationInputObject,
  RecommendationEndResult,
} from "../types/RecommendationObjectTypes";
import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }

  assembleRecommendations(
    input: RecommendationInputObject,
  ): RecommendationEndResult {
    const genderBasedRecommendation =
      this.genderBasedRecommender.recommend(input);
    const result = new RecommendationEndResult();
    //console.log("genderBasedRecommendation", genderBasedRecommendation);

    result.elements = result.elements.map((element) => {
      const elementKey =
        element.elementName as keyof typeof GamificationElements;
      if (
        !(genderBasedRecommendation === undefined) &&
        genderBasedRecommendation[elementKey]
      ) {
        element.scores.overallScore =
          genderBasedRecommendation[elementKey].score;
        element.standardDeviations.overallStandardDeviation =
          genderBasedRecommendation[elementKey].standardDeviation;
        return element;
      } else {
        element.scores.overallScore = 0;
        element.standardDeviations.overallStandardDeviation = 0;
        return element;
      }
    });

    result.elements = result.elements.sort((a, b) => {
      return b.scores.overallScore - a.scores.overallScore;
    });

    return result;
  }
}

export default RecommendationAssembler;
