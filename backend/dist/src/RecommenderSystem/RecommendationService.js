import RecommendationAssembler from "./RecommendationAssembler";
class RecommendationService {
    recommendationAssembler;
    constructor() {
        this.recommendationAssembler = new RecommendationAssembler();
    }
    recommend(input) {
        return this.recommendationAssembler.assembleRecommendations(input);
    }
    getRecommender() {
        console.log("getRecommender not implemented yet");
        return "not implemented yet";
    }
}
export default RecommendationService;
