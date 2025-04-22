import {
  GamificationElementObject,
  GamificationElements,
  GamificationElementDetails,
} from "./GamificationElementRepository";
import {
  GenderValues,
  LATValues,
  LearningStyleValues,
  PersonalityValues,
  PlayerValues,
  RecommenderValues,
} from "./RecommenderObjectTypes";

// Result type of each Recommender
export type RecommenderResults = {
  [key in GamificationElements]?: {
    score: number;
    standardDeviation: number;
  };
};

//Input type we are getting from the frontend
export type RecommendationInputObject = {
  // hier kommen andere Recommender typen hin später
  gender?: (typeof GenderValues)[number];
  player?: (typeof PlayerValues)[number];
  personality?: (typeof PersonalityValues)[number];
  lat?: (typeof LATValues)[number];
  learningStyle?: (typeof LearningStyleValues)[number];
};

export type NumberPerRecommenderObject = {
  [key in (typeof RecommenderValues)[number]]?: number;
};

export class RecommendationScoreObject {
  //später wird es noch ein number array mit den einzelnen Ergebnissen jedes Recommender geben, wenn andere recommender hinzukommen
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

export class RecommendationStandardDeviationObject {
  //später wird es noch ein number array mit den einzelnen Ergebnissen jedes Recommender geben, wenn andere recommender hinzukommen
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
