import React, { useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Styled component for the main top bar container
const GlassTopBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(80, 80, 80, 0.9)', // Slightly transparent white background
  backdropFilter: 'blur(10px)', // Glass effect
  boxShadow: 'none', // No shadow
  borderRadius: '10px', // Rounded corners
  zIndex: 999,
}));

/**
 * GlassTopBar component that creates a top circular bar.
 * It accepts children elements (buttons, etc.) and arranges them based on the count:
 * - One child: centered
 * - Two children: one at each edge
 * - Three children: one at each edge and one centered
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child elements to be displayed inside the top bar.
 * @returns {JSX.Element} - The rendered top bar component.
 */
const GlassTopBar = ({ children }) => {
  const ref = useRef(null);

  const childrenArray = React.Children.toArray(children);

  return (
    <GlassTopBarContainer position="sticky" ref={ref}>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px', // Add padding to adjust spacing between children
        }}
      >
        {childrenArray.map((child, index) => (
          <Box key={index} style={{ flex: index === 1 ? '0 1 auto' : '1', textAlign: index === 1 ? 'center' : 'left' }}>
            {child}
          </Box>
        ))}
      </Toolbar>
    </GlassTopBarContainer>
  );
};

export default GlassTopBar;
