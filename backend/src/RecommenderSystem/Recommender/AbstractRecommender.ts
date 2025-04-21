import { GamificationElements } from "../../types/GamificationElementRepository";
import { RecommendationInputObject } from "../../types/RecommendationObjectTypes";
import { RecommenderValues } from "../../types/RecommenderObjectTypes";

export type ResultElementProps = {
  [key in (typeof RecommenderValues)[number]]?: {
    score: number;
    standardDeviation: number;
  }
}

export type ResultDictonary = {
  [key in GamificationElements]?: ResultElementProps;
};

abstract class AbstractRecommender {

  constructor() {
    this.updateAlgorithm();
  }

  abstract recommend(input: RecommendationInputObject): unknown;

  abstract updateAlgorithm(): void;
}

export default AbstractRecommender;
