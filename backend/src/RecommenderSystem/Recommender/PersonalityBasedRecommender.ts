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
import { PersonalityValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

class PersonalityBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.personality || !PersonalityValues.includes(input.personality)) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (ResultDictonary[key] && ResultDictonary[key][input.personality!]) {
        result[key] = {
          score: ResultDictonary[key][input.personality!]!.score,
          standardDeviation:
            ResultDictonary[key][input.personality!]!.standardDeviation,
          scoreWeight: ResultDictonary[key][input.personality!]!.scoreWeight,
        };
      }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    const personalityBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/PersonalityBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        personalityBasedRecommenderData,
        GamificationElements[key],
        PersonalityValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
  }
}

export default PersonalityBasedRecommender;
