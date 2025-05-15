import {
  GamificationElementObject,
  GamificationElements,
  GamificationElementDetails,
} from "./GamificationElementRepository";
import {
  RecommenderValues,
  RecommenderValuesObject,
} from "./RecommenderObjectTypes";

// Result type of each Recommender
export type RecommenderResults = {
  [key in GamificationElements]?: {
    score: number;
    standardDeviation: number;
    scoreWeight?: number;
  };
};

//Input type we are getting from the frontend
export type RecommendationInputObject = {
  [key in keyof typeof RecommenderValuesObject]?: (typeof RecommenderValuesObject)[key][number];
};

export type NumberPerRecommenderObject = {
  [key in (typeof RecommenderValues)[number]]?: number;
};

export class RecommendationScoreObject {
  scores: NumberPerRecommenderObject = {};
  overallScore: number;

  constructor(
    overallScore: number = 0,
    scores: NumberPerRecommenderObject = {},
  ) {
    this.scores = scores;
    this.overallScore = overallScore;
  }
}

export class RecommendationScoreWeightObject {
  weights: NumberPerRecommenderObject = {};
  sumOfWeights: number;

  constructor(
    sumOfWeights: number = 1,
    weights: NumberPerRecommenderObject = {},
  ) {
    this.weights = weights;
    this.sumOfWeights = sumOfWeights;
  }
}

export class RecommendationStandardDeviationObject {
  standardDeviations: NumberPerRecommenderObject = {};
  overallStandardDeviation: number;
  meanStandardDeviation: number;

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

export class RecommendationEndResult {
  elements: GamificationElementObject[] = [];

  constructor() {
    const keys = Object.keys(GamificationElements) as Array<
      keyof typeof GamificationElements
    >;
    this.elements = keys.map((element) => {
      return new GamificationElementObject(
        `${element}.png`, // imageSrc
        element, // elementName
        GamificationElementDetails[element], // details
      );
    });
  }
}
