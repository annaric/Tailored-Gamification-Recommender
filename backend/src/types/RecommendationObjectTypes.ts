import {
  GamificationElementObject,
  GamificationElements,
  GamificationElementDetails,
} from "./GamificationElementRepository";

export enum Recommender {
  Gender = "Gender",
}

export class RecommenderValueObject {
  male: number;
  female: number;

  constructor(male: number, female: number) {
    this.male = male;
    this.female = female;
  }
}

export class RecommendationInputObject {
  gender: string;

  constructor(gender: string) {
    this.gender = gender;
  }
}

export class RecommendationScoreObject {
  //später wird es ein number array, wenn andere recommender hinzukommen
  overallScore: number;

  constructor(overallScore: number = 0) {
    this.overallScore = overallScore;
  }
}

export class RecommendationStandardDeviationObject {
  overallStandardDeviation: number;

  constructor(overallStandardDeviation: number = 0) {
    this.overallStandardDeviation = overallStandardDeviation;
  }
}

export class RecommendationResult {
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
