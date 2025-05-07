import {
  GamificationElementObject,
  GamificationElements,
} from "../types/GamificationElementRepository";
import {
  RecommendationInputObject,
  RecommendationEndResult,
  RecommenderResults,
} from "../types/RecommendationObjectTypes";
import MeanCalculator from "./Helper/MeanCalculator";
import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";
import LearningActivityTaskBasedRecommender from "./Recommender/LATBasedRecommender";
import PersonalityBasedRecommender from "./Recommender/PersonalityBasedRecommender";
import LearningStyleBasedRecommender from "./Recommender/LearningStyleBasedRecommender";
import PlayerBasedRecommender from "./Recommender/PlayerBasedRecommender";
import AgeBasedRecommender from "./Recommender/AgeBasedRecommender";
import { LearningStyleKeys } from "../types/RecommenderObjectTypes";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  playerBasedRecommender: PlayerBasedRecommender;
  personalityBasedRecommender: PersonalityBasedRecommender;
  latBasedRecommender: LearningActivityTaskBasedRecommender;
  learningStyleBasedRecommender: LearningStyleBasedRecommender;
  ageBasedRecommender: AgeBasedRecommender;
  meanCalculator: MeanCalculator;

  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
    this.playerBasedRecommender = new PlayerBasedRecommender();
    this.personalityBasedRecommender = new PersonalityBasedRecommender();
    this.latBasedRecommender = new LearningActivityTaskBasedRecommender();
    this.learningStyleBasedRecommender = new LearningStyleBasedRecommender();
    this.ageBasedRecommender = new AgeBasedRecommender();
    this.meanCalculator = new MeanCalculator();
  }

  assembleRecommendations(
    input: RecommendationInputObject,
  ): RecommendationEndResult {
    const genderBasedRecommendation =
      this.genderBasedRecommender.recommend(input);
    const playerBasedRecommendation =
      this.playerBasedRecommender.recommend(input);
    const personalityBasedRecommendation =
      this.personalityBasedRecommender.recommend(input);
    const latBasedRecommendation = this.latBasedRecommender.recommend(input);
    const learningStyleBasedRecommendation =
      this.learningStyleBasedRecommender.recommend(input);
    const ageBasedRecommendation = this.ageBasedRecommender.recommend(input);
    const result = new RecommendationEndResult();

    result.elements = result.elements.map((element) => {
      element = this.addRecommenderScorestoResult(
        element,
        genderBasedRecommendation,
        "gender",
      );
      element = this.addRecommenderScorestoResult(
        element,
        playerBasedRecommendation,
        "player",
      );
      element = this.addRecommenderScorestoResult(
        element,
        personalityBasedRecommendation,
        "personality",
      );
      element = this.addRecommenderScorestoResult(
        element,
        ageBasedRecommendation,
        "age",
      );
      element = this.addRecommenderScorestoResult(
        element,
        latBasedRecommendation,
        "learningActivityTask",
      );
      if (!(learningStyleBasedRecommendation === undefined)) {
        const learningStyleKeys = Object.keys(LearningStyleKeys) as Array<keyof typeof LearningStyleKeys>;
        learningStyleKeys.forEach((learningStyle) => {
          element = this.addRecommenderScorestoResult(
            element,
            learningStyleBasedRecommendation[learningStyle],
            learningStyle,
          );
        });
      }
      element = this.calculateMeanStandardDeviation(element);
      element = this.setOverallScoreAndStandardDeviation(element);
      return element;
    });

    result.elements = result.elements.sort((a, b) => {
      return b.score.overallScore - a.score.overallScore;
    });

    return result;
  }

  addRecommenderScorestoResult(
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
      const overallCalculation = this.meanCalculator.calculateMeanAndStdDev(
        Object.values(adaptedElement.score.scores).filter(
          (value): value is number => value !== undefined,
        ),
      );
      adaptedElement.score.overallScore = overallCalculation.score;
      adaptedElement.standardDeviation.overallStandardDeviation =
        overallCalculation.standardDeviation;
    } else {
      adaptedElement.score.overallScore = 0;
      adaptedElement.standardDeviation.overallStandardDeviation = 0;
    }
    return adaptedElement;
  }
}

export default RecommendationAssembler;
