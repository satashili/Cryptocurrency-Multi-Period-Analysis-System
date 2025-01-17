import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { MarketData } from '../types/types';

interface AnalysisReportProps {
  data: MarketData;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ data }) => {
  const formatPrice = (price: number) => {
    return price < 0.1 ? price.toFixed(8) : price.toFixed(2);
  };

  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        市场分析报告
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              当前价格
            </Typography>
            <Typography variant="h4" color="primary">
              ${formatPrice(data.currentPrice)}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              MA20趋势
            </Typography>
            <Typography 
              variant="h6" 
              color={data.ma20Trend === "上升" ? "success.main" : "error.main"}
            >
              {data.ma20Trend}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            关键价位
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">
                强阻力位
              </Typography>
              <Typography variant="body1">
                ${formatPrice(data.supportResistance.strongResistance)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">
                中轴线
              </Typography>
              <Typography variant="body1">
                ${formatPrice(data.supportResistance.middleLine)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">
                强支撑位
              </Typography>
              <Typography variant="body1">
                ${formatPrice(data.supportResistance.strongSupport)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
