import {
  GamificationElementObject,
  GamificationElements,
  GamificationElementDetails,
} from "./GamificationElementRepository";

export enum Recommender {
  Gender = "Gender",
}

// Result type of each Recommender
export type RecommenderResults = {[key in GamificationElements]?: {
  score: number;
  standardDeviation: number;
}}

//Input type we are getting from the frontend
export type RecommendationInputObject = {
  // hier kommen andere Recommender typen hin später
  gender?: "male" | "female" | undefined;
}

export class RecommendationScoreObject {
  //später wird es noch ein number array mit den einzelnen Ergebnissen jedes Recommender geben, wenn andere recommender hinzukommen
  overallScore: number;

  constructor(overallScore: number = 0) {
    this.overallScore = overallScore;
  }
}

export class RecommendationStandardDeviationObject {
  //später wird es noch ein number array mit den einzelnen Ergebnissen jedes Recommender geben, wenn andere recommender hinzukommen
  overallStandardDeviation: number;

  constructor(overallStandardDeviation: number = 0) {
    this.overallStandardDeviation = overallStandardDeviation;
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
