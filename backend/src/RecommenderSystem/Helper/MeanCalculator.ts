export default class MeanCalculator {
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
