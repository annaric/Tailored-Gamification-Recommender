import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender from "./AbstractRecommender";
import fs from "fs";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";
import {
  GamificationElementArray,
  GamificationElements,
} from "../../types/GamificationElementRepository";

export enum GenderValues {
  female = "female",
  male = "male",
}

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
    const genderBasedRecommenderData: LiteratureElementObject[] =
      this.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      );
    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = this.normalizeLiteratureData(
        genderBasedRecommenderData,
        GamificationElements[key],
      );
      if (resultArrayForOneElement.length != 0) {
        ResultDictonary[key] = this.assembleData(resultArrayForOneElement);
      }
    });
    //console.log("ResultDictonary", ResultDictonary);
  }

  readJsonFile(src: string): LiteratureElementObject[] {
    const result: LiteratureElementObject[] = JSON.parse(
      fs.readFileSync(src, "utf-8"),
    ).literature;
    if (
      !Array.isArray(result) ||
      !("resultType" in result[0]) ||
      !("bestValue" in result[0]) ||
      !("minValue" in result[0]) ||
      !("maxValue" in result[0]) ||
      !("result" in result[0])
    ) {
      throw new Error(
        "Invalid data format: genderBasedRecommenderData must be an array of LiteratureElementObject",
      );
    }
    return result;
  }

  normalizeLiteratureData(
    input: LiteratureElementObject[],
    key: GamificationElements,
  ) {
    const resultArray: { [key in GenderValues]?: number }[] = [];
    input.forEach((element) => {
      if (
        element.result &&
        element.result[key] &&
        !(element.result[key].male === undefined) &&
        !(element.result[key].female === undefined)
      ) {
        const male = element.result[key].male;
        const female = element.result[key].female;
        switch (element.resultType) {
          case LiteratureResultTypeEnum["PositiveNumber"]:
            resultArray.push(
              this.normalizePositiveDataPaper(male, female, element.bestValue),
            );
            break;
          case LiteratureResultTypeEnum["Scale"]:
            resultArray.push(
              this.normalizeScaleDataPaper(
                male,
                female,
                element.bestValue,
                element.minValue,
                element.maxValue,
              ),
            );
            break;
          case LiteratureResultTypeEnum["Correlation"]:
            resultArray.push(this.normalizeCorrelationDataPaper(male, female));
            break;
          case LiteratureResultTypeEnum["Binary"]:
            resultArray.push(this.normalizeBinaryDataPaper(male, female));
            break;
          default:
            throw new Error("Invalid result type");
        }
      }
    });
    //console.log("resultArray", resultArray);
    return resultArray;
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

  normalizePositiveDataPaper(
    male: number,
    female: number,
    bestValue: number,
  ): { [key in GenderValues]?: number } {
    // Normiere zwischen 0.5 und 1, wobei 1 der beste Wert ist.
    // Sinnvoll bei Review Paper, die nur positive "Korrelationen" zurückgeben.
    // Unterschied zu anderen Normalisierungen: der bestValue ist die Anzahl der Paper die sagen können, dass das Element gut ist für gender x
    const resultElement = { male: 0, female: 0 };
    resultElement.male = male > bestValue ? 1 : 0.5 + (male / bestValue) * 0.5;
    resultElement.female =
      female > bestValue ? 1 : 0.5 + (female / bestValue) * 0.5;
    return resultElement;
  }

  normalizeScaleDataPaper(
    male: number,
    female: number,
    bestValue: number,
    minValue: number,
    maxValue: number,
  ): { [key in GenderValues]?: number } {
    //Normieren zwischen 0 und 1 und schauen, dass 1 der beste Wert ist.
    // Sinnvoll bei Scalen Paper, die den User nach Bewertung fragen zwischen mag ich garnicht und mag ich sehr.
    const resultElement = { male: 0, female: 0 };
    if (bestValue == minValue) {
      resultElement.male = 1 - (male - minValue) / (maxValue - minValue);
      resultElement.female = 1 - (female - minValue) / (maxValue - minValue);
    } else {
      resultElement.male = (male - minValue) / (maxValue - minValue);
      resultElement.female = (female - minValue) / (maxValue - minValue);
    }
    return resultElement;
  }

  normalizeCorrelationDataPaper(
    male: number,
    female: number,
  ): { [key in GenderValues]?: number } {
    //Normieren zwischen 0 und 1 statt -1 und 1
    const resultElement = { male: 0, female: 0 };
    resultElement.male = (male + 1) / 2;
    resultElement.female = (female + 1) / 2;
    return resultElement;
  }

  normalizeBinaryDataPaper(
    male: number,
    female: number,
  ): { [key in GenderValues]?: number } {
    const resultElement = { male: 0, female: 0 };
    resultElement.female = female === 1 ? 0.75 : 0.5;
    resultElement.male = male === 1 ? 0.75 : 0.5;
    return resultElement;
  }
}

export default GenderBasedRecommender;
