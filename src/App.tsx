import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Paper, Typography, Grid, Link } from '@mui/material';
import { theme } from './theme';
import { CryptoAnalyzer } from './components/CryptoAnalyzer';

function ProjectIntroduction() {
  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(0, 240, 255, 0), rgba(0, 240, 255, 0.8), rgba(0, 240, 255, 0))',
          }
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 3,
            background: 'linear-gradient(45deg, #00F0FF, #FF00A0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            animation: 'textGlow 2s infinite alternate',
            '@keyframes textGlow': {
              '0%': {
                textShadow: '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)'
              },
              '100%': {
                textShadow: '0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)'
              }
            }
          }}
        >
          Hi，介绍一下我的项目
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.85)' }}>
          这是一个基于 React 和 AI 的加密货币分析工具，请点按最下方'开始分析'按钮进入分析。
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            mt: 4, 
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-5px',
              left: '30%',
              width: '40%',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(255, 0, 160, 0), rgba(255, 0, 160, 0.8), rgba(255, 0, 160, 0))',
            }
          }}
        >
          主要功能
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column' 
              }}>
                <Typography sx={{ 
                  fontSize: '1.8rem', 
                  mb: 1,
                  filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.7))'
                }}>
                  🚀
                </Typography>
                <Typography sx={{ 
                  fontWeight: 500, 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  多周期分析
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column' 
              }}>
                <Typography sx={{ 
                  fontSize: '1.8rem', 
                  mb: 1,
                  filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.7))'
                }}>
                  🤖
                </Typography>
                <Typography sx={{ 
                  fontWeight: 500, 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  AI 驱动分析
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column' 
              }}>
                <Typography sx={{ 
                  fontSize: '1.8rem', 
                  mb: 1,
                  filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.7))'
                }}>
                  💡
                </Typography>
                <Typography sx={{ 
                  fontWeight: 500, 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  智能推文生成
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column' 
              }}>
                <Typography sx={{ 
                  fontSize: '1.8rem', 
                  mb: 1,
                  filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.7))'
                }}>
                  📊
                </Typography>
                <Typography sx={{ 
                  fontWeight: 500, 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  技术指标分析
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth={false} 
        sx={{ 
          bgcolor: 'background.default', 
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGYwZmYxNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==)',
            opacity: 0.05,
            zIndex: 0,
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ 
          py: 4, 
          position: 'relative',
          zIndex: 1 
        }}>
          <ProjectIntroduction />
          <CryptoAnalyzer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;