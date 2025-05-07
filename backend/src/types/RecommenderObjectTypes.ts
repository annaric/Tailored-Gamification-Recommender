export enum Recommender {
  gender = "gender",
  player = "player",
  personality = "personality",
  learningActivityTask = "learningActivityTask",
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

export const LearningActivityTaskValues = [
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

export const LearningStyleValuesInformationProcessing = [
  "active",
  "reflective",
];

export const LearningStyleValuesIntuitivity = [
  "sensor",
  "intuitive",
];

export const LearningStyleValuesPerception = [
  "visual",
  "verbal",
];

export const LearningStyleValuesUnderstanding = [
  "sequential",
  "global",
];

export enum LearningStyleKeys {
  learningStyleOfProcessingInformation = "learningStyleOfProcessingInformation",
  learningStyleOfIntuitivity = "learningStyleOfIntuitivity",
  learningStyleOfPerception = "learningStyleOfPerception",
  learningStyleOfUnderstanding = "learningStyleOfUnderstanding",
}

export const RecommenderValues = [
  ...GenderValues,
  ...PlayerValues,
  ...PersonalityValues,
  ...LearningActivityTaskValues,
  ...LearningStyleValues,
  ...AgeValues,
];

export const RecommenderAndValues = {
  player: PlayerValues,
  personality: PersonalityValues,
  age: AgeValues,
  gender: GenderValues,
  learningActivityTask: LearningActivityTaskValues,
  learningStyleOfProcessingInformation: LearningStyleValuesInformationProcessing,
  learningStyleOfIntuitivity: LearningStyleValuesIntuitivity,
  learningStyleOfPerception: LearningStyleValuesPerception,
  learningStyleOfUnderstanding: LearningStyleValuesUnderstanding,
};

export type RecommenderDependendLiteratureResults = {
  [key in (typeof RecommenderValues)[number]]?: number;
};
