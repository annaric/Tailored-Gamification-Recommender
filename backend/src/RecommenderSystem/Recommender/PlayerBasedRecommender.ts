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
import { PlayerValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

class PlayerBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.player || !PlayerValues.includes(input.player)) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (ResultDictonary[key] && ResultDictonary[key][input.player!]) {
        result[key] = {
          score: ResultDictonary[key][input.player!]!.score,
          standardDeviation:
            ResultDictonary[key][input.player!]!.standardDeviation,
        };
      }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    const playerBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        playerBasedRecommenderData,
        GamificationElements[key],
        PlayerValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
  }
}

export default PlayerBasedRecommender;
