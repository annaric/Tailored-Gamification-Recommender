const RecommendationAssembler = require("./RecommendationAssembler");

class RecommendationService {
  constructor() {
    this.recommendationAssembler = new RecommendationAssembler();
  }

  recommend(input) {
    return this.recommendationAssembler.assembleRecommendations(input);
  }

  getRecommender() {
    console.log("not implemented yet");
    return "not implemented yet";
  }
}

module.exports = RecommendationService;
