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
import { AgeValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

class AgeBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.age || !AgeValues.includes(input.age)) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (ResultDictonary[key] && ResultDictonary[key][input.age!]) {
        result[key] = {
          score: ResultDictonary[key][input.age!]!.score,
          standardDeviation:
            ResultDictonary[key][input.age!]!.standardDeviation,
          scoreWeight: ResultDictonary[key][input.age!]!.scoreWeight,
        };
      }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    const ageBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/AgeBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        ageBasedRecommenderData,
        GamificationElements[key],
        AgeValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
  }
}

export default AgeBasedRecommender;
