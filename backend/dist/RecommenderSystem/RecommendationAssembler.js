"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const GenderBasedRecommender_1 = __importDefault(
  require("./Recommender/GenderBasedRecommender"),
);
class RecommendationAssembler {
  genderBasedRecommender;
  constructor() {
    this.genderBasedRecommender = new GenderBasedRecommender_1.default();
  }
  assembleRecommendations(input) {
    return this.genderBasedRecommender.recommend(input);
  }
}
exports.default = RecommendationAssembler;
