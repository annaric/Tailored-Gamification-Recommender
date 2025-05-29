import { RecommenderValues } from "../../types/RecommenderRepository";
import { ResultElementProps } from "../Recommender/AbstractRecommender";
import MeanCalculator from "./MeanCalculator";

export default class DataAssembler {
  /**
   * Assembles data from an array of normalized results into a structured format.
   * It calculates the mean, standard deviation, and score weights for each recommender value.
   * @param resultArray - An array of normalized results, where each result is a mapping of recommender keys to their normalized values.
   * @returns An object containing the aggregated results, including mean, standard deviation, and score weights for each recommender value.
   */
  assembleData(
    resultArray: { [key in (typeof RecommenderValues)[number]]?: number }[],
  ): ResultElementProps {
    const resultArrayObject: {
      [key in (typeof RecommenderValues)[number]]: number[];
    } = {};

    // Object to store the count of values (score weights) for each recommender key
    const scoreWeightsObject: {
      [key in (typeof RecommenderValues)[number]]: number;
    } = {};
    // Object to store the count of values (score weights) for each recommender key
    resultArray.forEach((element) => {
      Object.keys(element).forEach((key) => {
        if (resultArrayObject[key] === undefined) {
          resultArrayObject[key] = [];
        }
        if (!(element[key] === undefined)) {
          resultArrayObject[key].push(element[key]);
          scoreWeightsObject[key] = scoreWeightsObject[key]
            ? scoreWeightsObject[key] + 1
            : 1;
        }
      });
    });
    const meanCalculator = new MeanCalculator();

    const assembledResult: {
      [key in (typeof RecommenderValues)[number]]?: {
        score: number;
        standardDeviation: number;
        scoreWeight?: number;
      };
    } = {};

    // Iterate through the resultArrayObject to calculate mean, standard deviation, and score weights
    Object.keys(resultArrayObject).forEach((key) => {
      assembledResult[key] = meanCalculator.calculateMeanAndStdDev(
        resultArrayObject[key],
      );
      if (scoreWeightsObject[key] !== undefined) {
        assembledResult[key]!.scoreWeight = scoreWeightsObject[key];
      }
    });
    return assembledResult;
  }
}
