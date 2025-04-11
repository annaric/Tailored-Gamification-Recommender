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
      //console.log(result);
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
    
    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        genderBasedRecommenderData,
        GamificationElements[key],
        Object.keys(GenderValues) as RecommenderValues[],
      );
      if (resultArrayForOneElement.length != 0) {
        ResultDictonary[key] = this.assembleData(resultArrayForOneElement);
      }
    });
    //console.log("ResultDictonary", ResultDictonary);
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
    // Calculate the mean and standard deviation of maleResultArray
    const maleMean =
      maleResultArray.reduce((sum, value) => sum + value, 0) /
      maleResultArray.length;
    const maleStdDev = Math.sqrt(
      maleResultArray.reduce(
        (sum, value) => sum + Math.pow(value - maleMean, 2),
        0,
      ) / maleResultArray.length,
    );

    // Calculate the mean and standard deviation of femaleResultArray
    const femaleMean =
      femaleResultArray.reduce((sum, value) => sum + value, 0) /
      femaleResultArray.length;
    const femaleStdDev = Math.sqrt(
      femaleResultArray.reduce(
        (sum, value) => sum + Math.pow(value - femaleMean, 2),
        0,
      ) / femaleResultArray.length,
    );

    const assembledResult = {
      male: { score: maleMean, standardDeviation: maleStdDev },
      female: { score: femaleMean, standardDeviation: femaleStdDev },
    };
    return assembledResult;
  }

}

export default GenderBasedRecommender;
