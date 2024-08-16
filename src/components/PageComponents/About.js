import { Container, Typography } from '@mui/material';
import React from 'react';
import { UPDATED, VERSION } from '../../version';
import ForumHubIcon from '../StyledComponents/ForumHubIcon';

const About = () => {
    return (
        <Container p={2}>
            <center>
            <ForumHubIcon showText={true} width={250} height={250}/>
            <Typography variant='h3'>About this project</Typography>
            <br />
            <Typography variant='p'>This project was created by Christian Graber for the purpose of fostering a community, and learning how to create a full-stack web application. </Typography>
            <Typography variant='p'>The front-end was created using React and Material-UI. The back-end was created using Java and Springboot. The database is a Postgressql database hosted on Azure.</Typography>
            <Typography variant='p'>Feel free to check out the source code on <a href="https://github.com/grabercn/ForumHub-FrontEnd">GitHub</a>.</Typography>
            <br /> <br />
            <Typography variant='h3'>Privacy Policy</Typography>
            <br />
            <Typography variant='p'> By using this site, you agree to the terms of our privacy policy. </Typography>
            <Typography variant='p'>For information on our privacy policy, please visit our <a href="/privacy-policy">Privacy Policy</a>.</Typography>
            <br /> <br />
            <Typography variant='p' style={{color: "blue"}}>Version: {VERSION}</Typography> <Typography variant='p' style={{color: "green"}}>Updated: {UPDATED}</Typography>
            </center>
        </Container>
    );
};

export default About;