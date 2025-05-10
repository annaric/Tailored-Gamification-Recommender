import { assert } from "console";
import PlayerBasedRecommender from "../../../src/RecommenderSystem/Recommender/PlayerBasedRecommender";
import { LiteratureElementObject } from "../../../src/types/LiteratureElementObject";
import JsonFileReader from "../../../src/RecommenderSystem/Helper/JsonFileReader";
import DataNormalizer from "../../../src/RecommenderSystem/Helper/DataNormalizer";
import DataAssembler from "../../../src/RecommenderSystem/Helper/DataAssembler";

// Mock the `fs` module to simulate reading a JSON file

describe("Test PlayerBasedRecommender update Algorithm", () => {
  let recommender: PlayerBasedRecommender;

  beforeEach(() => {
    recommender = new PlayerBasedRecommender();
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("should correctly update the ResultDictonary with positive number literature", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "PositiveNumber",
          bestValue: 7,
          minValue: 0,
          maxValue: 7,
          result: {
            Incentive: {
              achiever: 2,
              disruptor: 2,
              freeSpirit: 4,
              philanthropist: 4,
              player: 2,
              socializer: 4,
            },
          },
        },
      ],
    };

    jest
      .spyOn(JsonFileReader.prototype, "readJsonFile")
      .mockImplementation((src: string) => {
        assert(
          src ===
            "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(DataAssembler.prototype, "assembleData");
    const normalizePositiveDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizePositiveDataPaper",
    );

    recommender.updateAlgorithm();

    const expected2Score = 0.5 + (2 / 7) * 0.5;
    const expected4Score = 0.5 + (4 / 7) * 0.5;

    const expectedResultDictonaryValues = {
      achiever: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      disruptor: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      freeSpirit: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      philanthropist: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      player: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      socializer: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizePositiveDataPaperSpy).toHaveBeenCalledTimes(1);
    expect(assembleDataSpy).toHaveReturnedWith(expectedResultDictonaryValues);
  });

  it("should correctly update the ResultDictonary with Coefficient number literature", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Coefficient",
          bestValue: 1,
          minValue: -1,
          maxValue: 1,
          result: {
            Incentive: {
              achiever: -0.7,
              disruptor: -0.7,
              freeSpirit: 0.3,
              philanthropist: 0.3,
              player: -0.7,
              socializer: 0.3,
            },
          },
        },
      ],
    };

    jest
      .spyOn(JsonFileReader.prototype, "readJsonFile")
      .mockImplementation((src: string) => {
        assert(
          src ===
            "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(DataAssembler.prototype, "assembleData");
    const normalizeCoefficientDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeCoefficientDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedNegativeScore = (-0.7 + 1) / 2;
    const expectedPositiveScore = (0.3 + 1) / 2;

    const expectedResultDictonaryValues = {
      achiever: {
        score: expectedNegativeScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      disruptor: {
        score: expectedNegativeScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      freeSpirit: {
        score: expectedPositiveScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      philanthropist: {
        score: expectedPositiveScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      player: {
        score: expectedNegativeScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      socializer: {
        score: expectedPositiveScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizeCoefficientDataPaperSpy).toHaveBeenCalledTimes(1);
    expect(assembleDataSpy).toHaveReturnedWith(expectedResultDictonaryValues);
  });

  it("should correctly update the ResultDictonary with Binary number literature", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Binary",
          bestValue: 1,
          minValue: 0,
          maxValue: 1,
          result: {
            Incentive: {
              achiever: 0,
              disruptor: 1,
              freeSpirit: 0,
              philanthropist: 1,
              player: 1,
              socializer: 0,
            },
          },
        },
      ],
    };

    jest
      .spyOn(JsonFileReader.prototype, "readJsonFile")
      .mockImplementation((src: string) => {
        assert(
          src ===
            "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(DataAssembler.prototype, "assembleData");
    const normalizeBinaryDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeBinaryDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedZeroScore = 0.5;
    const expectedOneScore = 0.75;

    const expectedResultDictonaryValues = {
      achiever: {
        score: expectedZeroScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      disruptor: {
        score: expectedOneScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      freeSpirit: {
        score: expectedZeroScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      philanthropist: {
        score: expectedOneScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      player: {
        score: expectedOneScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      socializer: {
        score: expectedZeroScore,
        standardDeviation: 0,
        scoreWeight: 1,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizeBinaryDataPaperSpy).toHaveBeenCalledTimes(1);
    expect(assembleDataSpy).toHaveReturnedWith(expectedResultDictonaryValues);
  });

  it("should correctly update the ResultDictonary with Scale number literature where best value is min", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 1,
          minValue: 1,
          maxValue: 5,
          result: {
            Incentive: {
              achiever: 4.6,
              disruptor: 4.6,
              freeSpirit: 2.3,
              philanthropist: 2.3,
              player: 4.6,
              socializer: 2.3,
            },
          },
        },
      ],
    };

    jest
      .spyOn(JsonFileReader.prototype, "readJsonFile")
      .mockImplementation((src: string) => {
        assert(
          src ===
            "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(DataAssembler.prototype, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeScaleDataPaper",
    );

    recommender.updateAlgorithm();

    const expected4Score = 1 - (4.6 - 1) / (5 - 1);
    const expected2Score = 1 - (2.3 - 1) / (5 - 1);

    const expectedResultDictonaryValues = {
      achiever: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      disruptor: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      freeSpirit: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      philanthropist: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      player: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      socializer: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizeScaleDataPaperSpy).toHaveBeenCalledTimes(1);
    expect(assembleDataSpy).toHaveReturnedWith(expectedResultDictonaryValues);
  });

  it("should correctly update the ResultDictonary with Scale number literature where best value is max", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 5,
          minValue: 1,
          maxValue: 5,
          result: {
            Incentive: {
              achiever: 4.6,
              disruptor: 4.6,
              freeSpirit: 2.3,
              philanthropist: 2.3,
              player: 4.6,
              socializer: 2.3,
            },
          },
        },
      ],
    };

    jest
      .spyOn(JsonFileReader.prototype, "readJsonFile")
      .mockImplementation((src: string) => {
        assert(
          src ===
            "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(DataAssembler.prototype, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeScaleDataPaper",
    );

    recommender.updateAlgorithm();

    const expected4Score = (4.6 - 1) / (5 - 1);
    const expected2Score = (2.3 - 1) / (5 - 1);

    const expectedResultDictonaryValues = {
      achiever: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      disruptor: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      freeSpirit: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      philanthropist: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      player: {
        score: expected4Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
      socializer: {
        score: expected2Score,
        standardDeviation: 0,
        scoreWeight: 1,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizeScaleDataPaperSpy).toHaveBeenCalledTimes(1);
    expect(assembleDataSpy).toHaveReturnedWith(expectedResultDictonaryValues);
  });

  it("should correctly update the ResultDictonary with multiple elements and multiple results", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 9,
          minValue: 1,
          maxValue: 9,
          result: {
            Altruism: {
              achiever: 4.6, //male 1
              disruptor: 4.6,
              freeSpirit: 2.3,
              philanthropist: 2.3,
              player: 4.6,
              socializer: 2.3,
            },
            TimePressure: {
              achiever: 1.8, //male 1
              disruptor: 1.8,
              freeSpirit: 7.4,
              philanthropist: 7.4,
              player: 1.8,
              socializer: 7.4,
            },
          },
        },
        {
          title: "Paper 2",
          author: "author 2",
          paperType: "Type B",
          resultType: "Binary",
          bestValue: 1,
          minValue: 0,
          maxValue: 1,
          result: {
            Altruism: {
              achiever: 1, //male 1
              disruptor: 1,
              freeSpirit: 0,
              philanthropist: 0,
              player: 1,
              socializer: 0,
            },
            TimePressure: {
              achiever: 0, //male 0
              disruptor: 0,
              freeSpirit: 1,
              philanthropist: 1,
              player: 0,
              socializer: 1,
            },
          },
        },
      ],
    };

    jest
      .spyOn(JsonFileReader.prototype, "readJsonFile")
      .mockImplementation((src: string) => {
        assert(
          src ===
            "./src/RecommenderSystem/Recommender/RecommenderData/PlayerBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const recommendSpy = jest.spyOn(recommender, "recommend");
    const assembleDataSpy = jest.spyOn(DataAssembler.prototype, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeScaleDataPaper",
    );
    const normalizeBinaryDataPaper = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeBinaryDataPaper",
    );

    recommender.updateAlgorithm();

    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(2);
    expect(normalizeScaleDataPaperSpy).toHaveBeenCalledTimes(2);
    expect(normalizeBinaryDataPaper).toHaveBeenCalledTimes(2);

    //Assert that recommend gives back the correct values for achiever
    const achieverResult = recommender.recommend({ player: "achiever" });
    expect(recommendSpy).toHaveBeenCalledTimes(1);
    const expectedAchieverAltruismScore = (3.6 / 8 + 0.75) / 2;
    const expectedAchieverTimePressureScore = (0.8 / 8 + 0.5) / 2;
    const expectedAchieverAltruismStdDev = Math.sqrt(
      (Math.pow(3.6 / 8 - expectedAchieverAltruismScore, 2) +
        Math.pow(0.75 - expectedAchieverAltruismScore, 2)) /
        2,
    );
    const expectedAchieverTimePressureStdDev = Math.sqrt(
      (Math.pow(0.8 / 8 - expectedAchieverTimePressureScore, 2) +
        Math.pow(0.5 - expectedAchieverTimePressureScore, 2)) /
        2,
    );
    expect(achieverResult?.Altruism?.score).toBeCloseTo(
      expectedAchieverAltruismScore,
      5,
    );
    expect(achieverResult?.Altruism?.standardDeviation).toBeCloseTo(
      expectedAchieverAltruismStdDev,
      5,
    );
    expect(achieverResult?.TimePressure?.score).toBeCloseTo(
      expectedAchieverTimePressureScore,
      5,
    );
    expect(achieverResult?.TimePressure?.standardDeviation).toBeCloseTo(
      expectedAchieverTimePressureStdDev,
      5,
    );

    //Assert that recommend gives back the correct values for philanthropist
    const philanthropistResult = recommender.recommend({
      player: "philanthropist",
    });
    expect(recommendSpy).toHaveBeenCalledTimes(2);
    const expectedPhilanthropistAltruismScore = (1.3 / 8 + 0.5) / 2;
    const expectedPhilanthropistTimePressureScore = (6.4 / 8 + 0.75) / 2;
    const expectedPhilanthropistAltruismStdDev = Math.sqrt(
      (Math.pow(1.3 / 8 - expectedPhilanthropistAltruismScore, 2) +
        Math.pow(0.5 - expectedPhilanthropistAltruismScore, 2)) /
        2,
    );
    const expectedPhilanthropistTimePressureStdDev = Math.sqrt(
      (Math.pow(6.4 / 8 - expectedPhilanthropistTimePressureScore, 2) +
        Math.pow(0.75 - expectedPhilanthropistTimePressureScore, 2)) /
        2,
    );
    expect(philanthropistResult?.Altruism?.score).toBeCloseTo(
      expectedPhilanthropistAltruismScore,
      5,
    );
    expect(philanthropistResult?.Altruism?.standardDeviation).toBeCloseTo(
      expectedPhilanthropistAltruismStdDev,
      5,
    );
    expect(philanthropistResult?.TimePressure?.score).toBeCloseTo(
      expectedPhilanthropistTimePressureScore,
      5,
    );
    expect(philanthropistResult?.TimePressure?.standardDeviation).toBeCloseTo(
      expectedPhilanthropistTimePressureStdDev,
      5,
    );
  });
});
