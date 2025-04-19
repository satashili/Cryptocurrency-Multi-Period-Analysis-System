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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { styled, keyframes } from '@mui/material/styles';
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
  textShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -5,
    left: '25%',
    width: '50%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.7), transparent)',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(21, 7, 52, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 240, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 0,
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(0, 240, 255, 0.03) 0%, rgba(255, 0, 160, 0.03) 100%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.7), transparent)',
  }
}));

const BackgroundGradient = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  background: 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.1), transparent 70%), radial-gradient(circle at bottom left, rgba(255, 0, 160, 0.1), transparent 70%)',
});

const GlitchEffect = keyframes`
  0% {
    clip-path: inset(80% 0 0 0);
    transform: translate(-2px, 2px);
  }
  20% {
    clip-path: inset(10% 0 60% 0);
    transform: translate(2px, -2px);
  }
  40% {
    clip-path: inset(40% 0 30% 0);
    transform: translate(1px, 1px);
  }
  60% {
    clip-path: inset(20% 0 70% 0);
    transform: translate(-1px, -1px);
  }
  80% {
    clip-path: inset(50% 0 20% 0);
    transform: translate(2px, 2px);
  }
  100% {
    clip-path: inset(70% 0 10% 0);
    transform: translate(-2px, -2px);
  }
`;

const GlitchText = styled(Typography)`
  position: relative;
  display: inline-block;
  
  &::before, &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  
  &::before {
    left: 2px;
    text-shadow: -1px 0 #00F0FF;
    animation: ${GlitchEffect} 2s infinite linear alternate-reverse;
  }
  
  &::after {
    left: -2px;
    text-shadow: 1px 0 #FF00A0;
    animation: ${GlitchEffect} 3s infinite linear alternate-reverse;
  }
`;

const NeonButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 0,
  fontFamily: 'Orbitron, sans-serif',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  border: '1px solid rgba(0, 240, 255, 0.3)',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(45deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 0, 160, 0.1) 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: 50,
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transform: 'skewX(-20deg)',
    transition: 'all 0.75s ease',
  },
  '&:hover': {
    boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
    '&::before': {
      left: '200%',
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: '80%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.7), transparent)',
  }
}));

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
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
              data-text="加密货币多周期分析系统"
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
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.03em',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: -15,
                  left: '35%',
                  width: '30%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 0, 160, 0.5), transparent)',
                }
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
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'primary.main', fontSize: '2rem' }} />,
                      sx: {
                        fontSize: '1.5rem',
                        '& .MuiInputBase-input': {
                          padding: '16px 20px',
                          height: '2rem',
                          fontFamily: 'Rajdhani, sans-serif',
                        },
                      }
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: '1.3rem',
                        fontFamily: 'Rajdhani, sans-serif',
                        letterSpacing: '0.05em',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <NeonButton
                    fullWidth
                    variant="contained"
                    onClick={handleAnalyze}
                    disabled={loading}
                    size="large"
                    endIcon={loading ? undefined : <TrendingUpIcon />}
                    sx={{
                      height: '64px',
                      fontSize: '1.3rem',
                    }}
                  >
                    {loading ? <CircularProgress size={28} color="primary" /> : '开始分析'}
                  </NeonButton>
                </Grid>
              </Grid>
            </StyledPaper>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2,
                  backgroundColor: 'rgba(255, 60, 90, 0.1)',
                  border: '1px solid rgba(255, 60, 90, 0.3)',
                  borderRadius: 0,
                  '& .MuiAlert-message': {
                    fontSize: '1.2rem',
                    fontFamily: 'Rajdhani, sans-serif',
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
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.03em',
                position: 'relative',
                padding: '10px',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '30%',
                  width: '40%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)',
                }
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
