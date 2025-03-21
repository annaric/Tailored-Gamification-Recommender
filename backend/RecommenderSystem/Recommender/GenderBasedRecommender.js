const AbstractRecommender = require("./AbstractRecommender");

class GenderBasedRecommender extends AbstractRecommender {
  
  constructor() {
    super(); 
    this.CompetitionDictonary = {'female': 1, 'male': 0};
  }

  recommend(input) {
    return this.CompetitionDictonary[input]; 
  }

  updateAlgorithm() {
    this.CompetitionDictonary = {'female': 1.5, 'male': 0.5};
  }
}

module.exports = GenderBasedRecommender;
