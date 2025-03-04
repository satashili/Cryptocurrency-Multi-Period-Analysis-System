import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Paper, Typography, Button, Grid } from '@mui/material';
import { theme } from './theme';
import { CryptoAnalyzer } from './components/CryptoAnalyzer';

function PricingCard() {
  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 4,
          background: 'linear-gradient(45deg, #10A37F, #7F3FBF)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        选择您的订阅计划
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* 月度计划 */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)',
              }
            }}
          >
            <Typography variant="h5" gutterBottom>
              月度计划
            </Typography>
            <Typography 
              variant="h3" 
              color="primary" 
              sx={{ mb: 2 }}
            >
              $5
              <Typography component="span" variant="h6" color="text.secondary">
                /月
              </Typography>
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>✓ 实时市场分析</Typography>
              <Typography sx={{ mb: 1 }}>✓ 多周期技术指标</Typography>
              <Typography sx={{ mb: 1 }}>✓ AI智能预测</Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ 
                mt: 'auto',
                background: 'linear-gradient(45deg, #10A37F 30%, #7F3FBF 90%)',
              }}
            >
              立即订阅
            </Button>
          </Paper>
        </Grid>

        {/* 年度计划 */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              border: '2px solid',
              borderImage: 'linear-gradient(45deg, #10A37F, #7F3FBF) 1',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-8px)',
              }
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                top: 20,
                right: 20,
                bgcolor: 'primary.main',
                px: 2,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              <Typography variant="caption">省67%</Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              年度计划
            </Typography>
            <Typography 
              variant="h3" 
              color="primary" 
              sx={{ mb: 2 }}
            >
              $20
              <Typography component="span" variant="h6" color="text.secondary">
                /年
              </Typography>
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>✓ 所有月度计划功能</Typography>
              <Typography sx={{ mb: 1 }}>✓ 优先技术支持</Typography>
              <Typography sx={{ mb: 1 }}>✓ 自定义分析报告</Typography>
              <Typography sx={{ mb: 1 }}>✓ API接口访问</Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ 
                mt: 'auto',
                background: 'linear-gradient(45deg, #10A37F 30%, #7F3FBF 90%)',
              }}
            >
              立即订阅
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ py: 4 }}>
          <PricingCard />
          <CryptoAnalyzer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;