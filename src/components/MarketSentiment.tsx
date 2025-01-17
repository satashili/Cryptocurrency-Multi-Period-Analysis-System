import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, CircularProgress, Chip } from '@mui/material';
import { api } from '../services/api';

export const MarketSentiment: React.FC = () => {
  const [sentiment, setSentiment] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const marketSentiment = await api.getMarketSentiment();
        setSentiment(marketSentiment);
      } catch (error) {
        console.error('获取市场情绪失败:', error);
        setSentiment('无法获取市场情绪数据');
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
  }, []);

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.includes('极端乐观')) return 'success';
    if (sentiment.includes('乐观')) return 'info';
    if (sentiment.includes('中性')) return 'default';
    if (sentiment.includes('悲观')) return 'warning';
    if (sentiment.includes('极端悲观')) return 'error';
    return 'default';
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        市场情绪
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Chip
            label={sentiment}
            color={getSentimentColor(sentiment)}
            sx={{ fontSize: '1rem', py: 2 }}
          />
        )}
      </Box>
    </Paper>
  );
};
