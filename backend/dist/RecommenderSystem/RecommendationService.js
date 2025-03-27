"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RecommendationAssembler_1 = __importDefault(require("./RecommendationAssembler"));
class RecommendationService {
    recommendationAssembler;
    constructor() {
        this.recommendationAssembler = new RecommendationAssembler_1.default();
    }
    recommend(input) {
        return this.recommendationAssembler.assembleRecommendations(input);
    }
    getRecommender() {
        console.log("getRecommender not implemented yet");
        return "not implemented yet";
    }
}
exports.default = RecommendationService;
