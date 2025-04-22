import { RecommenderValues } from "../../types/RecommenderObjectTypes";
import { ResultElementProps } from "../Recommender/AbstractRecommender";
import MeanCalculator from "./MeanCalculator";

export default class DataAssembler {
  assembleData(
    resultArray: { [key in (typeof RecommenderValues)[number]]?: number }[],
  ): ResultElementProps {
    const resultArrayObject: {
      [key in (typeof RecommenderValues)[number]]: number[];
    } = {};
    resultArray.forEach((element) => {
      Object.keys(element).forEach((key) => {
        if (resultArrayObject[key] === undefined) {
          resultArrayObject[key] = [];
        }
        if (!(element[key] === undefined)) {
          resultArrayObject[key].push(element[key]);
        }
      });
    });
    const meanCalculator = new MeanCalculator();

    const assembledResult: {
      [key in (typeof RecommenderValues)[number]]?: {
        score: number;
        standardDeviation: number;
      };
    } = {};

    Object.keys(resultArrayObject).forEach((key) => {
      assembledResult[key] = meanCalculator.calculateMeanAndStdDev(
        resultArrayObject[key],
      );
    });
    return assembledResult;
  }
}
