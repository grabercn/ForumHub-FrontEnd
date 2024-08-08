
import React from 'react';
import { Typography } from '@mui/material';
import AnimationTag from '../StyledComponents/AnimationTag';

/**
 * Renders the home settings component.
 * @returns {JSX.Element} The rendered home settings component.
 */
function HomeSettings() {
    return(
    <AnimationTag variant="fade">
        <Typography variant="h6" align="center">View and appearance settings will be here.</Typography>
    </AnimationTag>
    );
}

export default HomeSettings;