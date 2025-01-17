import { useState } from 'react';
import { api } from '../services/api';
import { MarketData, IndicatorData } from '../types/types';

export const useMarketData = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (symbol: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const exists = await api.checkSymbolExists(symbol);
      if (!exists) {
        throw new Error(`${symbol}USDT 交易对在 Binance 上不存在`);
      }

      const klineData: IndicatorData[] = await api.getKlinesData(symbol, "1d");
      const latestData = klineData[klineData.length - 1];
      
      setData({
        symbol,
        currentPrice: latestData.close,
        ma20Trend: latestData.ma20Trend > 0 ? "上升" : "下降",
        supportResistance: {
          strongResistance: latestData.bollUp,
          middleLine: latestData.bollMid,
          strongSupport: latestData.bollDown
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}; 