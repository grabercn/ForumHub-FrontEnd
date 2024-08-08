// AnimationTag.js

import React from 'react';
import { Grow, Fade, Slide, Zoom } from '@mui/material';

/**
 * AnimationTag Component
 * 
 * This component renders its children with a specified animation effect 
 * using Material-UI's transition components.
 * 
 * @param {React.ReactNode} children - The elements to be animated.
 * @param {string} variant - The type of animation to apply. 
 *                           Options: 'grow', 'fade', 'slide', 'zoom'.
 *                           Default: 'grow'.
 * @param {string} direction - The direction of the animation when using the 'slide' variant.
 *                             Options: 'up', 'down', 'left', 'right'.
 *                             Default: 'up'.
 * @param {number} timeout - The duration of the animation in milliseconds.
 *                           Default: 500.
 * @param {object} props - Additional props to pass to the animation component.
 * 
 * @returns {JSX.Element} The animated component wrapped around the children.
 */
const AnimationTag = ({ children, variant = 'grow', direction = 'up', timeout = 500, ...props }) => {
  // Map variant names to corresponding MUI components
  const animationMap = {
    grow: Grow,
    fade: Fade,
    slide: Slide,
    zoom: Zoom,
  };

  // Select the appropriate animation component or default to Grow
  const AnimationComponent = animationMap[variant] || Grow;

  return (
    <AnimationComponent 
      in={true} 
      direction={direction} 
      timeout={timeout} 
      mountOnEnter 
      unmountOnExit 
      {...props}
    >
      <div>{children}</div>
    </AnimationComponent>
  );
};

export default AnimationTag;
