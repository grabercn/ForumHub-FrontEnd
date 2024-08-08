// ResponsiveGrid.js

import React from 'react';
import Grid from '@mui/material/Grid';
import { useTheme, useMediaQuery, Slide } from '@mui/material';

/**
 * ResponsiveGrid Component
 * 
 * A responsive grid component that automatically organizes its children,
 * applies a slide-up animation to each item, and offers an option to display
 * items like the MUI Stack component.
 * 
 * @param {string} variant - The layout orientation of the grid. 
 *                           Options: 'row', 'column', 'stack'.
 *                           Default: 'row'.
 * @param {React.ReactNode} children - The grid items to be displayed and animated.
 * @param {object} props - Additional props to pass to the MUI Grid container.
 * 
 * @returns {JSX.Element} The responsive grid with animated children.
 */
const ResponsiveGrid = ({ variant = 'row', children, ...props }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const isStack = variant === 'stack';

  return (
    <Grid
      container
      direction={isStack ? 'row' : variant === 'column' ? 'column' : 'row'}
      spacing={isStack ? 2 : 2} // Even spacing in stack mode
      justifyContent={isStack ? 'space-between' : undefined}
      alignItems={isStack ? 'center' : undefined}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <Grid
          item
          xs={isSmallScreen ? 12 : isStack ? undefined : 6} // Full width on small screens, half width or natural size on larger screens
          sm={isStack ? 'auto' : 6}
          md={isStack ? 'auto' : 4}
          lg={isStack ? 'auto' : 3}
        >
          <Slide
            direction="up"
            in={true}
            timeout={{
              enter: index * 300 + 300, // Staggered animation delay for each child
            }}
            mountOnEnter
            unmountOnExit
          >
            <div>{child}</div>
          </Slide>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResponsiveGrid;
