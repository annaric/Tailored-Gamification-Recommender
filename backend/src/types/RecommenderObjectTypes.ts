export enum Recommender {
  gender = "gender",
  player = "player",
  personality = "personality",
  lat = "lat",
  learningStyle = "learningStyle",
  age = "age",
}

export const GenderValues = ["female", "male"];

export const AgeValues = ["20-29", "30-39", "<20", ">39"];

export const PlayerValues = [
  "achiever",
  "disruptor",
  "freeSpirit",
  "philanthropist",
  "player",
  "socializer",
];

export const PersonalityValues = [
  "openness",
  "conscientiousness",
  "agreeableness",
  "extraversion",
  "neuroticism",
];

export const LATValues = [
  "remember",
  "understand",
  "apply",
  "analyze",
  "evaluate",
  "create",
];

export const LearningStyleValues = [
  "active",
  "reflective",
  "visual",
  "verbal",
  "sequential",
  "global",
  "sensor",
  "intuitive",
];

export const RecommenderValues = [
  ...GenderValues,
  ...PlayerValues,
  ...PersonalityValues,
  ...LATValues,
  ...LearningStyleValues,
  ...AgeValues,
];

export const RecommenderAndValues = {
  gender: GenderValues,
  player: PlayerValues,
  personality: PersonalityValues,
  lat: LATValues,
  learningStyle: LearningStyleValues,
  age: AgeValues,
};

export type RecommenderDependendLiteratureResults = {
  [key in (typeof RecommenderValues)[number]]?: number;
};
