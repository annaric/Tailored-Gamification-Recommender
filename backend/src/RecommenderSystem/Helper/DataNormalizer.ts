import { GamificationElement } from "../../types/GamificationElementRepository";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";
import { RecommenderResults } from "../../types/RecommendationObjectTypes";
import {
  RecommenderDependendLiteratureResults,
  RecommenderValues,
} from "../../types/RecommenderRepository";

export default class DataNormalizer {
  /**
   * Normalizes literature data based on the provided gamification element and recommender values to a common scale.
   * It only normalizes the input[key][resultKeys]
   * The normalization is done in a way that the best value is always 1 and the worst value is always 0.
   * @param literatureInput - Array of literature elements to normalize.
   * @param gamificationElementKey - The gamification element to normalize data for.
   * @param resultParameter - The specific recommender values found in the input as keys to normalize. Usually the values of the recommender system triggering the normalization.
   * @returns An array of normalized results.
   */
  normalizeLiteratureData(
    literatureInput: LiteratureElementObject[],
    gamificationElementKey: GamificationElement,
    resultParameter: (typeof RecommenderValues)[number][],
    generalRecommenderResults?: RecommenderResults,
  ) {
    const resultArray: {
      [key in (typeof RecommenderValues)[number]]?: number;
    }[] = [];
    // Iterate through each literature paper in the literature file.
    literatureInput.forEach((element) => {
      if (
        element.result &&
        element.result[gamificationElementKey] &&
        resultParameter.some(
          (resultKey) =>
            resultKey in (element.result[gamificationElementKey] ?? {}),
        ) 
      ) {
        const resultInputs = element.result[
          gamificationElementKey
        ] as RecommenderDependendLiteratureResults;
        let generalRecommendation = undefined;
        if (generalRecommenderResults !== undefined) {
          generalRecommendation = generalRecommenderResults[gamificationElementKey]!.score;
        }
        // Normalize the data based on the result type in the literature
        switch (element.resultType) {
          case LiteratureResultTypeEnum["PositiveNumber"]:
            resultArray.push(
              this.normalizePositiveDataPaper(
                resultInputs,
                element.bestValue,
                resultParameter,
                generalRecommendation
              ),
            );
            break;
          case LiteratureResultTypeEnum["Scale"]:
            resultArray.push(
              this.normalizeScaleDataPaper(
                resultInputs,
                element.bestValue,
                element.minValue,
                element.maxValue,
                resultParameter,
              ),
            );
            break;
          case LiteratureResultTypeEnum["Coefficient"]:
            resultArray.push(
              this.normalizeCoefficientDataPaper(resultInputs, resultParameter, generalRecommendation),
            );
            break;
          case LiteratureResultTypeEnum["Binary"]:
            resultArray.push(
              this.normalizeBinaryDataPaper(resultInputs, resultParameter, generalRecommendation),
            );
            break;
          default:
            throw new Error("Invalid result type");
        }
      }
    });
    return resultArray;
  }

  /**
   * Normalizes positive number data, such as review papers, that only return positive correlations.
   * The normalization is done in a way that values between 0 and the best value are mapped to a range between 0.5 and 1.
   * @param resultInput - The raw result data from the literature to normalize.
   * @param bestValue - The value representing the best result.
   * @param keys - The keys to iterate over in the resultInput.
   * @returns A normalized resultInput with values between 0.5 and 1.
   * @throws Error if the keys are found in the resultInput.
   */
  normalizePositiveDataPaper(
    resultInput: RecommenderDependendLiteratureResults,
    bestValue: number,
    keys: (typeof RecommenderValues)[number][],
    generalRecommendation?: number,
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    if (keys.length !== 0 && generalRecommendation !== undefined) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      keys.forEach((key) => {
        if (resultInput[key] !== undefined) {
          resultElement[key] =
            resultInput[key] > bestValue
              ? 1
              : Number(generalRecommendation) + (resultInput[key] / bestValue) * 0.5;
          if (resultElement[key]! > 1) {
            resultElement[key] = 1;
          }
        }
      });
      return resultElement;
    } else {
      throw new Error("No keys or no generalRecommendation found in result");
    }
  }

  /**
   * Normalizes scale-based data, such as results of average user ratings, where the center of the scale is neutral.
   * @param resultInput - The raw result data from the literature to normalize.
   * @param bestValue - The value representing the best result (minValue or maxValue).
   * @param minValue - The minimum value in the scale.
   * @param maxValue - The maximum value in the scale.
   * @param keys - The keys to iterate over in the resultInput.
   * @returns A normalized resultInput with values between 0 and 1.
   * @throws Error if the keys are found in the resultInput.
   */
  normalizeScaleDataPaper(
    resultInput: RecommenderDependendLiteratureResults,
    bestValue: number,
    minValue: number,
    maxValue: number,
    keys: (typeof RecommenderValues)[number][],
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    if (keys.length !== 0) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      if (bestValue == minValue) {
        // Invert normalization if bestValue equals minValue
        keys.forEach((key) => {
          if (resultInput[key] !== undefined) {
            resultElement[key] =
              1 - (resultInput[key] - minValue) / (maxValue - minValue);
          }
        });
      } else {
        keys.forEach((key) => {
          if (resultInput[key] !== undefined) {
            resultElement[key] =
              (resultInput[key] - minValue) / (maxValue - minValue);
          }
        });
      }
      return resultElement;
    } else {
      throw new Error("No keys found in result");
    }
  }

  /**
   * Normalizes coefficient-based data, such as correlation coefficients, where the range is between -1 and 1.
   * @param resultInput - The raw result data from the literature to normalize.
   * @param keys - The keys to iterate over in the resultInput.
   * @returns A shift of the correlation coefficient to a range between 0 and 1.
   * @throws Error if the keys are found in the resultInput.
   */
  normalizeCoefficientDataPaper(
    resultInput: RecommenderDependendLiteratureResults,
    keys: (typeof RecommenderValues)[number][],
    generalRecommendation?: number,
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    if (keys.length !== 0 && generalRecommendation !== undefined) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      keys.forEach((key) => {
        if (resultInput[key] !== undefined) {
          resultElement[key] = Number(generalRecommendation) + (resultInput[key] / 2);
        }
      });
      return resultElement;
    } else {
      throw new Error("No keys or no generalRecommendation found in result");
    }
  }

  /**
   * Normalizes binary data, such as presence/absence of an positive effect, where the values are either 0 or 1.
   * @param resultInput - The raw result data from the literature to normalize.
   * @param keys - The keys to iterate over in the resultInput.
   * @returns A normalized resultInput with values beeing 0.5 (for 0) or 0.75 (for 1).
   * @throws Error if the keys are found in the resultInput.
   */
  normalizeBinaryDataPaper(
    result: RecommenderDependendLiteratureResults,
    keys: (typeof RecommenderValues)[number][],
    generalRecommendation?: number,
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    if (keys.length !== 0 && generalRecommendation !== undefined) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      keys.forEach((key) => {
        if (result[key] !== undefined) {
          resultElement[key] = Number(generalRecommendation) + (result[key] * 0.1);
        }
      });
      return resultElement;
    } else {
      throw new Error("No keys or no generalRecommendationfound in result");
    }
  }
}
