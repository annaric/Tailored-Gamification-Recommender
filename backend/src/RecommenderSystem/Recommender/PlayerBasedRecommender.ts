import {
  RecommendationInputObject,
  RecommenderResults,
} from "../../types/RecommendationObjectTypes";
import AbstractRecommender, { ResultElementProps, ResultDictonary } from "./AbstractRecommender";
import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import {
  GamificationElementArray,
  GamificationElements,
} from "../../types/GamificationElementRepository";
import {
  PlayerValues,
} from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import MeanCalculator from "../Helper/MeanCalculator";

const ResultDictonary: ResultDictonary = {};

class PlayerBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.player || !(PlayerValues.includes(input.player))) {
      return undefined;
    }
    if (ResultDictonary === undefined) {
      throw new Error("Result dictionary is not defined");
    }
    const result: RecommenderResults = {};
    GamificationElementArray.forEach((key) => {
      if (
        ResultDictonary[key] &&
        ResultDictonary[key][input.player!]
      ) {
        result[key] = {
          score:
            ResultDictonary[key][
              input.player!]!.score,
          standardDeviation:
            ResultDictonary[key][
              input.player!]!.standardDeviation,
        };
      }
    });
    return result;
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const playerBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
      );

    GamificationElementArray.forEach((key) => {
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        playerBasedRecommenderData,
        GamificationElements[key],
        PlayerValues,
      );
      if (resultArrayForOneElement.length !== 0) {
        const assembledData = this.assembleData(resultArrayForOneElement);
        ResultDictonary[key] = assembledData;
      }
    });
  }

  assembleData(
    resultArray: { [key in (typeof PlayerValues)[number]]?: number }[],
  ): ResultElementProps {
    const achieverResultArray: number[] = [];
    const disruptorResultArray: number[] = [];
    const freeSpiritResultArray: number[] = [];
    const philanthropistResultArray: number[] = [];
    const playerResultArray: number[] = [];
    const socializerResultArray: number[] = [];
    resultArray.forEach((element) => {
      if (!(element["achiever"] === undefined)) {
        achieverResultArray.push(element["achiever"]);
      }
      if (!(element["disruptor"] === undefined)) {
        disruptorResultArray.push(element["disruptor"]);
      }
      if (!(element["freeSpirit"] === undefined)) {
        freeSpiritResultArray.push(element["freeSpirit"]);
      }
      if (!(element["philanthropist"] === undefined)) {
        philanthropistResultArray.push(element["philanthropist"]);
      }
      if (!(element["player"] === undefined)) {
        playerResultArray.push(element["player"]);
      }
      if (!(element["socializer"] === undefined)) {
        socializerResultArray.push(element["socializer"]);
      }
    });
    const meanCalculator = new MeanCalculator();

    const assembledResult = {
      achiever: meanCalculator.calculateMeanAndStdDev(achieverResultArray),
      disruptor: meanCalculator.calculateMeanAndStdDev(disruptorResultArray),
      freeSpirit: meanCalculator.calculateMeanAndStdDev(freeSpiritResultArray),
      philanthropist: meanCalculator.calculateMeanAndStdDev(
        philanthropistResultArray,
      ),
      player: meanCalculator.calculateMeanAndStdDev(playerResultArray),
      socializer: meanCalculator.calculateMeanAndStdDev(socializerResultArray),
    };
    return assembledResult;
  }
}

export default PlayerBasedRecommender;
