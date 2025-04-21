export enum Recommender {
  gender = "gender",
  player = "player",
  personality = "personality",
  lat = "lat",
  learningStyle = "learningStyle",
}

export const GenderValues = [
  "female",
  "male"
]

export const PlayerValues = [
  "achiever",
  "disruptor",
  "freeSpirit",
  "philanthropist",
  "player",
  "socializer",
]

export const PersonalityValues = [
  "openness",
  "conscientiousness",
  "agreeableness",
  "extraversion",
  "neuroticism",
]

export const LATValues = [
  "remember",
  "understand",
  "apply",
  "analyze",
  "evaluate",
  "create",
]

export const LearningStyleValues = [
  "active",	
  "reflective",
  "visual",
  "verbal",
  "sequential",
  "global",
  "sensor",
  "intuitive",  
]

export const RecommenderValues = [...GenderValues, ...PlayerValues, ...PersonalityValues, ...LATValues, ...LearningStyleValues];

export const RecommenderAndValues = {
  gender: GenderValues,
  player: PlayerValues,
  personality: PersonalityValues,
  lat: LATValues,
  learningStyle: LearningStyleValues,
};

export type RecommenderDependendLiteratureResults = { [key in (typeof RecommenderValues)[number]]?: number }
