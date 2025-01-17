export class TechnicalAnalysis {
  static calculateMA(prices: number[], period: number): number[] {
    const ma: number[] = [];
    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        ma.push(0);
        continue;
      }
      
      const sum = prices.slice(i - period + 1, i + 1)
        .reduce((acc, price) => acc + price, 0);
      ma.push(sum / period);
    }
    return ma;
  }

  static calculateBollingerBands(prices: number[], period: number = 20, multiplier: number = 2): {
    middle: number[];
    upper: number[];
    lower: number[];
  } {
    const middle = this.calculateMA(prices, period);
    const upper: number[] = [];
    const lower: number[] = [];

    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        upper.push(0);
        lower.push(0);
        continue;
      }

      const slice = prices.slice(i - period + 1, i + 1);
      const std = this.calculateStandardDeviation(slice);
      upper.push(middle[i] + (multiplier * std));
      lower.push(middle[i] - (multiplier * std));
    }

    return { middle, upper, lower };
  }

  private static calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(val => Math.pow(val - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquareDiff);
  }
} 