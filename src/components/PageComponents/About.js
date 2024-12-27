import { Container, Typography } from '@mui/material';
import React from 'react';
import { UPDATED, VERSION } from '../../version';
import ForumHubIcon from '../StyledComponents/ForumHubIcon';

const About = () => {
    return (
        <Container>
            <center>
                <ForumHubIcon showText={true} width={250} height={250} />
                <Typography variant="h3" gutterBottom>About This Project</Typography>
                <Typography variant="body1" paragraph>
                    This project was created by <b>Christian Graber</b> to foster a sense of community and to learn how to develop a full-stack web application.
                </Typography>
                <Typography variant="body1" paragraph>
                    The front end is built with <b>React</b> and <b>Material-UI</b>. The back end is powered by <b>Java</b> and <b>Spring Boot</b>. The database is a <b>PostgreSQL</b> instance hosted on <b>Azure</b>.
                </Typography>
                <Typography variant="body1" paragraph>
                    You can view the source code on <a href="https://github.com/grabercn/ForumHub-FrontEnd" style={{ textDecoration: 'none', color: '#1976d2' }} target="_blank" rel="noopener noreferrer">GitHub</a>.
                </Typography>

                <Typography variant="h3" gutterBottom style={{ marginTop: '32px' }}>Privacy Policy</Typography>
                <Typography variant="body1" paragraph>
                    By using this site, you agree to the terms outlined in our privacy policy.
                </Typography>
                <Typography variant="body1" paragraph>
                    For details, please visit our <a href="/privacy-policy" style={{ textDecoration: 'none', color: '#1976d2' }}>Privacy Policy</a> page.
                </Typography>

                <Typography variant="body2" style={{ marginTop: '32px', color: 'blue' }}>
                    Version: {VERSION}
                </Typography>
                <Typography variant="body2" style={{ color: 'green' }}>
                    Updated: {UPDATED}
                </Typography>
            </center>
        </Container>
    );
};

export default About;
