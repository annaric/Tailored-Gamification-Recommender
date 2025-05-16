import {
  RecommendationScoreObject,
  RecommendationScoreWeightObject,
  RecommendationStandardDeviationObject,
} from "./RecommendationObjectTypes";

/**
 * Enum representing the different gamification elements that exist in the system.
 * Each key corresponds to a gamification element, and the value is its name.
 */
export enum GamificationElement {
  Altruism = "Altruism",
  Assistance = "Assistance",
  Challenge = "Challenge",
  Chance = "Chance",
  Competition = "Competition",
  Customization = "Customization",
  Feedback = "Feedback",
  Guild = "Guild",
  Immersion = "Immersion",
  Incentive = "Incentive",
  Progression = "Progression",
  TimePressure = "TimePressure",
  VirtualEconomy = "VirtualEconomy",
}

/**
 * Enum representing detailed descriptions for each gamification element.
 * Each key corresponds to a gamification element, and the value is its description.
 */
export enum GamificationElementDetail {
  Altruism = "Altruism allows you to make a meaningful contribution to other users or the app itself by sharing knowledge or items with others or helping to improve the system.",
  Assistance = "Assistance supports you in your tasks through, for example, guides, power-ups and boosters, the ability to retry a task, or free mistakes.",
  Challenge = "Challenges strategically challenge you through, for example, riddles, puzzles, difficult tasks, or so-called boss fights that test all the knowledge you have gained so far.",
  Chance = "Chance enables completely random outcomes, primarily in the form of rewards through, for example, spinning wheels or mystery boxes.",
  Competition = "Competitions are, for example, leaderboards, as well as duels or contests where you compete against your fellow players.",
  Customization = "Customization allows you to design your own digital avatar or customize the game world according to your personal preferences.",
  Feedback = "Feedback provides you with positive or negative visual or auditory responses regarding your behavior.",
  Guild = "Guild allows you to complete tasks as a team with your fellow players or communicate with them via chat.",
  Immersion = "Immersion gives tasks meaning through storytelling, narrative, exploration, and choices.",
  Incentive = "Rewards or incentives are elements like badges, achievements, collectibles, or points that you receive, for example, for completing tasks",
  Progression = "Progression displays your current overall or specific progress through for example levels, milestones, progress bars, or concept maps.",
  TimePressure = "Time Pressure aims to motivate you through time pressure, with elements such as a time limit or a given deadline.",
  VirtualEconomy = "Virtual economy allows you to buy, trade, or gift virtual items using virtually earned currency.",
}

/**
 * Array of all gamification element keys.
 * This is useful for iterating over all gamification elements.
 */
export const GamificationElementArray: Array<keyof typeof GamificationElement> =
  Object.keys(GamificationElement) as Array<keyof typeof GamificationElement>;

/**
 * Class representing a gamification element object.
 * Contains properties such as the element's name, image source, details, score, standard deviation, and score weight.
 */
export class GamificationElementObject {
  imageSrc: string;
  elementName: string;
  details: string;
  score: RecommendationScoreObject;
  standardDeviation: RecommendationStandardDeviationObject;
  scoreWeight: RecommendationScoreWeightObject;

  /**
   * Constructs an instance of the `GamificationElementObject` class.
   * @param elementName - The name of the gamification element.
   * @param imageSrc - The image source for the gamification element (optional).
   * @param details - The detailed description of the gamification element (optional).
   * @param score - The score object for the gamification element (optional).
   * @param standardDeviation - The standard deviation object for the gamification element (optional).
   * @param scoreWeight - The score weight object for the gamification element (optional).
   */
  constructor(
    elementName: string,
    imageSrc: string = "",
    details: string = "",
    score: RecommendationScoreObject = new RecommendationScoreObject(),
    standardDeviation: RecommendationStandardDeviationObject = new RecommendationStandardDeviationObject(),
    scoreWeight: RecommendationScoreWeightObject = new RecommendationScoreWeightObject(),
  ) {
    // Set the image source, defaulting to a file named after the element if not provided
    this.imageSrc = imageSrc == "" ? `${elementName}.png` : imageSrc;
    this.elementName = elementName;
    // Set the details, defaulting to the description from GamificationElementDetail if not provided
    this.details =
      details == ""
        ? GamificationElementDetail[
            elementName as keyof typeof GamificationElementDetail
          ]
        : details;
    this.score = score;
    this.standardDeviation = standardDeviation;
    this.scoreWeight = scoreWeight;
  }
}
