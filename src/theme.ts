import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F0FF', // 霓虹蓝
      light: '#6AFFFF',
      dark: '#00C8D4',
      contrastText: '#FFFFFF', // 确保主要按钮文字颜色为白色
    },
    secondary: {
      main: '#FF00A0', // 霓虹粉
      light: '#FF5CC7',
      dark: '#C6007C',
      contrastText: '#FFFFFF', // 确保次要按钮文字颜色为白色
    },
    background: {
      default: '#0D0221', // 深紫黑色背景
      paper: '#150734', // 深紫色纸张背景
    },
    success: {
      main: '#39FF14', // 霓虹绿
      contrastText: '#FFFFFF', // 确保成功按钮文字颜色为白色
    },
    error: {
      main: '#FF3C5A', // 赛博红
      contrastText: '#FFFFFF', // 确保错误按钮文字颜色为白色
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: [
      'Orbitron', // 赛博朋克风格字体
      'Rajdhani',
      'SF Pro Display',
      'Roboto',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      textShadow: '0 0 10px rgba(0, 240, 255, 0.7)', // 霓虹文字效果
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 0, // 锐利的边缘
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(21, 7, 52, 0.8) 0%, rgba(13, 2, 33, 0.95) 100%)',
          backgroundColor: 'transparent',
          borderRadius: 0,
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(255, 0, 160, 0.1)',
          backdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.7), transparent)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          padding: '10px 20px',
          borderRadius: 0,
          fontSize: '0.9rem',
          letterSpacing: '0.1em',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF', // 统一按钮文字颜色为白色
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10%',
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.7), transparent)',
          },
        },
        contained: {
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
          color: '#FFFFFF', // 确保实心按钮文字颜色为白色
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)',
          },
        },
        outlined: {
          color: '#FFFFFF', // 确保边框按钮文字颜色为白色
          borderColor: 'rgba(0, 240, 255, 0.5)',
          '&:hover': {
            borderColor: 'rgba(0, 240, 255, 0.8)',
            backgroundColor: 'rgba(0, 240, 255, 0.08)',
          },
        },
        text: {
          color: '#FFFFFF', // 确保文本按钮文字颜色为白色
          '&:hover': {
            backgroundColor: 'rgba(0, 240, 255, 0.08)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // 确保图标按钮颜色为白色
          '&:hover': {
            backgroundColor: 'rgba(0, 240, 255, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            backgroundColor: 'rgba(21, 7, 52, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(21, 7, 52, 0.9)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(21, 7, 52, 0.9)',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
            },
            '& fieldset': {
              borderColor: 'rgba(0, 240, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 240, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(0, 240, 255, 0.7)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: 32,
          background: 'rgba(21, 7, 52, 0.8)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#FFFFFF', // 确保Chip文字颜色为白色
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 160, 0.1) 0%, rgba(0, 0, 0, 0) 70%), linear-gradient(to bottom, #0D0221, #080116)',
          scrollbarColor: '#00F0FF transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(13, 2, 33, 0.9)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 240, 255, 0.5)',
            borderRadius: 0,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // 确保菜单项文字颜色为白色
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#FFFFFF', // 确保下拉图标颜色为白色
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);