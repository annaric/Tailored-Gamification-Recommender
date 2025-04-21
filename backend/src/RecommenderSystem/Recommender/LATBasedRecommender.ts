import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender, {ResultDictonary} from "./AbstractRecommender";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import {
  GamificationElementArray,
  GamificationElements,
} from "../../types/GamificationElementRepository";
import {
  LATValues,

} from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader"
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

class LATBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.lat || !(LATValues.includes(input.lat))) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (
        ResultDictonary[key] &&
        ResultDictonary[key][
          input.lat!]
      ) {
        result[key] = {
          score:
            ResultDictonary[key][
              input.lat!]!.score,
          standardDeviation:
            ResultDictonary[key][
              input.lat!]!.standardDeviation,
        };
      }
    });
    return result;
    }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    const latBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/LATBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        latBasedRecommenderData,
        GamificationElements[key],
        LATValues
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = dataAssembler.assembleData(resultArrayForOneElement);
      }
    });
  }
}

export default LATBasedRecommender;
