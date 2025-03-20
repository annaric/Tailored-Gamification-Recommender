const GenderBasedRecommender = require("./Recommender/GenderBasedRecommender");

class RecommendationManager {
  constructor() {
    // You can initialize services, datasets, or any properties here
  }

  recommend(input) {
    GenderBasedRecommender.recommend(input);
  }
}

module.exports = RecommendationManager;
