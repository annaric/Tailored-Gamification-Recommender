export const RecommenderAndValues = {
  gender: ["male", "female"],
  player: [
    "achiever",
    "disruptor",
    "freeSpirit",
    "philanthropist",
    "player",
    "socializer",
  ],
};

export enum Recommender {
  Gender = "Gender",
  Player = "Player",
}

export enum GenderValues {
  female = "female",
  male = "male",
}

export enum PlayerValues {
  achiever = "achiever",
  disruptor = "disruptor",
  freeSpirit = "freeSpirit",
  philanthropist = "philanthropist",
  player = "player",
  socializer = "socializer",
}

export type RecommenderValues = GenderValues | PlayerValues;

export type RecommenderDependendLiteratureResults = GenderLiteratureResult &
  PlayerLiteratureResult;

export type GenderLiteratureResult = {
  female?: number;
  male?: number;
};

export type PlayerLiteratureResult = {
  achiever?: number;
  disruptor?: number;
  freeSpirit?: number;
  philanthropist?: number;
  player?: number;
  socializer?: number;
};
