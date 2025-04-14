import { assert } from "console";
import GenderBasedRecommender from "../../../src/RecommenderSystem/Recommender/GenderBasedRecommender";
import { LiteratureElementObject } from "../../../src/types/LiteratureElementObject";
import JsonFileReader from "../../../src/RecommenderSystem/Helper/JsonFileReader";
import DataNormalizer from "../../../src/RecommenderSystem/Helper/DataNormalizer";

// Mock the `fs` module to simulate reading a JSON file

describe("Test GenderBasedRecommender update Algorithm", () => {
  let recommender: GenderBasedRecommender;

  beforeEach(() => {
    recommender = new GenderBasedRecommender();
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
              male: 2,
              female: 4,
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
            "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizePositiveDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizePositiveDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedMaleScore = 0.5 + (2 / 7) * 0.5;
    const expectedFemaleScore = 0.5 + (4 / 7) * 0.5;

    const expectedResultDictonaryValues = {
      male: {
        score: expectedMaleScore,
        standardDeviation: 0,
      },
      female: {
        score: expectedFemaleScore,
        standardDeviation: 0,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizePositiveDataPaperSpy).toHaveBeenCalledTimes(1);
    expect(assembleDataSpy).toHaveReturnedWith(expectedResultDictonaryValues);
  });

  it("should correctly update the ResultDictonary with Correlation number literature", () => {
    const mockReadJsonFileReturnValue: {
      literature: LiteratureElementObject[];
    } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Correlation",
          bestValue: 1,
          minValue: -1,
          maxValue: 1,
          result: {
            Incentive: {
              male: -0.7,
              female: 0.3,
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
            "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeCorrelationDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeCorrelationDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedMaleScore = (-0.7 + 1) / 2;
    const expectedFemaleScore = (0.3 + 1) / 2;

    const expectedResultDictonaryValues = {
      male: {
        score: expectedMaleScore,
        standardDeviation: 0,
      },
      female: {
        score: expectedFemaleScore,
        standardDeviation: 0,
      },
    };
    // Assert that the correct functions were called and with the expected returns
    expect(assembleDataSpy).toHaveBeenCalledTimes(1);
    expect(normalizeCorrelationDataPaperSpy).toHaveBeenCalledTimes(1);
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
              male: 0,
              female: 1,
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
            "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeBinaryDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeBinaryDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedMaleScore = 0.5;
    const expectedFemaleScore = 0.75;

    const expectedResultDictonaryValues = {
      male: {
        score: expectedMaleScore,
        standardDeviation: 0,
      },
      female: {
        score: expectedFemaleScore,
        standardDeviation: 0,
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
              male: 4.6,
              female: 2.3,
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
            "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeScaleDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedMaleScore = 1 - (4.6 - 1) / (5 - 1);
    const expectedFemaleScore = 1 - (2.3 - 1) / (5 - 1);

    const expectedResultDictonaryValues = {
      male: {
        score: expectedMaleScore,
        standardDeviation: 0,
      },
      female: {
        score: expectedFemaleScore,
        standardDeviation: 0,
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
              male: 4.6,
              female: 2.3,
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
            "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(
      DataNormalizer.prototype,
      "normalizeScaleDataPaper",
    );

    recommender.updateAlgorithm();

    const expectedMaleScore = (4.6 - 1) / (5 - 1);
    const expectedFemaleScore = (2.3 - 1) / (5 - 1);

    const expectedResultDictonaryValues = {
      male: {
        score: expectedMaleScore,
        standardDeviation: 0,
      },
      female: {
        score: expectedFemaleScore,
        standardDeviation: 0,
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
              male: 4.6,
              female: 2.3,
            },
            TimePressure: {
              male: 1.8,
              female: 7.4,
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
              male: 1,
              female: 0,
            },
            TimePressure: {
              male: 0,
              female: 1,
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
            "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
          "The src path is not correct",
        );
        return mockReadJsonFileReturnValue.literature;
      });

    const recommendSpy = jest.spyOn(recommender, "recommend");
    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
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

    //Assert that recommend gives back the correct values for male
    const maleResult = recommender.recommend({ gender: "male" });
    expect(recommendSpy).toHaveBeenCalledTimes(1);
    const expectedMaleAltruismScore = (3.6 / 8 + 0.75) / 2;
    const expectedMaleTimePressureScore = (0.8 / 8 + 0.5) / 2;
    const expectedMaleAltruismStdDev = Math.sqrt(
      (Math.pow(3.6 / 8 - expectedMaleAltruismScore, 2) +
        Math.pow(0.75 - expectedMaleAltruismScore, 2)) /
        2,
    );
    const expectedMaleTimePressureStdDev = Math.sqrt(
      (Math.pow(0.8 / 8 - expectedMaleTimePressureScore, 2) +
        Math.pow(0.5 - expectedMaleTimePressureScore, 2)) /
        2,
    );
    expect(maleResult?.Altruism?.score).toBeCloseTo(
      expectedMaleAltruismScore,
      5,
    );
    expect(maleResult?.Altruism?.standardDeviation).toBeCloseTo(
      expectedMaleAltruismStdDev,
      5,
    );
    expect(maleResult?.TimePressure?.score).toBeCloseTo(
      expectedMaleTimePressureScore,
      5,
    );
    expect(maleResult?.TimePressure?.standardDeviation).toBeCloseTo(
      expectedMaleTimePressureStdDev,
      5,
    );

    //Assert that recommend gives back the correct values for female
    const femaleResult = recommender.recommend({ gender: "female" });
    expect(recommendSpy).toHaveBeenCalledTimes(2);
    const expectedFemaleAltruismScore = (1.3 / 8 + 0.5) / 2;
    const expectedFemaleTimePressureScore = (6.4 / 8 + 0.75) / 2;
    const expectedFemaleAltruismStdDev = Math.sqrt(
      (Math.pow(1.3 / 8 - expectedFemaleAltruismScore, 2) +
        Math.pow(0.5 - expectedFemaleAltruismScore, 2)) /
        2,
    );
    const expectedFemaleTimePressureStdDev = Math.sqrt(
      (Math.pow(6.4 / 8 - expectedFemaleTimePressureScore, 2) +
        Math.pow(0.75 - expectedFemaleTimePressureScore, 2)) /
        2,
    );
    expect(femaleResult?.Altruism?.score).toBeCloseTo(
      expectedFemaleAltruismScore,
      5,
    );
    expect(femaleResult?.Altruism?.standardDeviation).toBeCloseTo(
      expectedFemaleAltruismStdDev,
      5,
    );
    expect(femaleResult?.TimePressure?.score).toBeCloseTo(
      expectedFemaleTimePressureScore,
      5,
    );
    expect(femaleResult?.TimePressure?.standardDeviation).toBeCloseTo(
      expectedFemaleTimePressureStdDev,
      5,
    );
  });
});
