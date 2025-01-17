import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import { theme } from './theme';
import { CryptoAnalyzer } from './components/CryptoAnalyzer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ py: 4 }}>
          <CryptoAnalyzer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;