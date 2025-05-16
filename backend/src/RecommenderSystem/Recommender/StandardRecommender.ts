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
  
 
  class StandardRecommender extends AbstractRecommender {
    constructor(src: string, recommenderKey: keyof typeof RecommenderValuesObject) {
      super(src, recommenderKey);
    }
  
    recommend(input: RecommendationInputObject): RecommenderResults | undefined {
      if (!(this.recommenderKey in input) || !input[this.recommenderKey] || !RecommenderValuesObject[this.recommenderKey].includes(input[this.recommenderKey]!)) {
        console.log("input not valid");
        return undefined;
      }
      if (this.resultDictonary === undefined) {
        throw new Error("Result dictionary is not defined");
      }
      const result: RecommenderResults = {};
      GamificationElementArray.forEach((key) => {
        if (this.resultDictonary[key] && this.resultDictonary[key][input[this.recommenderKey]!]) {
          result[key] = {
            score: this.resultDictonary[key][input[this.recommenderKey]!]!.score,
            standardDeviation:
            this.resultDictonary[key][input[this.recommenderKey]!]!.standardDeviation,
            scoreWeight: this.resultDictonary[key][input[this.recommenderKey]!]!.scoreWeight,
          };
        }
      });
      return result;
    }
  
    updateAlgorithm(): ResultDictonary {
      const jsonFileReader = new JsonFileReader();
      const dataNormalizer = new DataNormalizer();
      const dataAssembler = new DataAssembler();
      const recommenderBasedRecommenderData: LiteratureElementObject[] =
        jsonFileReader.readJsonFile(this.src);
      const resultDictonary: ResultDictonary = {};
      
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
          resultDictonary[key] = dataAssembler.assembleData(
            resultArrayForOneElement,
          );
        }
      });
      return resultDictonary;
    }
  }
  
  export default StandardRecommender;
  