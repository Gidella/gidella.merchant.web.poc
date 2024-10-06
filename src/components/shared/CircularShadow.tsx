import React from 'react';
import { styled, Box } from '@mui/material';

const CircularLoading = () => {
  const LoadingWrapper = styled(Box)(() => ({
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '8px solid rgba(0, 0, 0, 0.1)',
    borderTop: '8px solid rgba(0, 0, 0, 0.3)',
    animation: 'spin 1s linear infinite',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',

    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  }));

  return (
    <LoadingWrapper />
  );
};

export default CircularLoading;
