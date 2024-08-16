
import React from 'react';
import { Grid, Paper, Switch, Typography } from '@mui/material';
import AnimationTag from '../StyledComponents/AnimationTag';

/**
 * Renders the home settings component.
 * @returns {JSX.Element} The rendered home settings component.
 */
function HomeSettings() {
    return(
        
    <AnimationTag variant="slide-up">
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '1rem' }}>
                    <Typography variant="h4" align="center">Home Settings</Typography>
                    <Typography variant="body1" align="center">Customize your home page settings</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '1rem' }}>
                    <Typography variant="h5">General Settings</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1">Dark Mode</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <Switch />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '1rem' }}>
                    <Typography variant="h5">Forum Settings</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1">Show Forum Descriptions</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <Switch />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            
        </Grid>
    </AnimationTag>
    );
}

export default HomeSettings;