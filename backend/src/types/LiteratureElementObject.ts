import { LiteratureResultTypeEnum } from "./LiteratureTypeEnum";
import { RecommenderValueObject } from "./RecommendationObjectTypes";

export class LiteratureElementObject {
  title: string;
  author: string;
  paperType: string;
  resultType: LiteratureResultTypeEnum;
  bestValue: number;
  minValue: number;
  maxValue: number;
  result: LiteratureResultObject;

  constructor(
    title: string,
    author: string,
    paperType: string,
    resultType: LiteratureResultTypeEnum,
    bestValue: number,
    minValue: number,
    maxValue: number,
    result: LiteratureResultObject,
  ) {
    this.title = title;
    this.author = author;
    this.paperType = paperType;
    this.resultType = resultType;
    this.bestValue = bestValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.result = result;
  }
}

export class LiteratureResultObject {
  Incentive: RecommenderValueObject;

  constructor(Incentive: RecommenderValueObject) {
    this.Incentive = Incentive;
  }
}
