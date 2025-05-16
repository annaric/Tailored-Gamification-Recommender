import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender, { ResultDictonary } from "./AbstractRecommender";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import {
  GamificationElementArray,
  GamificationElement,
} from "../../types/GamificationElementRepository";
import { RecommenderAndValuesObject } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

/**
 * StandardRecommender is a concrete implementation of the AbstractRecommender class.
 * It provides functionality to generate recommendations based on predefined data
 * and normalizes, processes, and assembles the data into a structured format.
 */
class StandardRecommender extends AbstractRecommender {
  /**
   * Constructs an instance of the StandardRecommender class.
   * @param src - The source file path for the recommender's data.
   * @param recommenderKey - The key identifying the recommender in the system.
   */
  constructor(
    src: string,
    recommenderKey: keyof typeof RecommenderAndValuesObject,
  ) {
    super(src, recommenderKey);
  }

  /**
   * Generates recommendations based on the input data.
   * @param input - The input object given by the frontend containing a selected recommender value per recommender.
   * @returns A dictionary of recommendations for each gamification element, or `undefined` if input[this.recommenderKey] is not valid.
   * @throws An error if the result dictionary is not defined.
   */
  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (
      !(this.recommenderKey in input) ||
      !input[this.recommenderKey] ||
      !RecommenderAndValuesObject[this.recommenderKey].includes(
        input[this.recommenderKey]!,
      )
    ) {
      return undefined;
    }
    if (this.resultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    // Iterate through each gamification element and populate the result
    GamificationElementArray.forEach((key) => {
      if (
        this.resultDictonary[key] &&
        this.resultDictonary[key][input[this.recommenderKey]!]
      ) {
        result[key] = {
          score: this.resultDictonary[key][input[this.recommenderKey]!]!.score,
          standardDeviation:
            this.resultDictonary[key][input[this.recommenderKey]!]!
              .standardDeviation,
          scoreWeight:
            this.resultDictonary[key][input[this.recommenderKey]!]!.scoreWeight,
        };
      }
    });
    return result;
  }

  /**
   * Updates the algorithm's internal result dictionary by processing and normalizing data.
   * @returns A dictionary of results for each gamification element.
   * @throws An error if the internal recommender key is invalid.
   */
  updateAlgorithm(): ResultDictonary {
    // Initialize helper classes
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    // Read and parse the JSON file for the recommender's data
    const recommenderBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(this.src);

    const resultDictonary: ResultDictonary = {};

    // Validate the recommender key
    if (!(this.recommenderKey in RecommenderAndValuesObject)) {
      throw new Error(
        `Recommender key ${this.recommenderKey} is not valid. Valid keys are: ${Object.keys(
          RecommenderAndValuesObject,
        ).join(", ")}`,
      );
    }

    // Process data for each gamification element
    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        recommenderBasedRecommenderData,
        GamificationElement[key],
        RecommenderAndValuesObject[this.recommenderKey],
      );
      if (resultArrayForOneElement.length !== 0) {
        resultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
    return resultDictonary;
  }
}

export default StandardRecommender;
