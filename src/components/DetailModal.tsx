import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography,
  Box,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  content: string;
  style: {
    label: string;
    color: 'primary' | 'secondary' | 'success' | 'info';
  };
}

export const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onClose,
  content,
  style
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          minHeight: '60vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={style.label} 
            color={style.color}
            sx={{ fontSize: '1rem', py: 0.5 }}
          />
          <Typography variant="h6">
            详细内容
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        <Typography
          component="pre"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '1.1rem',
            lineHeight: 1.6,
          }}
        >
          {content}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}; 