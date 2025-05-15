import {
    RecommendationInputObject,
    RecommenderResults,
  } from "../../types/RecommendationObjectTypes";
  import AbstractRecommender, { ResultDictonary } from "./AbstractRecommender";
  import { LiteratureElementObject } from "../../types/LiteratureElementObject";
  import {
    GamificationElementArray,
    GamificationElements,
  } from "../../types/GamificationElementRepository";
  import { RecommenderValuesObject } from "../../types/RecommenderObjectTypes";
  import DataNormalizer from "../Helper/DataNormalizer";
  import JsonFileReader from "../Helper/JsonFileReader";
  import DataAssembler from "../Helper/DataAssembler";
  
  const ResultDictonary: ResultDictonary = {};
  
  class StandardRecommender extends AbstractRecommender {
    constructor(src: string, recommenderKey: keyof typeof RecommenderValuesObject) {
      super(src, recommenderKey);
    }
  
    recommend(input: RecommendationInputObject): RecommenderResults | undefined {
      if (!(this.recommenderKey in input) || !input[this.recommenderKey] || !RecommenderValuesObject[this.recommenderKey].includes(input[this.recommenderKey]!)) {
        console.log("input not valid");
        return undefined;
      }
      if (ResultDictonary === undefined) {
        throw new Error("Result dictionary is not defined");
      }
      const result: RecommenderResults = {};
      GamificationElementArray.forEach((key) => {
        if (ResultDictonary[key] && ResultDictonary[key][input[this.recommenderKey]!]) {
          result[key] = {
            score: ResultDictonary[key][input[this.recommenderKey]!]!.score,
            standardDeviation:
              ResultDictonary[key][input[this.recommenderKey]!]!.standardDeviation,
            scoreWeight: ResultDictonary[key][input[this.recommenderKey]!]!.scoreWeight,
          };
        }
      });
      return result;
    }
  
    updateAlgorithm() {
      const jsonFileReader = new JsonFileReader();
      const dataNormalizer = new DataNormalizer();
      const dataAssembler = new DataAssembler();
      const recommenderBasedRecommenderData: LiteratureElementObject[] =
        jsonFileReader.readJsonFile(this.src);

      if (!( this.recommenderKey in RecommenderValuesObject)) {
            throw new Error(
            `Recommender key ${this.recommenderKey} is not valid. Valid keys are: ${Object.keys(
                RecommenderValuesObject,
            ).join(", ")}`,
            );
        }
  
      GamificationElementArray.forEach((key) => {
        const resultArrayForOneElement = dataNormalizer.normalizeLiteratureData(
          recommenderBasedRecommenderData,
          GamificationElements[key],
          RecommenderValuesObject[this.recommenderKey],
        );
        if (resultArrayForOneElement.length !== 0) {
          ResultDictonary[key] = dataAssembler.assembleData(
            resultArrayForOneElement,
          );
        }
      });
    }
  }
  
  export default StandardRecommender;
  