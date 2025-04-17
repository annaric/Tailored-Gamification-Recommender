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
import {
  PlayerValues,
  RecommenderValues,
} from "../../types/RecommenderObjectTypes";
import DataNormalizer from "../Helper/DataNormalizer";
import JsonFileReader from "../Helper/JsonFileReader";
import MeanCalculator from "../Helper/MeanCalculator";

export interface PlayerDictonaryElementProps {
  achiever: {
    score: number;
    standardDeviation: number;
  };
  disruptor: {
    score: number;
    standardDeviation: number;
  };
  freeSpirit: {
    score: number;
    standardDeviation: number;
  };
  philanthropist: {
    score: number;
    standardDeviation: number;
  };
  player: {
    score: number;
    standardDeviation: number;
  };
  socializer: {
    score: number;
    standardDeviation: number;
  };
}

export type ResultDictonary = {
  [key in GamificationElements]?: PlayerDictonaryElementProps;
};
const ResultDictonary: ResultDictonary = {};

class PlayerBasedRecommender extends AbstractRecommender {
  constructor() {
    super();
  }

  recommend(input: RecommendationInputObject): RecommenderResults | undefined {
    if (!input.player || !(input.player in PlayerValues)) {
      return undefined;
    }
    if (input.player && input.player in PlayerValues) {
      const result: RecommenderResults = {};
      GamificationElementArray.forEach((key) => {
        if (
          ResultDictonary[key] &&
          ResultDictonary[key][input.player as "achiever" | "disruptor" | "freeSpirit" | "philanthropist" | "player" | "socializer"]
        ) {
          result[key] = {
            score:
              ResultDictonary[key][input.player as "achiever" | "disruptor" | "freeSpirit" | "philanthropist" | "player" | "socializer"].score,
            standardDeviation:
              ResultDictonary[key][input.player as "achiever" | "disruptor" | "freeSpirit" | "philanthropist" | "player" | "socializer"]
                .standardDeviation,
          };
        }
      });
      return result;
    }
    throw new Error("Invalid input");
  }

  updateAlgorithm() {
    const jsonFileReader = new JsonFileReader();
    const dataNormalizer = new DataNormalizer();
    const playerBasedRecommenderData: LiteratureElementObject[] =
      jsonFileReader.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
      );
    console.log("in player based recommender")
    const playerKeys: Array<keyof typeof PlayerValues> = Object.keys(
      PlayerValues,
    ) as Array<keyof typeof PlayerValues>;

    GamificationElementArray.forEach((key) => {
      console.log("key: ", key);
      const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
        playerBasedRecommenderData,
        GamificationElements[key],
        playerKeys as Array<RecommenderValues>,
      );
      console.log("resultArrayForOneElement: ", resultArrayForOneElement);
      if (resultArrayForOneElement.length !== 0) {
        const assembledData = this.assembleData(resultArrayForOneElement);
        console.log("assembledData: ")
        ResultDictonary[key] = assembledData;
      }
    });
    console.log("ResultDictonary", ResultDictonary);
  }

  assembleData(
    resultArray: { [key in PlayerValues]?: number }[],
  ): PlayerDictonaryElementProps {
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
      philanthropist: meanCalculator.calculateMeanAndStdDev(philanthropistResultArray),
      player: meanCalculator.calculateMeanAndStdDev(playerResultArray),
      socializer: meanCalculator.calculateMeanAndStdDev(socializerResultArray),
    };
    return assembledResult;
  }
}

export default PlayerBasedRecommender;
