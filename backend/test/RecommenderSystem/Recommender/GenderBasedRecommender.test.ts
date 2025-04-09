import fs from "fs";
import { assert } from "console";
import GenderBasedRecommender from "../../../src/RecommenderSystem/Recommender/GenderBasedRecommender";
import { LiteratureElementObject } from "../../../src/types/LiteratureElementObject";

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

  it("should correctly update the IncentiveDictonary with positive number literature", () => {
    const mockReadJsonFileReturnValue: { literature: LiteratureElementObject[] } = {
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
        }
      ],
    };
    
    jest.spyOn(GenderBasedRecommender.prototype, "readJsonFile").mockImplementation((src: string) => {
      assert(src === "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json", "The src path is not correct");
      return mockReadJsonFileReturnValue.literature;
    });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizePositiveDataPaperSpy = jest.spyOn(recommender, "normalizePositiveDataPaper");

    recommender.updateAlgorithm();

    const expectedMaleScore = 0.5 + (2/6) * 0.5
    const expectedFemaleScore = 0.5 + (4/6) * 0.5

    const expectedIncentiveDictonaryValues = {
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
    expect(assembleDataSpy).toHaveReturnedWith(expectedIncentiveDictonaryValues);
  });

  it("should correctly update the IncentiveDictonary with Correlation number literature", () => {
    const mockReadJsonFileReturnValue: { literature: LiteratureElementObject[] } = {
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
        }
      ],
    };
    
    jest.spyOn(GenderBasedRecommender.prototype, "readJsonFile").mockImplementation((src: string) => {
      assert(src === "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json", "The src path is not correct");
      return mockReadJsonFileReturnValue.literature;
    });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeCorrelationDataPaperSpy = jest.spyOn(recommender, "normalizeCorrelationDataPaper");

    recommender.updateAlgorithm();

    const expectedMaleScore = (-0.7 + 1) / 2
    const expectedFemaleScore = (0.3 + 1) / 2

    const expectedIncentiveDictonaryValues = {
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
    expect(assembleDataSpy).toHaveReturnedWith(expectedIncentiveDictonaryValues);
  });

  it("should correctly update the IncentiveDictonary with Binary number literature", () => {
    const mockReadJsonFileReturnValue: { literature: LiteratureElementObject[] } = {
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
        }
      ],
    };
    
    jest.spyOn(GenderBasedRecommender.prototype, "readJsonFile").mockImplementation((src: string) => {
      assert(src === "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json", "The src path is not correct");
      return mockReadJsonFileReturnValue.literature;
    });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeBinaryDataPaperSpy = jest.spyOn(recommender, "normalizeBinaryDataPaper");

    recommender.updateAlgorithm();

    const expectedMaleScore = 0.25
    const expectedFemaleScore = 0.75

    const expectedIncentiveDictonaryValues = {
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
    expect(assembleDataSpy).toHaveReturnedWith(expectedIncentiveDictonaryValues);
  });

  it("should correctly update the IncentiveDictonary with Scale number literature where best value is min", () => {
    const mockReadJsonFileReturnValue: { literature: LiteratureElementObject[] } = {
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
        }
      ],
    };
    
    jest.spyOn(GenderBasedRecommender.prototype, "readJsonFile").mockImplementation((src: string) => {
      assert(src === "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json", "The src path is not correct");
      return mockReadJsonFileReturnValue.literature;
    });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(recommender, "normalizeScaleDataPaper");

    recommender.updateAlgorithm();

    const expectedMaleScore = 1 - (4.6 - 1) / (5 - 1)
    const expectedFemaleScore = 1 - (2.3 - 1) / (5 - 1)

    const expectedIncentiveDictonaryValues = {
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
    expect(assembleDataSpy).toHaveReturnedWith(expectedIncentiveDictonaryValues);
  });

  it("should correctly update the IncentiveDictonary with Scale number literature where best value is max", () => {
    const mockReadJsonFileReturnValue: { literature: LiteratureElementObject[] } = {
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
        }
      ],
    };
    
    jest.spyOn(GenderBasedRecommender.prototype, "readJsonFile").mockImplementation((src: string) => {
      assert(src === "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json", "The src path is not correct");
      return mockReadJsonFileReturnValue.literature;
    });

    const assembleDataSpy = jest.spyOn(recommender, "assembleData");
    const normalizeScaleDataPaperSpy = jest.spyOn(recommender, "normalizeScaleDataPaper");

    recommender.updateAlgorithm();

    const expectedMaleScore = (4.6 - 1) / (5 - 1)
    const expectedFemaleScore = (2.3 - 1) / (5 - 1)

    const expectedIncentiveDictonaryValues = {
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
    expect(assembleDataSpy).toHaveReturnedWith(expectedIncentiveDictonaryValues);
  });

  it("should throw an Error when result type is invalid", () => {
    const mockReadJsonFileReturnValue: { literature: LiteratureElementObject[] } = {
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "FalseType",
          bestValue: 5,
          minValue: 1,
          maxValue: 5,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        }
      ],
    };
    
    jest.spyOn(GenderBasedRecommender.prototype, "readJsonFile").mockImplementation((src: string) => {
      assert(src === "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json", "The src path is not correct");
      return mockReadJsonFileReturnValue.literature;
    });

    expect(() => recommender.updateAlgorithm()).toThrow(new Error("Invalid result type"));
  });

  it("should throw an Error when JSON file is invalid (missing important keys)", () => {
    jest.mock("fs");
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "FalseType",
          bestValue: 5,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        }
      ],
    });
     
    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);
    
    expect(() => recommender.readJsonFile("./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json"))
      .toThrow(new Error("Invalid data format: genderBasedRecommenderData must be an array of LiteratureElementObject"));
  });
});