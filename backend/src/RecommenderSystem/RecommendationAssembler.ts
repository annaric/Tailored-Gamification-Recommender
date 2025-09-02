import {
  GamificationElementObject,
  GamificationElement,
} from "../types/GamificationElementRepository";
import {
  RecommendationInputDTO,
  RecommendationResultDTO,
  RecommenderResults,
} from "../types/RecommendationObjectTypes";
import { RecommenderAndValuesObject } from "../types/RecommenderRepository";
import MeanCalculator from "./Helper/MeanCalculator";
import StandardRecommender from "./Recommender/StandardRecommender";

/**
 * The `RecommendationAssembler` class is responsible for orchestrating the recommendation process.
 * It combines the results from multiple recommenders, calculates aggregated scores, and sorts the final recommendations.
 *
 */
class RecommendationAssembler {
  /**
   * A list of recommenders used in the recommendation process.
   * Each recommender is paired with its corresponding key.
   */
  recommenderList: {
    recommender: StandardRecommender;
    recommenderKey: keyof typeof RecommenderAndValuesObject;
  }[];
  meanCalculator: MeanCalculator;

  /**
   * Constructs an instance of the `RecommendationAssembler` class.
   * Initializes the list of recommenders and the mean calculator.
   */
  constructor() {
    const linkToJsonFiles =
      "./src/RecommenderSystem/Recommender/RecommenderData/";
    const generalRecommender = new StandardRecommender(
      linkToJsonFiles + "GeneralRecommender.json",
      "general",
    );
    const generalRecommenderResults = generalRecommender.recommend({
      general: "general",
    });
    this.recommenderList = [
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "GenderBasedRecommender.json",
          "gender",
          generalRecommenderResults,
        ),
        recommenderKey: "gender",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "PlayerBasedRecommender.json",
          "player",
          generalRecommenderResults,
        ),
        recommenderKey: "player",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "PersonalityBasedRecommender.json",
          "personality",
          generalRecommenderResults,
        ),
        recommenderKey: "personality",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LATBasedRecommender.json",
          "learningActivityTask",
          generalRecommenderResults,
        ),
        recommenderKey: "learningActivityTask",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "AgeBasedRecommender.json",
          "age",
          generalRecommenderResults,
        ),
        recommenderKey: "age",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json",
          "learningStyleOfProcessingInformation",
          generalRecommenderResults,
        ),
        recommenderKey: "learningStyleOfProcessingInformation",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json",
          "learningStyleOfIntuitivity",
          generalRecommenderResults,
        ),
        recommenderKey: "learningStyleOfIntuitivity",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json",
          "learningStyleOfPerception",
          generalRecommenderResults,
        ),
        recommenderKey: "learningStyleOfPerception",
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json",
          "learningStyleOfUnderstanding",
          generalRecommenderResults,
        ),
        recommenderKey: "learningStyleOfUnderstanding",
      },
      {
        recommender: generalRecommender,
        recommenderKey: "general",
      },
    ];
    this.meanCalculator = new MeanCalculator();
  }

  /**
   * Assembles recommendations by combining results from all recommenders.
   * Calculates aggregated scores, standard deviations, and sorts the final recommendations.
   * @param input - The input object given by the frontend containing a selected recommender value per recommender.
   * @returns A `RecommendationEndResult` object containing the final recommendations that can be send to the frontend.
   */
  assembleRecommendations(
    input: RecommendationInputDTO,
  ): RecommendationResultDTO {
    const result = new RecommendationResultDTO();

    // Iterate through each recommender to get its recommendation and add its results to the final output
    this.recommenderList.forEach((recommenderElement) => {
      const resultPerRecommender =
        recommenderElement.recommender.recommend(input);
      result.elements = result.elements.map((resultElementObject) => {
        resultElementObject = this.addRecommenderScoresToResult(
          resultElementObject,
          resultPerRecommender,
          recommenderElement.recommenderKey,
        );
        return resultElementObject;
      });
    });

    // Calculate the score and standard deviation for each gamification element
    result.elements = result.elements.map((resultElementObject) => {
      resultElementObject =
        this.calculateMeanStandardDeviation(resultElementObject);
      resultElementObject =
        this.setOverallScoreAndStandardDeviation(resultElementObject);
      return resultElementObject;
    });

    // Sort the elements by their overall score in descending order
    result.elements = result.elements.sort((a, b) => {
      return b.score.overallScore - a.score.overallScore;
    });

    return result;
  }

  /**
   * Adds scores, standard deviations, and weights from a recommender to a gamification element.
   * @param element - The gamification element in the overall result to update.
   * @param recommendation - The recommendation results from the recommender.
   * @param key - The key identifying the recommender.
   * @returns The updated gamification element with added score and standard deviation to the scores and standard deviations arrays.
   */
  addRecommenderScoresToResult(
    element: GamificationElementObject,
    recommendation: RecommenderResults | undefined,
    key: string,
  ) {
    if (!key) {
      throw new Error("Key is undefined");
    }
    const adaptedElement = element;
    const elementKey =
      adaptedElement.elementName as keyof typeof GamificationElement;
    if (!(recommendation === undefined) && recommendation[elementKey]) {
      adaptedElement.score.scores[key] = recommendation[elementKey].score;
      adaptedElement.standardDeviation.standardDeviations[key] =
        recommendation[elementKey].standardDeviation;
      adaptedElement.scoreWeight.weights[key] =
        recommendation[elementKey].scoreWeight;
    }
    return adaptedElement;
  }

  /**
   * Calculates the mean standard deviation of all standard deciations for a gamification element.
   * @param element - The gamification element in the overall result to update.
   * @returns The updated gamification element with the mean standard deviation of all standard deviations.
   */
  calculateMeanStandardDeviation(element: GamificationElementObject) {
    const adaptedElement = element;
    if (
      !(
        Object.keys(adaptedElement.standardDeviation.standardDeviations)
          .length === 0
      )
    ) {
      adaptedElement.standardDeviation.meanStandardDeviation =
        this.meanCalculator.calculateMeanAndStdDev(
          Object.values(
            adaptedElement.standardDeviation.standardDeviations,
          ).filter((value): value is number => value !== undefined),
        ).score;
    }
    return adaptedElement;
  }

  /**
   * Calculates the overall score and standard deviation for a gamification element based on the scores, standard deviations, and weights arrays.
   * @param element - The gamification element in the overall result to update.
   * @returns The updated gamification element with the overall score and standard deviation.
   */
  setOverallScoreAndStandardDeviation(element: GamificationElementObject) {
    const adaptedElement = element;
    if (!(Object.keys(adaptedElement.score.scores).length === 0)) {
      const overallCalculation =
        this.meanCalculator.calculateWeightedMeanAndStdDev(
          Object.values(adaptedElement.score.scores).filter(
            (value): value is number => value !== undefined,
          ),
          Object.values(adaptedElement.scoreWeight.weights).filter(
            (value): value is number => value !== undefined,
          ),
        );
      adaptedElement.score.overallScore = overallCalculation.score;
      adaptedElement.standardDeviation.overallStandardDeviation =
        overallCalculation.standardDeviation;
      adaptedElement.scoreWeight.sumOfWeights = overallCalculation.sumOfWeights;
    } else {
      adaptedElement.score.overallScore = 0.5;
      adaptedElement.standardDeviation.overallStandardDeviation = 0;
      adaptedElement.scoreWeight.sumOfWeights = 0;
    }
    return adaptedElement;
  }
}

export default RecommendationAssembler;
