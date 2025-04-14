import fs from "fs";
import JsonFileReader from "../../../src/RecommenderSystem/Helper/JsonFileReader";

// Mock the `fs` module to simulate reading a JSON file

describe("Test JsonFileReader", () => {

  beforeEach(() => {
    jest.mock("fs");
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("should throw an Error when resulttype is missing in JSON file", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          bestValue: 9,
          maxValue: 9,
          minValue: 1,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        },
      ],
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected 'resultType' key",
      ),
    );
  });

  it("should throw an Error when Json file is not an array", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: 
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 9,
          maxValue: 9,
          minValue: 1,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        },
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected an array",
      ),
    );
  });

  it("should throw an Error when resulttype is wrong in JSON file", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "WrongResultType",
          bestValue: 9,
          maxValue: 9,
          minValue: 1,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        },
      ],
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected 'resultType' keyInvalid Json File: expected 'resultType' key to be one of the LiteratureResultTypeEnum values",
      ),
    );
  });

  it("should throw an Error when minValue is missing in JSON file", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 9,
          maxValue: 9,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        },
      ],
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected 'minValue' key",
      ),
    );
  });

  it("should throw an Error when maxValue is missing in JSON file", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 9,
          minValue: 1,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        },
      ],
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected 'maxValue' key",
      ),
    );
  });

  it("should throw an Error when bestValue is missing in JSON file", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          minValue: 1,
          maxValue: 9,
          result: {
            Incentive: {
              male: 4.6,
              female: 2.3,
            },
          },
        },
      ],
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected 'bestValue' key",
      ),
    );
  });

  it("should throw an Error when result is missing in JSON file", () => {
    const mockReadJsonFileReturnValue = JSON.stringify({
      literature: [
        {
          title: "Paper 1",
          author: "author 1",
          paperType: "Type A",
          resultType: "Scale",
          bestValue: 9,
          maxValue: 9,
          minValue: 1,
        },
      ],
    });

    jest.spyOn(fs, "readFileSync").mockReturnValue(mockReadJsonFileReturnValue);

    expect(() =>
      JsonFileReader.prototype.readJsonFile(
        "./src/RecommenderSystem/Recommender/RecommenderData/GenderBasedRecommender.json",
      ),
    ).toThrow(
      new Error(
        "Invalid Json File: expected 'result' key",
      ),
    );
  });
});
