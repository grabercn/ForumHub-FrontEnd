import { Container } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <Container p={2}>
            <h1>About this project</h1>
            <p>This project was created by Christian Graber for the purpose of fostering a community, and learning how to create a full-stack web application. </p>
            <p>The front-end was created using React and Material-UI. The back-end was created using Java and Springboot. The database is a Postgressql database hosted on Azure.</p>
            <p>Feel free to check out the source code on <a href="https://github.com/grabercn/ForumHub-FrontEnd">GitHub</a>.</p>

            <h2>Privacy Policy</h2>
            <p> By using this site, you agree to the terms of our privacy policy. </p>
            <p>For information on our privacy policy, please visit our <a href="/privacy-policy">Privacy Policy</a>.</p>
            
        </Container>
    );
};

export default About;