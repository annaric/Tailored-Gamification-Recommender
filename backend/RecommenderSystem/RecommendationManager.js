const GenderBasedRecommender = require("./Recommender/GenderBasedRecommender");

class RecommendationManager {
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender(); // Instantiate the GenderBasedRecommender
  }

  recommend(input) {
    return this.genderBasedRecommender.recommend(input); // Use the instance to call the recommend method
  }
}

module.exports = RecommendationManager;
