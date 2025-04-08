import {
  RecommendationScoreObject,
  RecommendationStandardDeviationObject,
} from "./RecommendationObjectTypes";

export enum GamificationElements {
  //Altruism = 'Altruism',
  //Assistance = 'Assistance',
  //Challenge = 'Challenge',
  //Chance = 'Chance',
  //Competition = 'Competition',
  //Customization = 'Customization',
  //Feedback = 'Feedback',
  //Guild = 'Guild',
  //Immersion = 'Immersion',
  Incentive = "Incentive",
  //Progression = 'Progression',
  //TimePressure = 'TimePressure',
  //VirtualEconomy = 'VirtualEconomy',
}

export enum GamificationElementDetails {
  //Altruism = "Altruism allows you to make a meaningful contribution to other users or the app itself by sharing knowledge or items with others or helping to improve the system.",
  //Assistance = "Assistance supports you in your tasks through, for example, guides, power-ups and boosters, the ability to retry a task, or free mistakes.",
  //Challenge = "Challenges strategically challenge you through, for example, riddles, puzzles, difficult tasks, or so-called boss fights that test all the knowledge you have gained so far.",
  //Chance = "Chance enables completely random outcomes, primarily in the form of rewards through, for example, spinning wheels or mystery boxes."
  //Competition = "Competitions are, for example, leaderboards, as well as duels or contests where you compete against your fellow players.",
  //Customization = "Customization allows you to design your own digital avatar or customize the game world according to your personal preferences.",
  //Feedback = "Feedback provides you with positive or negative visual or auditory responses regarding your behavior.",
  //Guild = "Guild allows you to complete tasks as a team with your fellow players or communicate with them via chat.",
  //Immersion = "Immersion gives tasks meaning through storytelling, narrative, exploration, and choices.",
  Incentive = "Rewards or incentives are elements like badges, achievements, collectibles, or points that you receive, for example, for completing tasks",
  //Progression = "Progression displays your current overall or specific progress through for example levels, milestones, progress bars, or concept maps.",
  //TimePressure = 'Time Pressure aims to motivate you through time pressure, with elements such as a time limit or a given deadline.',
  //VirtualEconomy = "Virtual economy allows you to buy, trade, or gift virtual items using virtually earned currency."
}

export class GamificationElementObject {
  imageSrc: string;
  elementName: string;
  details: string;
  scores: RecommendationScoreObject;
  standardDeviations: RecommendationStandardDeviationObject;

  constructor(
    imageSrc: string,
    elementName: string,
    details: string,
    scores: RecommendationScoreObject = new RecommendationScoreObject(),
    standardDeviations: RecommendationStandardDeviationObject = new RecommendationStandardDeviationObject(),
  ) {
    this.imageSrc = imageSrc;
    this.elementName = elementName;
    this.details = details;
    this.scores = scores;
    this.standardDeviations = standardDeviations;
  }
}
