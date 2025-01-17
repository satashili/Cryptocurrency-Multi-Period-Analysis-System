import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Container,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { AnalysisReport } from './AnalysisReport';
import { TweetGenerator } from './TweetGenerator';
import { MarketSentiment } from './MarketSentiment';
import { useMarketData } from '../hooks/useMarketData';
import { MultiPeriodAnalysis } from './MultiPeriodAnalysis';

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(20, 20, 20, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  borderRadius: '16px',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const BackgroundGradient = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  background: 'radial-gradient(circle at top right, rgba(16, 163, 127, 0.15), transparent 70%), radial-gradient(circle at bottom left, rgba(127, 63, 191, 0.15), transparent 70%)',
});

export const CryptoAnalyzer: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('BTC');
  const { data, loading, error, fetchData } = useMarketData();

  const handleAnalyze = () => {
    fetchData(symbol);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <>
      <BackgroundGradient />
      <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
        <Fade in timeout={1000}>
          <Box>
            <GradientText 
              variant="h2"
              gutterBottom
              sx={{
                fontSize: '3.5rem',
                fontWeight: 700,
                mb: 3,
              }}
            >
              加密货币多周期分析系统
            </GradientText>
            <Typography 
              variant="h5"
              align="center" 
              color="text.secondary"
              sx={{ 
                mb: 6,
                fontSize: '1.5rem',
                opacity: 0.8,
              }}
            >
              专业的加密货币技术分析工具，支持多周期分析和AI辅助决策
            </Typography>

            <StyledPaper elevation={0}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    label="输入代币代码"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="例如：BTC、ETH、PEPE"
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '2rem' }} />,
                      sx: {
                        fontSize: '1.5rem',
                        '& .MuiInputBase-input': {
                          padding: '16px 20px',
                          height: '2rem',
                        },
                      }
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: '1.3rem',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAnalyze}
                    disabled={loading}
                    size="large"
                    sx={{
                      height: '64px',
                      fontSize: '1.3rem',
                      background: 'linear-gradient(45deg, #10A37F 30%, #7F3FBF 90%)',
                    }}
                  >
                    {loading ? <CircularProgress size={28} /> : '开始分析'}
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2,
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  '& .MuiAlert-message': {
                    fontSize: '1.2rem',
                  }
                }} 
              >
                {error}
              </Alert>
            )}

            {data && (
              <Fade in timeout={500}>
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <AnalysisReport data={data} />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <MultiPeriodAnalysis symbol={symbol} />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <MarketSentiment />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TweetGenerator analysisData={data} />
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}

            <Typography 
              variant="caption" 
              display="block" 
              align="center" 
              sx={{ 
                mt: 6, 
                color: 'text.secondary',
                opacity: 0.7,
                fontSize: '1rem',
              }}
            >
              免责声明：本分析仅供参考，不构成投资建议。加密货币市场风险较大，请谨慎决策。
            </Typography>
          </Box>
        </Fade>
      </Container>
    </>
  );
};
