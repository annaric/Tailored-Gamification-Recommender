import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender from "./AbstractRecommender";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import {
  GamificationElementArray,
  GamificationElements,
} from "../../types/GamificationElementRepository";
import { GenderValues, RecommenderValues } from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import MeanCalculator from "../Helper/MeanCalculator";

export interface GenderDictonaryElementProps {
  male: {
    score: number;
    standardDeviation: number;
  };
  female: {
    score: number;
    standardDeviation: number;
  };
}

export type ResultDictonary = {
  [key in GamificationElements]?: GenderDictonaryElementProps;
};
const ResultDictonary: ResultDictonary = {};

class GenderBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.gender && input.gender === undefined) {
      return undefined;
    }
    if (input.gender === "female" || input.gender === "male") {
      const result: RecommenderResults = {};
      GamificationElementArray.forEach((key) => {
        if (
          ResultDictonary[key] &&
          ResultDictonary[key][input.gender as "male" | "female"]
        ) {
          result[key] = {
            score:
              ResultDictonary[key][input.gender as "male" | "female"].score,
            standardDeviation:
              ResultDictonary[key][input.gender as "male" | "female"]
                .standardDeviation,
          };
        }
      });
      return result;
    }
    throw new Error("Invalid input");
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const genderBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      );

    const genderKeys: Array<
    keyof typeof GenderValues
  > = Object.keys(GenderValues) as Array<
    keyof typeof GenderValues
  >;
    
    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        genderBasedRecommenderData,
        GamificationElements[key],
        genderKeys as Array<RecommenderValues>
      );
      if (resultArrayForOneElement.length !== 0) {
        ResultDictonary[key] = this.assembleData(resultArrayForOneElement);
      }
    });
  }

  

  assembleData(
    resultArray: { [key in GenderValues]?: number }[],
  ): GenderDictonaryElementProps {
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
