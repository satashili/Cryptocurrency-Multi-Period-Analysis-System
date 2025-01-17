import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { styled } from '@mui/material/styles';
import { TIMEFRAMES } from '../types/types';
import { api } from '../services/api';

// 添加 Markdown 样式
const StyledMarkdown = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& h1, & h2, & h3, & h4': {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  '& h1': {
    fontSize: '2rem',
  },
  '& h2': {
    fontSize: '1.75rem',
  },
  '& h3': {
    fontSize: '1.5rem',
  },
  '& h4': {
    fontSize: '1.25rem',
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
    color: theme.palette.text.primary,
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '& li': {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  '& strong': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  '& code': {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '2px 4px',
    borderRadius: 4,
    fontSize: '0.9em',
    color: theme.palette.text.primary,
  },
  '& blockquote': {
    borderLeft: `4px solid rgba(255, 255, 255, 0.2)`,
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
    background: 'rgba(255, 255, 255, 0.05)',
    color: theme.palette.text.primary,
  },
  '& *': {
    color: theme.palette.text.primary,
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface MultiPeriodAnalysisProps {
  symbol: string;
  onAnalysisComplete?: (analysis: string) => void;
}

export const MultiPeriodAnalysis: React.FC<MultiPeriodAnalysisProps> = ({ 
  symbol,
  onAnalysisComplete 
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const timeframes = Object.values(TIMEFRAMES);

  const handleTabChange = async (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    await fetchAnalysis(timeframes[newValue].interval);
  };

  const fetchAnalysis = async (interval: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getKlinesData(symbol, interval);
      const aiAnalysis = await api.generateAIAnalysis(symbol, data);
      setAnalysis(aiAnalysis);
      if (onAnalysisComplete) {
        onAnalysisComplete(aiAnalysis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析生成失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          多周期分析
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            fontSize: '1.1rem',
            opacity: 0.8,
            mb: 2,
          }}
        >
          选择不同的时间周期查看详细分析报告。短周期适合日内交易，长周期适合趋势把握。
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '1.1rem' }}>•</Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>5分钟/15分钟：</Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>适合短线交易</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '1.1rem' }}>•</Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>1小时/4小时：</Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>适合日内波段</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '1.1rem' }}>•</Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>日线：</Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>适合中长期趋势</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        mb: 3,
      }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              minWidth: 100,
              px: 3,
            }
          }}
        >
          {timeframes.map((tf, index) => (
            <Tab 
              key={index} 
              label={tf.name}
              sx={{
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600,
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && analysis && (
        <TabPanel value={selectedTab} index={selectedTab}>
          <StyledMarkdown>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {analysis}
            </ReactMarkdown>
          </StyledMarkdown>
        </TabPanel>
      )}
    </Paper>
  );
}; 