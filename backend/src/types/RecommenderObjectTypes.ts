export enum Recommender {
  Gender = "Gender",
}

export enum GenderValues {
  female = "female",
  male = "male",
}

export enum PlayerValues {
  achiever = "achiever",
  disruptor = "disruptor",
  freeSpirit = "freeSpirit",
  philantropist = "philantropist",
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
  philantropist?: number;
  player?: number;
  socializer?: number;
};
