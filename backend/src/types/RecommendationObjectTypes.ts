import {
  GamificationElementArray,
  GamificationElementObject,
  GamificationElement,
} from "./GamificationElementRepository";
import {
  RecommenderValues,
  RecommenderAndValuesObject,
} from "./RecommenderRepository";

/**
 * Represents the result type of each recommender.
 * Maps each gamification element to its corresponding score, standard deviation, and optional score weight.
 */
export type RecommenderResults = {
  [key in GamificationElement]?: {
    score: number;
    standardDeviation: number;
    scoreWeight?: number;
  };
};

/**
 * Represents the input type received from the frontend.
 * Maps each recommender key to its selected value.
 */
export type RecommendationInputDTO = {
  [key in keyof typeof RecommenderAndValuesObject]?: (typeof RecommenderAndValuesObject)[key][number];
};

/**
 * Represents a mapping of recommender values to numbers.
 * Used for scores, weights, and standard deviations.
 */
export type NumberPerRecommenderObject = {
  [key in (typeof RecommenderValues)[number]]?: number;
};

/**
 * Represents the score object for a recommendation.
 * Contains individual scores for each recommender and an overall score.
 */
export class RecommendationScoreObject {
  scores: NumberPerRecommenderObject = {};
  overallScore: number;

  /**
   * Constructs an instance of the `RecommendationScoreObject` class.
   * @param overallScore - The overall score for the recommendation.
   * @param scores - Individual scores provided by each recommender.
   */
  constructor(
    overallScore: number = 0,
    scores: NumberPerRecommenderObject = {},
  ) {
    this.scores = scores;
    this.overallScore = overallScore;
  }
}

/**
 * Represents the score weight object for a recommendation.
 * Contains individual weights for each recommender and the sum of all weights.
 */
export class RecommendationScoreWeightObject {
  weights: NumberPerRecommenderObject = {};
  sumOfWeights: number;

  /**
   * Constructs an instance of the `RecommendationScoreWeightObject` class.
   * @param sumOfWeights - The sum of all weights.
   * @param weights - Individual weights provided by each recommender.
   */
  constructor(
    sumOfWeights: number = 1,
    weights: NumberPerRecommenderObject = {},
  ) {
    this.weights = weights;
    this.sumOfWeights = sumOfWeights;
  }
}

/**
 * Represents the standard deviation object for a recommendation.
 * Contains individual standard deviations for each recommender, the overall standard deviation,
 * and the mean standard deviation of all individual standard deviations.
 */
export class RecommendationStandardDeviationObject {
  standardDeviations: NumberPerRecommenderObject = {};
  overallStandardDeviation: number;
  meanStandardDeviation: number;

  /**
   * Constructs an instance of the `RecommendationStandardDeviationObject` class.
   * @param overallStandardDeviation - The overall standard deviation.
   * @param standardDeviations - Individual standard deviations provided by each recommender.
   * @param meanStandardDeviation - The mean of standardDeviations.
   */
  constructor(
    overallStandardDeviation: number = 0,
    standardDeviations: NumberPerRecommenderObject = {},
    meanStandardDeviation: number = 0,
  ) {
    this.standardDeviations = standardDeviations;
    this.overallStandardDeviation = overallStandardDeviation;
    this.meanStandardDeviation = meanStandardDeviation;
  }
}

/**
 * Represents the final recommendation result.
 * Contains an array of gamification elements with their associated scores, weights, and standard deviations.
 */
export class RecommendationResultDTO {
  elements: GamificationElementObject[] = [];

  /**
   * Constructs an instance of the `RecommendationEndResult` class.
   * Initializes the elements array with all gamification elements.
   */
  constructor() {
    this.elements = GamificationElementArray.map((element) => {
      return new GamificationElementObject(
        element, // elementName
      );
    });
  }
}
