import { GamificationElementObject, GamificationElements, GamificationElementDetails } from "../GamificationElementSystem/GamificationElementRepository";

export enum Recommender {
    Gender = 'Gender',
}

export class RecommendationObject {
    gender: string;
  
    constructor(gender: string) {
      this.gender = gender;
    }
  }

export class RecommendationPercentageObject {
    //später wird es ein number array, wenn andere recommender hinzukommen
    //percentagePerRecommender: number[];
    overallPercentage: number;
  
    constructor(overallPercentage: number = 0) {
      this.overallPercentage = overallPercentage;
    }
  }
  
export class RecommendationResult {
      elements: GamificationElementObject[] = [];
  
      constructor() {
          const keys = Object.keys(GamificationElements) as Array<keyof typeof GamificationElements>;
          this.elements = keys.map((element) => {
              return new GamificationElementObject(
                  `${GamificationElements[element]}.png`, // imageSrc
                  element, // elementName
                  GamificationElementDetails[element] // details
                );
              });
      }
  }