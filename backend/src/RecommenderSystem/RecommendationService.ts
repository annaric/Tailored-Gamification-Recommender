import RecommendationAssembler from "./RecommendationAssembler";
import {
  RecommendationInputDTO,
  RecommendationResultDTO,
} from "../types/RecommendationObjectTypes";
import { RecommenderAndValuesObject } from "../types/RecommenderRepository";

/**
 * The `RecommendationService` class acts as a service layer for the recommendation system.
 * It provides methods to generate recommendations and retrieve available recommenders.
 */
class RecommendationService {
  /**
   * An instance of the `RecommendationAssembler` class used to orchestrate the recommendation process.
   */
  recommendationAssembler: RecommendationAssembler;

  /**
   * Constructs an instance of the `RecommendationService` class.
   * Initializes the `RecommendationAssembler` to handle the recommendation logic.
   */
  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  /**
   * Generates recommendations based on the input data.
   * Delegates the recommendation process to the `RecommendationAssembler`.
   * @param input - The input object containing recommendation parameters.
   * @returns A `RecommendationEndResult` object containing the final recommendations.
   */
  recommend(input: RecommendationInputDTO): RecommendationResultDTO {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  /**
   * Retrieves the available recommenders and their corresponding values.
   * @returns An object mapping recommenders to their possible values.
   */
  getRecommender() {
    return RecommenderAndValuesObject;
  }
}

export default RecommendationService;
