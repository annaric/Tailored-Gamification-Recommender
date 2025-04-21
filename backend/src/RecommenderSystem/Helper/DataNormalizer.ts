import { GamificationElements } from "../../types/GamificationElementRepository";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";
import {
  RecommenderDependendLiteratureResults,
  RecommenderValues,
} from "../../types/RecommenderObjectTypes";

export default class DataNormalizer {
  normalizeLiteratureData(
    input: LiteratureElementObject[],
    key: GamificationElements,
    resultKeys: (typeof RecommenderValues)[number][],
  ) {
    const resultArray: { [key in (typeof RecommenderValues)[number]]?: number }[] = [];
    input.forEach((element) => {
      if (
        element.result &&
        element.result[key] &&
        resultKeys.every(
          (resultKey) => resultKey in (element.result[key] ?? {}),
        )
      ) {
        const resultInputs = element.result[
          key
        ] as RecommenderDependendLiteratureResults;
        switch (element.resultType) {
          case LiteratureResultTypeEnum["PositiveNumber"]:
            resultArray.push(
              this.normalizePositiveDataPaper(
                resultInputs,
                element.bestValue,
                resultKeys,
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
                resultKeys,
              ),
            );
            break;
          case LiteratureResultTypeEnum["Coefficient"]:
            resultArray.push(
              this.normalizeCoefficientDataPaper(resultInputs, resultKeys),
            );
            break;
          case LiteratureResultTypeEnum["Binary"]:
            resultArray.push(
              this.normalizeBinaryDataPaper(resultInputs, resultKeys),
            );
            break;
          default:
            throw new Error("Invalid result type");
        }
      }
    });
    return resultArray;
  }

  normalizePositiveDataPaper(
    result: RecommenderDependendLiteratureResults,
    bestValue: number,
    keys: (typeof RecommenderValues)[number][],
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    // Normiere zwischen 0.5 und 1, wobei 1 der beste Wert ist.
    // Sinnvoll bei Review Paper, die nur positive "Korrelationen" zurückgeben.
    // Unterschied zu anderen Normalisierungen: der bestValue ist die Anzahl der Paper die sagen können, dass das Element gut ist für gender x
    if (keys.length !== 0) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      keys.forEach((key) => {
        if (result[key] !== undefined) {
          resultElement[key] =
            result[key] > bestValue ? 1 : 0.5 + (result[key] / bestValue) * 0.5;
        }
      });
      return resultElement;
    } else {
      throw new Error("No keys found in result");
    }
  }

  normalizeScaleDataPaper(
    result: RecommenderDependendLiteratureResults,
    bestValue: number,
    minValue: number,
    maxValue: number,
    keys: (typeof RecommenderValues)[number][],
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    //Normieren zwischen 0 und 1 und schauen, dass 1 der beste Wert ist.
    // Sinnvoll bei Scalen Paper, die den User nach Bewertung fragen zwischen mag ich garnicht und mag ich sehr.
    if (keys.length !== 0) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      if (bestValue == minValue) {
        keys.forEach((key) => {
          if (result[key] !== undefined) {
            resultElement[key] =
              1 - (result[key] - minValue) / (maxValue - minValue);
          }
        });
      } else {
        keys.forEach((key) => {
          if (result[key] !== undefined) {
            resultElement[key] =
              (result[key] - minValue) / (maxValue - minValue);
          }
        });
      }
      return resultElement;
    } else {
      throw new Error("No keys found in result");
    }
  }

  normalizeCoefficientDataPaper(
    result: RecommenderDependendLiteratureResults,
    keys: (typeof RecommenderValues)[number][],
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    //Normieren zwischen 0 und 1 statt -1 und 1
    if (keys.length !== 0) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      keys.forEach((key) => {
        if (result[key] !== undefined) {
          resultElement[key] = (result[key] + 1) / 2;
        }
      });
      return resultElement;
    } else {
      throw new Error("No keys found in result");
    }
  }

  normalizeBinaryDataPaper(
    result: RecommenderDependendLiteratureResults,
    keys: (typeof RecommenderValues)[number][],
  ): { [key in (typeof RecommenderValues)[number]]?: number } {
    if (keys.length !== 0) {
      const resultElement: RecommenderDependendLiteratureResults = {};
      keys.forEach((key) => {
        if (result[key] !== undefined) {
          resultElement[key] = result[key] === 1 ? 0.75 : 0.5;
        }
      });
      return resultElement;
    } else {
      throw new Error("No keys found in result");
    }
  }
}
