import {
  RecommendationInputObject,
  RecommenderValueObject,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender from "./AbstractRecommender";
import fs from "fs";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";

export interface IncentiveDictonaryProps {
  male: {
    score: number, 
    standardDeviation: number
  }, 
  female: {
    score: number, 
    standardDeviation: number}
}

let IncentiveDictonary: IncentiveDictonaryProps

class GenderBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject) {
    if (
      input.gender &&
      (input.gender === "female" || input.gender === "male")
    ) {
      return IncentiveDictonary[input.gender];
    }
    throw new Error("Invalid input");
  }

  updateAlgorithm() {
    const genderBasedRecommenderData = JSON.parse(
      fs.readFileSync(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
        "utf-8",
      ),
    ).literature;
    const resultArray = this.normalizeData(genderBasedRecommenderData);
    IncentiveDictonary = this.assembleData(resultArray);
    console.log("IncentiveDictonary", IncentiveDictonary);
  }

  normalizeData(input: LiteratureElementObject[]) {
    const resultArray: RecommenderValueObject[] = [];
    input.forEach((element) => {
      switch (element.resultType) {
        case LiteratureResultTypeEnum["PositiveNumber"]:
          resultArray.push(this.normalizePositiveDataPaper(element));
          break;
        case LiteratureResultTypeEnum["Scale"]:
          resultArray.push(this.normalizeScaleDataPaper(element));
          break;
        case LiteratureResultTypeEnum["Correlation"]:
          resultArray.push(this.normalizeCorrelationDataPaper(element));
          break;
        case LiteratureResultTypeEnum["Binary"]:
          resultArray.push(this.normalizeBinaryDataPaper(element));
          break;
        default:
          throw new Error("Invalid result type");
      }
    });
    console.log("resultArray", resultArray);
    return resultArray;
  }

  assembleData(resultArray: RecommenderValueObject[]): IncentiveDictonaryProps {
    const maleResultArray: number[] = [];
    const femaleResultArray: number[] = [];
    resultArray.forEach((element) => {
      maleResultArray.push(element.male);
      femaleResultArray.push(element.female);
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
      male: {score: maleMean, standardDeviation: maleStdDev},
      female: {score: femaleMean, standardDeviation: femaleStdDev},
    };
    return assembledResult;
  }

  normalizePositiveDataPaper(
    input: LiteratureElementObject,
  ): RecommenderValueObject {
    // Normiere zwischen 0.5 und 1, wobei 1 der beste Wert ist.
    // Sinnvoll bei Review Paper, die nur positive "Korrelationen" zurückgeben.
    // Unterschied zu anderen Normalisierungen: der maxValue sorgt dafür, dass es mit den anderen möglichen Werten in Beziehung gesetzt wird
    const maxValue =
      input.result.Incentive.male + input.result.Incentive.female;
    const resultElement = { male: 0, female: 0 };
    resultElement.male = 0.5 + (input.result.Incentive.male / maxValue) * 0.5;
    resultElement.female =
      0.5 + (input.result.Incentive.female / maxValue) * 0.5;
    return resultElement;
  }

  normalizeScaleDataPaper(
    input: LiteratureElementObject,
  ): RecommenderValueObject {
    //Normieren zwischen 0 und 1 und schauen, dass 1 der beste Wert ist.
    // Sinnvoll bei Scalen Paper, die den User nach Bewertung fragen zwischen mag ich garnicht und mag ich sehr.
    const resultElement = { male: 0, female: 0 };
    if (input.bestValue == input.minValue) {
      resultElement.male =
        1 -
        (input.result.Incentive.male - input.minValue) /
          (input.maxValue - input.minValue);
      resultElement.female =
        1 -
        (input.result.Incentive.female - input.minValue) /
          (input.maxValue - input.minValue);
    } else {
      resultElement.male =
        (input.result.Incentive.male - input.minValue) /
        (input.maxValue - input.minValue);
      resultElement.female =
        (input.result.Incentive.female - input.minValue) /
        (input.maxValue - input.minValue);
    }
    return resultElement;
  }

  normalizeCorrelationDataPaper(input: LiteratureElementObject) {
    //Normieren zwischen 0 und 1 statt -1 und 1
    const resultElement = { male: 0, female: 0 };
    resultElement.male = (input.result.Incentive.male + 1) / 2;
    resultElement.female = (input.result.Incentive.female + 1) / 2;
    return resultElement;
  }

  normalizeBinaryDataPaper(input: LiteratureElementObject) {
    const resultElement = { male: 0, female: 0 };
    resultElement.female = input.result.Incentive.female === 1 ? 0.75 : 0.25;
    resultElement.male = input.result.Incentive.male === 1 ? 0.75 : 0.25;
    return resultElement;
  }
}

export default GenderBasedRecommender;
