import { LiteratureElementObject } from "../../types/LiteratureElementObject";
import fs from "fs";

export default class JsonFileReader {
    readJsonFile(src: string): LiteratureElementObject[] {
        const result: LiteratureElementObject[] = JSON.parse(
          fs.readFileSync(src, "utf-8"),
        ).literature;
        if (
          !Array.isArray(result) ||
          !("resultType" in result[0]) ||
          !("bestValue" in result[0]) ||
          !("minValue" in result[0]) ||
          !("maxValue" in result[0]) ||
          !("result" in result[0])
        ) {
          throw new Error(
            "Invalid data format: data must be an array of LiteratureElementObject",
          );
        }
        return result;
      }
}