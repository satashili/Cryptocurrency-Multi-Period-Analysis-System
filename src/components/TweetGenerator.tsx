import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Chip
} from '@mui/material';
import { MarketData } from '../types/types';
import { api } from '../services/api';
import { DetailModal } from './DetailModal';

interface TweetGeneratorProps {
  analysisData: MarketData;
}

interface TweetStyle {
  key: '女生' | '交易员' | '分析师' | '媒体';
  label: string;
  color: 'primary' | 'secondary' | 'success' | 'info';
}

const TWEET_STYLES: TweetStyle[] = [
  { key: '女生', label: '萌妹风格', color: 'primary' },
  { key: '交易员', label: '交易员', color: 'secondary' },
  { key: '分析师', label: '分析师', color: 'success' },
  { key: '媒体', label: '媒体风格', color: 'info' }
];

export const TweetGenerator: React.FC<TweetGeneratorProps> = ({ analysisData }) => {
  const [tweets, setTweets] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<{
    content: string;
    style: TweetStyle;
  } | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    
    try {
      const tweetPromises = TWEET_STYLES.map(style => 
        api.generateTweet(
          analysisData.symbol,
          JSON.stringify(analysisData),
          style.key
        )
      );

      const generatedTweets = await Promise.all(tweetPromises);
      
      const newTweets = TWEET_STYLES.reduce((acc, style, index) => ({
        ...acc,
        [style.key]: generatedTweets[index]
      }), {});

      setTweets(newTweets);
    } catch (err) {
      setError('生成推文失败，请重试');
      console.error('推文生成错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          推文生成器
        </Typography>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading}
          sx={{
            background: 'linear-gradient(45deg, #10A37F 30%, #7F3FBF 90%)',
            color: 'white',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : '一键生成所有风格'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {TWEET_STYLES.map((style, index) => (
          <Grid item xs={12} md={6} key={style.key}>
            <Box sx={{ mb: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Chip 
                  label={style.label} 
                  color={style.color}
                  onClick={() => setSelectedStyle({
                    content: tweets[style.key] || '',
                    style: style
                  })}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    }
                  }}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={8}
                value={tweets[style.key] || ''}
                placeholder={loading ? '生成中...' : '点击上方按钮生成推文'}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      padding: '16px',
                    },
                    minHeight: '200px',
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                  }
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <DetailModal
        open={Boolean(selectedStyle)}
        onClose={() => setSelectedStyle(null)}
        content={selectedStyle?.content || ''}
        style={{
          label: selectedStyle?.style.label || '',
          color: selectedStyle?.style.color || 'primary'
        }}
      />
    </Paper>
  );
};
