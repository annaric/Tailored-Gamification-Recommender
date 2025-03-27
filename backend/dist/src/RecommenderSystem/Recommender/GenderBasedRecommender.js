import AbstractRecommender from "./AbstractRecommender";
class GenderBasedRecommender extends AbstractRecommender {
  CompetitionDictonary;
  constructor() {
    super();
  }
  recommend(...input) {
    return this.CompetitionDictonary[input[0]];
  }
  updateAlgorithm() {
    this.CompetitionDictonary = { female: 1.5, male: 0.5 };
  }
}
export default GenderBasedRecommender;
