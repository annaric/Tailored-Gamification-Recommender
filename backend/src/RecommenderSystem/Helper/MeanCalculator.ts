export default class MeanCalculator {
  /**
   * Calculates the mean and standard deviation of a given dataset.
   * @param data - An array of numbers for which the mean and standard deviation are to be calculated.
   * @returns An object containing the mean (`score`) and standard deviation (`standardDeviation`).
   * @throws An error if the input array is empty.
   */
  calculateMeanAndStdDev(data: number[]): {
    score: number;
    standardDeviation: number;
  } {
    if (data.length === 0) {
      throw new Error(
        "Data array is empty. Cannot calculate mean and standard deviation.",
      );
    }

    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const stdDev = Math.sqrt(
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
        data.length,
    );

    return { score: mean, standardDeviation: stdDev };
  }

  /**
   * Calculates the weighted mean and weighted standard deviation of a given dataset.
   * If weights are not provided or are empty, it falls back to unweighted calculations.
   * @param data - An array of numbers for which the weighted mean and standard deviation are to be calculated.
   * @param weights - An array of weights corresponding to the data points.
   * @returns An object containing the weighted mean (`score`), weighted standard deviation (`standardDeviation`), and the sum of weights (`sumOfWeights`).
   * @throws An error if the input data array is empty.
   */
  calculateWeightedMeanAndStdDev(
    data: number[],
    weights: number[],
  ): {
    score: number;
    standardDeviation: number;
    sumOfWeights: number;
  } {
    if (data.length === 0) {
      throw new Error(
        "Data array is empty. Cannot calculate mean and standard deviation.",
      );
    }
    let mean = 0;
    let stdDev = 0;
    const sumOfWeights = weights.reduce((sum, weight) => sum + weight, 0);

    if (!(weights.length === 0)) {
      mean =
        data.reduce((sum, value, index) => sum + value * weights[index], 0) /
        sumOfWeights;
      const weightedVariance =
        data.reduce(
          (sum, value, index) =>
            sum + weights[index] * Math.pow(value - mean, 2),
          0,
        ) / sumOfWeights;
      stdDev = Math.sqrt(weightedVariance);
    } else {
      // Fallback to unweighted calculations if weights are not provided or empty
      mean = data.reduce((sum, value) => sum + value, 0) / data.length;
      stdDev = Math.sqrt(
        data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
          data.length,
      );
    }

    return {
      score: mean,
      standardDeviation: stdDev,
      sumOfWeights: sumOfWeights,
    };
  }
}
