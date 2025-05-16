import {
  GamificationElementObject,
  GamificationElements,
} from "../types/GamificationElementRepository";
import {
  RecommendationInputObject,
  RecommendationEndResult,
  RecommenderResults,
} from "../types/RecommendationObjectTypes";
import { RecommenderValuesObject } from "../types/RecommenderObjectTypes";
import MeanCalculator from "./Helper/MeanCalculator";
import StandardRecommender from "./Recommender/StandardRecommender";

class RecommendationAssembler {
  recommenderList: {
    recommender: StandardRecommender;
    recommenderKey: keyof typeof RecommenderValuesObject;
  }[];
  meanCalculator: MeanCalculator;

  constructor() {
    const linkToJsonFiles = "./src/RecommenderSystem/Recommender/RecommenderData/";
    this.recommenderList = [
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "GenderBasedRecommender.json", "gender"),
        recommenderKey: "gender"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "PlayerBasedRecommender.json", "player"),
        recommenderKey: "player"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "PersonalityBasedRecommender.json", "personality"),
        recommenderKey: "personality"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LATBasedRecommender.json", "learningActivityTask"),
        recommenderKey: "learningActivityTask"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "AgeBasedRecommender.json", "age"),
        recommenderKey: "age"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json", "learningStyleOfProcessingInformation"),
        recommenderKey: "learningStyleOfProcessingInformation"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json", "learningStyleOfIntuitivity"),
        recommenderKey: "learningStyleOfIntuitivity"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json", "learningStyleOfPerception"),
        recommenderKey: "learningStyleOfPerception"
      },
      {
        recommender: new StandardRecommender(
          linkToJsonFiles + "LearningStyleBasedRecommender.json", "learningStyleOfUnderstanding"),
        recommenderKey: "learningStyleOfUnderstanding"
      }
    ];
    this.meanCalculator = new MeanCalculator();
  }

  assembleRecommendations(
    input: RecommendationInputObject,
  ): RecommendationEndResult {
    const result = new RecommendationEndResult();
    this.recommenderList.forEach(recommenderElement => {
      const resultPerRecommender = recommenderElement.recommender.recommend(input);
      result.elements = result.elements.map((resultElementObject) => {
        resultElementObject = this.addRecommenderScoresToResult(
          resultElementObject,
          resultPerRecommender,
          recommenderElement.recommenderKey,
        );
        return resultElementObject;
      });
    });

    result.elements = result.elements.map((resultElementObject) => {
      resultElementObject = this.calculateMeanStandardDeviation(resultElementObject);
      resultElementObject = this.setOverallScoreAndStandardDeviation(resultElementObject);
      return resultElementObject;
    });

    result.elements = result.elements.sort((a, b) => {
      return b.score.overallScore - a.score.overallScore;
    });

    return result;
  }

  addRecommenderScoresToResult(
    element: GamificationElementObject,
    recommendation: RecommenderResults | undefined,
    key: string,
  ) {
    if (!key) {
      throw new Error("Key is undefined");
    }
    const adaptedElement = element;
    const elementKey =
      adaptedElement.elementName as keyof typeof GamificationElements;
    if (!(recommendation === undefined) && recommendation[elementKey]) {
      adaptedElement.score.scores[key] = recommendation[elementKey].score;
      adaptedElement.standardDeviation.standardDeviations[key] =
        recommendation[elementKey].standardDeviation;
      adaptedElement.scoreWeight.weights[key] =
        recommendation[elementKey].scoreWeight;
    }
    return adaptedElement;
  }

  calculateMeanStandardDeviation(element: GamificationElementObject) {
    const adaptedElement = element;
    if (
      !(
        Object.keys(adaptedElement.standardDeviation.standardDeviations)
          .length === 0
      )
    ) {
      adaptedElement.standardDeviation.meanStandardDeviation =
        this.meanCalculator.calculateMeanAndStdDev(
          Object.values(
            adaptedElement.standardDeviation.standardDeviations,
          ).filter((value): value is number => value !== undefined),
        ).score;
    }
    return adaptedElement;
  }

  setOverallScoreAndStandardDeviation(element: GamificationElementObject) {
    const adaptedElement = element;
    if (!(Object.keys(adaptedElement.score.scores).length === 0)) {
      const overallCalculation =
        this.meanCalculator.calculateWeightedMeanAndStdDev(
          Object.values(adaptedElement.score.scores).filter(
            (value): value is number => value !== undefined,
          ),
          Object.values(adaptedElement.scoreWeight.weights).filter(
            (value): value is number => value !== undefined,
          ),
        );
      adaptedElement.score.overallScore = overallCalculation.score;
      adaptedElement.standardDeviation.overallStandardDeviation =
        overallCalculation.standardDeviation;
      adaptedElement.scoreWeight.sumOfWeights = overallCalculation.sumOfWeights;
    } else {
      adaptedElement.score.overallScore = 0.5;
      adaptedElement.standardDeviation.overallStandardDeviation = 0;
      adaptedElement.scoreWeight.sumOfWeights = 0;
    }
    return adaptedElement;
  }
}

export default RecommendationAssembler;
