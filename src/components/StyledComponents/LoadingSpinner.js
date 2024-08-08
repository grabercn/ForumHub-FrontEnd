import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

/**
 * Custom styled CircularProgress component.
 */
const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: "skyblue", // Customize color
  animationDuration: '1.5s', // Customize animation duration
  '@keyframes mui-progress-circular-dash': {
    '0%': {
      strokeDasharray: '1, 200',
      strokeDashoffset: '0',
    },
    '50%': {
      strokeDasharray: '100, 200',
      strokeDashoffset: '-15',
    },
    '100%': {
      strokeDasharray: '100, 200',
      strokeDashoffset: '-120',
    },
  },
}));

/**
 * A loading spinner component that displays a circular progress indicator
 * with custom styling and multiple nested spinners while waiting for data to load.
 * A modern white circle with a raised and shadowed effect is displayed behind the spinner.
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
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* White Circle with raised and shadowed effect */}
          <Box
            sx={{
              position: 'absolute',
              width: 120, // Set the size of the white circle
              height: 120, // Set the size of the white circle
              borderRadius: '50%',
              backgroundColor: 'white', // White circle color
              zIndex: 0, // Positioned behind the spinner
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
              transform: 'translateY(-10px)', // Slightly raised effect
            }}
          />
          <CustomCircularProgress size={80} thickness={2.5} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CircularProgress size={60} thickness={4} color="primary" sx={{ position: 'absolute', zIndex: 4 }} />
            <CircularProgress size={40} thickness={4} color="primary" sx={{ position: 'absolute', zIndex: 4 }} />
            <CircularProgress size={20} thickness={4} color="primary" sx={{ position: 'absolute', zIndex: 3 }} />
            <CircularProgress size={10} thickness={4} color="primary" sx={{ position: 'absolute', zIndex: 2 }} />
            <CircularProgress size={5} thickness={4} color="primary" sx={{ position: 'absolute', zIndex: 1 }} />
            <CircularProgress size={2} thickness={4} color="primary" sx={{ position: 'absolute', zIndex: 0 }} />
          </Box>
        </Box>
      </Box>
    ) : (
      component
    )
  );
};

export default LoadingSpinner;
