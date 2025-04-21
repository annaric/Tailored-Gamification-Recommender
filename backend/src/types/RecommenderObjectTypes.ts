export enum Recommender {
  gender = "gender",
  player = "player",
  personality = "personality"
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

export const RecommenderValues = [...GenderValues, ...PlayerValues, ...PersonalityValues];

export const RecommenderAndValues = {
  gender: GenderValues,
  player: PlayerValues,
  personality: PersonalityValues
};

export type RecommenderDependendLiteratureResults = { [key in (typeof RecommenderValues)[number]]?: number }
