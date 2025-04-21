import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender, {ResultElementProps, ResultDictonary} from "./AbstractRecommender";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import {
  GamificationElementArray,
  GamificationElements,
} from "../../types/GamificationElementRepository";
import {
  GenderValues,
} from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import MeanCalculator from "../Helper/MeanCalculator";

const ResultDictonary: ResultDictonary = {};

class GenderBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.gender || !(GenderValues.includes(input.gender))) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (
        ResultDictonary[key] &&
        ResultDictonary[key][input.gender!]
      ) {
        result[key] = {
          score:
            ResultDictonary[key][input.gender!]!.score,
          standardDeviation:
            ResultDictonary[key][input.gender!]!
              .standardDeviation,
        };
      }
      });
      return result;
    }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const genderBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        genderBasedRecommenderData,
        GamificationElements[key],
        GenderValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = this.assembleData(resultArrayForOneElement);
      }
    });
  }

  assembleData(
    resultArray:  { [key in (typeof GenderValues)[number]]?: number }[],
  ): ResultElementProps {
    const maleResultArray: number[] = [];
    const femaleResultArray: number[] = [];
    resultArray.forEach((element) => {
      if (!(element["male"] === undefined)) {
        maleResultArray.push(element["male"]);
      }
      if (!(element["female"] === undefined)) {
        femaleResultArray.push(element["female"]);
      }
    });
    const meanCalculator = new MeanCalculator();

    const assembledResult = {
      male: meanCalculator.calculateMeanAndStdDev(maleResultArray),
      female: meanCalculator.calculateMeanAndStdDev(femaleResultArray),
    };
    return assembledResult;
  }
}

export default GenderBasedRecommender;
