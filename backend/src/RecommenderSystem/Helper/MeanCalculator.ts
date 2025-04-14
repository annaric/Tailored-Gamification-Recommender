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
}
