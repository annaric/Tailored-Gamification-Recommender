import { GamificationElement } from "./GamificationElementRepository";
import { LiteratureResultTypeEnum } from "./LiteratureTypeEnum";
import { RecommenderDependendLiteratureResults } from "./RecommenderObjectTypes";

/**
 * Represents the structure of the literature element object, 
 * which the json files in the RecommenderData folder are based on.
 */
export class LiteratureElementObject {
  title: string;
  author: string;
  paperType: string;
  resultType: LiteratureResultTypeEnum | string;
  bestValue: number;
  minValue: number;
  maxValue: number;
  result: LiteratureResultObject;

  /**
   * Constructs an instance of the `LiteratureElementObject` class.
   * @param title - The title of the literature paper.
   * @param author - The author(s) of the literature paper.
   * @param paperType - The type of the paper (e.g., journal, conference, etc.).
   * @param resultType - The type of result provided by the literature paper (see LiteratureResultTypeEnum)
   * @param bestValue - The best value for the result (usually maxValue or minValue).
   * @param minValue - The minimum value for the result.
   * @param maxValue - The maximum value for the result.
   * @param result - The result object of the literature mapping gamification elements to their results.
   */
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

/**
 * Represents the result object for a literature element.
 * Maps gamification elements to their corresponding recommender-dependent results.
 */
export type LiteratureResultObject = {
  [key in GamificationElement]?: RecommenderDependendLiteratureResults;
};
