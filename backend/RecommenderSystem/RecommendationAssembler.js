const GenderBasedRecommender = require("./Recommender/GenderBasedRecommender");

class RecommendationAssembler {
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender();
  }

  assembleRecommendations(input) {
    return this.genderBasedRecommender.recommend(input);
  }
}

module.exports = RecommendationAssembler;
