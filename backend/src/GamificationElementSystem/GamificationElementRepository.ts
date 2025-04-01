import { RecommendationPercentageObject } from "../RecommenderSystem/RecommendationObjectTypes";

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
  //VirtualEconomy = 'VirtualEconomy'
}

export enum GamificationElementDetails {
  //Altruism = 'Altruism description',
  //Assistance = 'Assistance description',
  //Challenge = 'Challenge description',
  //Chance = 'Chance description',
  //Competition = 'Competition description',
  //Customization = 'Customization description',
  //Feedback = 'Feedback description',
  //Guild = 'Guild description',
  //Immersion = 'Immersion description',
  Incentive = "Incentive description",
  //Progression = 'Progression description',
  //TimePressure = 'TimePressure description',
  //VirtualEconomy = 'VirtualEconomy description'
}

export class GamificationElementObject {
  imageSrc: string;
  elementName: string;
  details: string;
  ranking: number;
  percentages: RecommendationPercentageObject;

  constructor(
    imageSrc: string,
    elementName: string,
    details: string,
    ranking: number = 0,
    percentages: RecommendationPercentageObject = new RecommendationPercentageObject(),
  ) {
    this.imageSrc = imageSrc;
    this.elementName = elementName;
    this.details = details;
    this.ranking = ranking;
    this.percentages = percentages;
  }
}
