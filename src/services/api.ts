import axios from 'axios';
import { KlineData, IndicatorData } from '../types/types';

const BINANCE_API_URL = process.env.REACT_APP_BINANCE_API_URL;
const OPENAI_API_URL = process.env.REACT_APP_OPENAI_API_URL;
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

if (!BINANCE_API_URL || !OPENAI_API_URL || !OPENAI_API_KEY) {
  throw new Error('必要的环境变量未设置');
}

export const api = {
  async checkSymbolExists(symbol: string): Promise<boolean> {
    try {
      const response = await axios.get(`${BINANCE_API_URL}/exchangeInfo`);
      const symbols = response.data.symbols.map((s: any) => s.symbol);
      return symbols.includes(`${symbol}USDT`);
    } catch (error) {
      console.error('检查交易对错误:', error);
      return false;
    }
  },

  async getKlinesData(symbol: string, interval: string): Promise<IndicatorData[]> {
    try {
      const response = await axios.get(`${BINANCE_API_URL}/klines`, {
        params: {
          symbol: `${symbol}USDT`,
          interval,
          limit: 200
        }
      });

      const klines = response.data.map((k: any[]) => ({
        timestamp: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5]),
        closeTime: k[6],
        quoteVolume: parseFloat(k[7]),
        trades: parseInt(k[8])
      }));

      return this.calculateIndicators(klines);
    } catch (error) {
      console.error('获取K线数据错误:', error);
      throw error;
    }
  },

  calculateIndicators(klines: KlineData[]): IndicatorData[] {
    return klines.map((kline, index, array) => {
      // 计算MA20
      const ma20 = index >= 19 ? 
        array.slice(index - 19, index + 1)
          .reduce((sum, k) => sum + k.close, 0) / 20 : 0;

      // 计算布林带
      const bollPeriod = 20;
      let bollMid = ma20;
      let bollUp = 0;
      let bollDown = 0;

      if (index >= bollPeriod - 1) {
        const prices = array.slice(index - bollPeriod + 1, index + 1)
          .map(k => k.close);
        const std = this.calculateStandardDeviation(prices);
        bollUp = bollMid + (2 * std);
        bollDown = bollMid - (2 * std);
      }

      // 计算MA20趋势
      const ma20Trend = index >= 24 ? 
        (ma20 - array[index - 5].close) / 5 : 0;

      return {
        ...kline,
        ma20,
        bollMid,
        bollUp,
        bollDown,
        ma20Trend
      };
    });
  },

  calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(val => Math.pow(val - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquareDiff);
  },

  async generateAIAnalysis(symbol: string, timeframeData: any): Promise<string> {
    try {
      const response = await axios.post(
        `${OPENAI_API_URL}/chat/completions`,
        {
          model: "deepseek-chat",
          messages: [{
            role: "user",
            content: `请分析${symbol}的多周期数据并提供专业的市场报告：${JSON.stringify(timeframeData)}`
          }],
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI分析生成错误:', error);
      throw error;
    }
  },

  async generateTweet(symbol: string, analysis: string, style: string): Promise<string> {
    try {
      const response = await axios.post(
        `${OPENAI_API_URL}/chat/completions`,
        {
          model: "deepseek-chat",
          messages: [{
            role: "user",
            content: `以${style}风格为${symbol}生成一条推文分析：${analysis}`
          }],
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('推文生成错误:', error);
      throw error;
    }
  },

  async getMarketSentiment(): Promise<string> {
    try {
      const response = await axios.get(`${BINANCE_API_URL}/ticker/24hr`);
      const data = response.data;
      const usdtPairs = data.filter((item: any) => item.symbol.endsWith('USDT'));
      const totalPairs = usdtPairs.length;
      
      if (totalPairs === 0) {
        return "无法获取USDT交易对数据";
      }

      const upPairs = usdtPairs.filter(
        (item: any) => parseFloat(item.priceChangePercent) > 0
      );
      const upPercentage = (upPairs.length / totalPairs) * 100;

      let sentiment = "";
      if (upPercentage >= 80) sentiment = "极端乐观";
      else if (upPercentage >= 60) sentiment = "乐观";
      else if (upPercentage >= 40) sentiment = "中性";
      else if (upPercentage >= 20) sentiment = "悲观";
      else sentiment = "极端悲观";

      return `市场情绪：${sentiment}（上涨交易对占比 ${upPercentage.toFixed(2)}%）`;
    } catch (error) {
      console.error('获取市场情绪错误:', error);
      throw new Error('获取市场情绪失败');
    }
  }
}; 