import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender, { ResultDictonary } from "./AbstractRecommender";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import {
  GamificationElementArray,
  GamificationElements,
} from "../../types/GamificationElementRepository";
import { GenderValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

class GenderBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.gender || !GenderValues.includes(input.gender)) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (ResultDictonary[key] && ResultDictonary[key][input.gender!]) {
        result[key] = {
          score: ResultDictonary[key][input.gender!]!.score,
          standardDeviation:
            ResultDictonary[key][input.gender!]!.standardDeviation,
          scoreWeight:
            ResultDictonary[key][input.gender!]!.scoreWeight,
        };
      }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
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
        ResultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
  }
}

export default GenderBasedRecommender;
