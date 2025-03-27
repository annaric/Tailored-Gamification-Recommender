import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";

class RecommendationAssembler {
  genderBasedRecommender: GenderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }

  assembleRecommendations(input: any) {
    return this.genderBasedRecommender.recommend(input);
  }
}

export default RecommendationAssembler;
