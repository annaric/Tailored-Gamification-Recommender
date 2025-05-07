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
import { LearningStyleKeys, LearningStyleValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import DataAssembler from "../Helper/DataAssembler";

const ResultDictonary: ResultDictonary = {};

export type LearningStyleRecommendationResult = {
  [key in LearningStyleKeys]?: RecommenderResults | undefined;
};

class LearningStyleBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): LearningStyleRecommendationResult | undefined {
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const learningStyleKeys = Object.keys(LearningStyleKeys) as Array<keyof typeof LearningStyleKeys>;
    const result: LearningStyleRecommendationResult = {};
    learningStyleKeys.forEach((learningStyle) => {
      if (learningStyle === undefined) {
        throw new Error("Learning style is undefined");
      }
      if (
        !input ||
        !input[learningStyle] ||
        !LearningStyleValues.includes(input[learningStyle])
      ) {
        result[learningStyle] = undefined;
      } else {
          GamificationElementArray.forEach((key) => {
            if (ResultDictonary[key] && ResultDictonary[key][input[learningStyle]!]) {
              result[learningStyle] = result[learningStyle] || {};
              result[learningStyle][key] = {
                score: ResultDictonary[key][input[learningStyle]!]!.score,
                standardDeviation:
                  ResultDictonary[key][input[learningStyle]!]!.standardDeviation,
          };
        }
      });
    }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const dataAssembler = new DataAssembler();
    const learningStyleBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/LearningStyleBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        learningStyleBasedRecommenderData,
        GamificationElements[key],
        LearningStyleValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = dataAssembler.assembleData(
          resultArrayForOneElement,
        );
      }
    });
  }
}

export default LearningStyleBasedRecommender;
