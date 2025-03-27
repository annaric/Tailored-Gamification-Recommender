import GenderBasedRecommender from "./Recommender/GenderBasedRecommender";
class RecommendationAssembler {
  genderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }
  assembleRecommendations(input) {
    return this.genderBasedRecommender.recommend(input);
  }
}
export default RecommendationAssembler;
