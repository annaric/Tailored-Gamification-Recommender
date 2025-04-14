import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import fs from "fs";
import { LiteratureResultTypeEnum } from "../../types/LiteratureTypeEnum";

export default class JsonFileReader {
  readJsonFile(src: string): LiteratureElementObject[] {
    const result: LiteratureElementObject[] = JSON.parse(
      fs.readFileSync(src, "utf-8"),
    ).literature;
    this.checkValidityOfJsonFile(result);
    return result;
  }

  checkValidityOfJsonFile(
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
