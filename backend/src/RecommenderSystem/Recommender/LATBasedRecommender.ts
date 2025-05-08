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
import { LearningActivityTaskValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

class LearningActivityTaskBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (
      !input.learningActivityTask ||
      !LearningActivityTaskValues.includes(input.learningActivityTask)
    ) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (
        ResultDictonary[key] &&
        ResultDictonary[key][input.learningActivityTask!]
      ) {
        result[key] = {
          score: ResultDictonary[key][input.learningActivityTask!]!.score,
          standardDeviation:
            ResultDictonary[key][input.learningActivityTask!]!
              .standardDeviation,
          scoreWeight:
            ResultDictonary[key][input.learningActivityTask!]!.scoreWeight,
        };
      }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    const learningActivityTaskBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/LATBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        learningActivityTaskBasedRecommenderData,
        GamificationElements[key],
        LearningActivityTaskValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
  }
}

export default LearningActivityTaskBasedRecommender;
