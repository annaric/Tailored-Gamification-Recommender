/**
 * Represents the mapping of recommenders to their possible values.
 * Each key corresponds to a recommender, and the value is an array of possible options for that recommender.
 */
export const RecommenderAndValuesObject = {
  /**
   * Gender-based recommender with possible values "female" and "male".
   */
  gender: ["female", "male"],
  /**
   * Age-based recommender with possible age ranges.
   */
  age: ["<20", "20-29", "30-39", ">39"],
  /**
   * Player type recommender with possible player archetypes based on Marczewski's HEXAD model.
   */
  player: [
    "achiever",
    "disruptor",
    "freeSpirit",
    "philanthropist",
    "player",
    "socializer",
  ],
  /**
   * Personality-based recommender with the Big Five personality traits.
   */
  personality: [
    "openness",
    "conscientiousness",
    "agreeableness",
    "extraversion",
    "neuroticism",
  ],
  /**
   * Learning activity task recommender with Bloom's taxonomy levels.
   */
  learningActivityTask: [
    "remember",
    "understand",
    "apply",
    "analyze",
    "evaluate",
    "create",
  ],
  /**
   * Learning style recommender for processing information based on Felder and Silverman's model.
   */
  learningStyleOfProcessingInformation: ["active", "reflective"],
  /**
   * Learning style recommender for intuitivity based on Felder and Silverman's model.
   */
  learningStyleOfIntuitivity: ["sensor", "intuitive"],
  /**
   * Learning style recommender for perception based on Felder and Silverman's model.
   */
  learningStyleOfPerception: ["visual", "verbal"],
  /**
   * Learning style recommender for understanding based on Felder and Silverman's model.
   */
  learningStyleOfUnderstanding: ["sequential", "global"],
  general: ["general"],
};

/**
 * Represents a flat array of all possible recommender values.
 * Combines all values from `RecommenderAndValuesObject` into a single array.
 */
export const RecommenderValues = Object.values(
  RecommenderAndValuesObject,
).flat();

/**
 * Represents the structure of recommender-dependent literature results.
 * Maps each possible recommender value to a numerical result.
 */
export type RecommenderDependendLiteratureResults = {
  [key in (typeof RecommenderValues)[number]]?: number;
};
