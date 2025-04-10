import { GamificationElements } from "./GamificationElementRepository";
import { LiteratureResultTypeEnum } from "./LiteratureTypeEnum";

export class LiteratureElementObject {
  title: string;
  author: string;
  paperType: string;
  resultType: LiteratureResultTypeEnum | string;
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

export type LiteratureResultObject = {
  [key in GamificationElements]?: { male: number; female: number };
};
