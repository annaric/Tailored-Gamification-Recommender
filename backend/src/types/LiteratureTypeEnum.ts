export enum LiteratureResultTypeEnum {
  PositiveNumber = "PositiveNumber", // Review Paper, die nur positive "Korrelationen" zurückgeben. [0, maxValue]
  Correlation = "Correlation", // Correlation Paper
  Binary = "Binary",
  Scale = "Scale", // Scale Paper, die den User nach Bewertung fragen zwischen mag ich garnicht und mag ich sehr.
}
