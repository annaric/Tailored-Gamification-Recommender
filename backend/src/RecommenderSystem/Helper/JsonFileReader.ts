import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import fs from "fs";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";

export default class JsonFileReader {
  /**
   * Reads a JSON file and parses it into an array of `LiteratureElementObject`.
   * Validates the structure of the JSON file to ensure it conforms to the expected format.
   * @param src - The file path to the JSON file.
   * @returns An array of `LiteratureElementObject` parsed from the JSON file.
   * @throws An error if the file is invalid or does not conform to the expected structure.
   */
  readJsonFile(src: string): LiteratureElementObject[] {
    const result: LiteratureElementObject[] = JSON.parse(
      fs.readFileSync(src, "utf-8"),
    ).literature;
    this.checkValidityOfLiteratureJsonFile(result);
    return result;
  }

  /**
   * Validates the structure of a `LiteratureElementObject` array.
   * Ensures that all required keys are present and have valid values.
   * @param literatureObject - The array of `LiteratureElementObject` to validate.
   * @returns `true` if the validation is successful.
   * @throws An error if the validation fails.
   */
  checkValidityOfLiteratureJsonFile(
    literatureObject: LiteratureElementObject[],
  ): boolean {
    if (!Array.isArray(literatureObject)) {
      throw new Error("Invalid Json File: expected an array");
    }
    literatureObject.forEach((element) => {
      if (!("resultType" in element)) {
        throw new Error("Invalid Json File: expected 'resultType' key");
      }
      if (!(element.resultType in LiteratureResultTypeEnum)) {
        throw new Error(
          "Invalid Json File: expected 'resultType' keyInvalid Json File: expected 'resultType' key to be one of the LiteratureResultTypeEnum values",
        );
      }
      if (!("bestValue" in element)) {
        throw new Error("Invalid Json File: expected 'bestValue' key");
      }
      if (!("minValue" in element)) {
        throw new Error("Invalid Json File: expected 'minValue' key");
      }
      if (!("maxValue" in element)) {
        throw new Error("Invalid Json File: expected 'maxValue' key");
      }
      if (!("result" in element)) {
        throw new Error("Invalid Json File: expected 'result' key");
      }
    });
    return true;
  }
}
