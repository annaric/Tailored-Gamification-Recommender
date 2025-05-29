import { GamificationElement } from "../../types/GamificationElementRepository";
import {
  RecommendationInputDTO,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import {
  RecommenderValues,
  RecommenderAndValuesObject,
} from "../../types/RecommenderRepository";

export type ResultElementProps = {
  [key in (typeof RecommenderValues)[number]]?: {
    score: number;
    standardDeviation: number;
    scoreWeight?: number;
  };
};

export type ResultDictonary = {
  [key in GamificationElement]?: ResultElementProps;
};

/**
 * Abstract base class for all recommenders in the system.
 * Provides a common structure and shared functionality for specific recommender implementations.
 */
abstract class AbstractRecommender {
  /**
   * The source file path for the recommender's data.
   */
  src: string;
  /**
   * The key identifying the recommender in the system.
   * This key is used to map the recommender to its corresponding values.
   */
  recommenderKey: keyof typeof RecommenderAndValuesObject;
  /**
   * A dictionary containing the results for each gamification element.
   * This is updated by the `updateAlgorithm` method at construction time.
   */
  resultDictonary: ResultDictonary;

  /**
   * Constructs an instance of the AbstractRecommender class.
   * @param LiteratureSrc - The source file path for the recommender's data.
   * @param recommenderKey - The key identifying the recommender in the system.
   */
  constructor(
    LiteratureSrc: string,
    recommenderKey: keyof typeof RecommenderAndValuesObject,
  ) {
    this.src = LiteratureSrc;
    this.recommenderKey = recommenderKey || "";
    this.resultDictonary = this.updateAlgorithm();
  }

  /**
   * Abstract method to generate recommendations based on the input data.
   * Must be implemented by subclasses.
   * @param input - The input object given by the frontend containing a selected recommender value per recommender.
   * @returns The results of the recommendation process or `undefined` if no results are generated.
   */
  abstract recommend(
    input: RecommendationInputDTO,
    key: string,
  ): RecommenderResults | undefined;

  /**
   * Abstract method to update the algorithm's internal result dictionary.
   * Must be implemented by subclasses.
   * @returns A dictionary of literature results for each gamification element.
   */
  abstract updateAlgorithm(): ResultDictonary;
}

export default AbstractRecommender;
