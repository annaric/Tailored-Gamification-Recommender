import { GamificationElements } from "../../types/GamificationElementRepository";
import { RecommendationInputObject, RecommenderResults } from "../../types/RecommendationObjectTypes";
import { RecommenderValues, RecommenderValuesObject } from "../../types/RecommenderObjectTypes";

export type ResultElementProps = {
  [key in (typeof RecommenderValues)[number]]?: {
    score: number;
    standardDeviation: number;
    scoreWeight?: number;
  };
};

export type ResultDictonary = {
  [key in GamificationElements]?: ResultElementProps;
};

abstract class AbstractRecommender {
  src: string;
  recommenderKey: keyof typeof RecommenderValuesObject;

  constructor(src: string, recommenderKey: keyof typeof RecommenderValuesObject) {
    this.src = src;
    this.recommenderKey = recommenderKey || "";
    this.updateAlgorithm();
  }

  abstract recommend(input: RecommendationInputObject, key: string): RecommenderResults | undefined;

  abstract updateAlgorithm(): void;
}

export default AbstractRecommender;
