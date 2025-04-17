import { GamificationElements } from "../types/GamificationElementRepository";
import {
  RecommendationInputObject,
  RecommendationEndResult,
} from "../types/RecommendationObjectTypes";
import MeanCalculator from "./Helper/MeanCalculator";
import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";
import PlayerBasedRecommender from "./Recommender/PlayerBasedRecommender";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  playerBasedRecommendation: PlayerBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
    this.playerBasedRecommendation = new PlayerBasedRecommender();
  }

  assembleRecommendations(
    input: RecommendationInputObject,
  ): RecommendationEndResult {
    const genderBasedRecommendation =
      this.genderBasedRecommender.recommend(input);
    const playerBasedRecommendation =
      this.playerBasedRecommendation.recommend(input);
    const result = new RecommendationEndResult();
    const meanCalculator = new MeanCalculator();

    result.elements = result.elements.map((element) => {
      const elementKey =
        element.elementName as keyof typeof GamificationElements;
      if (
        !(genderBasedRecommendation === undefined) &&
        genderBasedRecommendation[elementKey]
      ) {
        element.score.scores.gender =
          genderBasedRecommendation[elementKey].score;
        element.standardDeviation.standardDeviations.gender =
          genderBasedRecommendation[elementKey].standardDeviation;
      } 
      if (
        !(playerBasedRecommendation === undefined) &&
        playerBasedRecommendation[elementKey]
      ) {
        element.score.scores.player =
          playerBasedRecommendation[elementKey].score;
        element.standardDeviation.standardDeviations.player =
          playerBasedRecommendation[elementKey].standardDeviation;
      } 
      if (!(Object.keys(element.standardDeviation.standardDeviations).length === 0)){
        element.standardDeviation.meanStandardDeviation = meanCalculator.calculateMeanAndStdDev(Object.values(element.standardDeviation.standardDeviations)).score;
      }
      if (!(Object.keys(element.score.scores).length === 0)){
        const overallCalculation = meanCalculator.calculateMeanAndStdDev(Object.values(element.score.scores));
        element.score.overallScore = overallCalculation.score;
        element.standardDeviation.overallStandardDeviation =
          overallCalculation.standardDeviation;
      } else {
        element.score.overallScore = 0;
        element.standardDeviation.overallStandardDeviation = 0;
      }
      return element;
    });

    result.elements = result.elements.sort((a, b) => {
      return b.score.overallScore - a.score.overallScore;
    });

    return result;
  }
}

export default RecommendationAssembler;
