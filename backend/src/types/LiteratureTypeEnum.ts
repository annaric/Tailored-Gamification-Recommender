/**
 * Enum representing the different types of results that can be provided by literature papers.
 * Each type defines how the results are normalized by the DataNormalizer.
 */
export enum LiteratureResultTypeEnum {
  /**
   * Represents papers that provide only positive numerical results.
   * The values are within the range [0, maxValue].
   * Example: Review papers that report the number of other papers recommending a specific element.
   */
  PositiveNumber = "PositiveNumber",
  /**
   * Represents papers that provide coefficient-based results.
   * The values are within the range [-1, 1].
   * Example: Papers reporting correlation coefficients.
   */
  Coefficient = "Coefficient",
  /**
   * Represents papers that provide binary results.
   * Example: textual recommendations of gamification elements without providing any numerical weight.
   */
  Binary = "Binary",
  /**
   * Represents papers that provide results based on a scale.
   * Example: User ratings on a scale from "dislike" to "like very much."
   */
  Scale = "Scale",
}
