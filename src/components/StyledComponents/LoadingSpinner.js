import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * A loading spinner component that displays a circular progress indicator
 * while waiting for data to load.
 *
 * @param {boolean} [isLoading=false] - Indicates whether the data is currently loading.
 * @param {React.Component} [component=null] - The component to render when the data is not loading.
 * @returns {React.Component} - The loading spinner component.
 */
const LoadingSpinner = ({ isLoading = false, component = null }) => {
  return (
    isLoading ? (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 9999,
        }}a
      >
        <CircularProgress />
      </Box>
    ) : (
      component
    )
  );
};

export default LoadingSpinner;
