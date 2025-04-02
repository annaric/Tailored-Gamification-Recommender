import { RecommendationObject, RecommenderValueObject } from "../../types/RecommendationObjectTypes";
import AbstractRecommender from "./AbstractRecommender";
let IncentiveDictonary: RecommenderValueObject;
import fs from 'fs';
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";


class GenderBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationObject): number {
    if (input.gender && (input.gender === "female" || input.gender === "male")) {
      return IncentiveDictonary[input.gender];
    }
    throw new Error("Invalid input");
  }

  updateAlgorithm() {
    const genderBasedRecommenderData = JSON.parse(fs.readFileSync('./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json', 'utf-8')).literature;
    const resultArray = this.normalizeData(genderBasedRecommenderData);
    IncentiveDictonary = this.assembleData(resultArray);
    console.log("IncentiveDictonary", IncentiveDictonary);
  }

  normalizeData(input: LiteratureElementObject[]) {
    const resultArray: RecommenderValueObject[] = [];
    input.forEach(element => {
      switch (element.resultType) {
        case LiteratureResultTypeEnum["PositiveNumber"]:
          resultArray.push(this.normalizePositiveDataPaper(element));
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

  assembleData(resultArray: RecommenderValueObject[]): RecommenderValueObject {
    let maleResultArray: number[] = [];
    let femaleResultArray: number[] = [];
    resultArray.forEach(element => {
      maleResultArray.push(element.male);
      femaleResultArray.push(element.female);
    });
    maleResultArray = maleResultArray.sort((a, b) => a - b);
    femaleResultArray = femaleResultArray.sort((a, b) => a - b);
    //calculate the Median of all Papers
    const assembledResult = {
      male: (maleResultArray[Math.floor(maleResultArray.length / 2)]),
      female: (femaleResultArray[Math.floor(femaleResultArray.length / 2)])
    }
    return assembledResult
  }

  normalizePositiveDataPaper(input: LiteratureElementObject): RecommenderValueObject {
    //Normieren zwischen 0 und 1 und schauen, dass 1 der beste Wert ist.
    const resultElement = {male: 0, female: 0}
    if (input.bestValue == input.minValue) {
      resultElement.male = 1 - ((input.result.Incentive.male - input.minValue) / (input.maxValue - input.minValue));
      resultElement.female = 1 - ((input.result.Incentive.female - input.minValue) / (input.maxValue - input.minValue));
    } else {
      resultElement.male = ((input.result.Incentive.male - input.minValue) / (input.maxValue - input.minValue));
      resultElement.female = ((input.result.Incentive.female - input.minValue) / (input.maxValue - input.minValue));
    }
    return resultElement;
  }

  normalizeCorrelationDataPaper(input: LiteratureElementObject) {
    return input.result.Incentive;
  }

  normalizeBinaryDataPaper(input: LiteratureElementObject) { 
    return input.result.Incentive;
  }
}

export default GenderBasedRecommender;
