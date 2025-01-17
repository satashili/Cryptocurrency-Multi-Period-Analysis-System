export interface MarketData {
  symbol: string;
  currentPrice: number;
  ma20Trend: string;
  supportResistance: {
    strongResistance: number;
    middleLine: number;
    strongSupport: number;
  };
}

export interface KlineData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: string;
  quoteVolume: number;
  trades: number;
}

export interface IndicatorData extends KlineData {
  ma20: number;
  bollMid: number;
  bollUp: number;
  bollDown: number;
  ma20Trend: number;
}

export interface TimeFrame {
  interval: string;
  name: string;
}

export const TIMEFRAMES: Record<string, TimeFrame> = {
  "5m": { interval: "5m", name: "5分钟" },
  "15m": { interval: "15m", name: "15分钟" },
  "1h": { interval: "1h", name: "1小时" },
  "4h": { interval: "4h", name: "4小时" },
  "1d": { interval: "1d", name: "日线" }
}; 