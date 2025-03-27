import AbstractRecommender from "./AbstractRecommender";
let CompetitionDictonary: {female: number, male: number};

class GenderBasedRecommender extends AbstractRecommender {
  
  constructor() {
    super();
  }

  recommend(...input: string[]): number {
    if (input[0] === 'female' || input[0] === 'male') {
      return CompetitionDictonary[input[0]];
    }
    throw new Error("Invalid input");
  }

  updateAlgorithm() {
    CompetitionDictonary = { female: 1.5, male: 0.5 };
  }
}

export default GenderBasedRecommender;
