import { RecommendationObject } from "./RecommendationObject";
import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }

  assembleRecommendations(input: RecommendationObject) {
    return this.genderBasedRecommender.recommend(input);
  }
}

export default RecommendationAssembler;
