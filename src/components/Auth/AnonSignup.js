import { Container, Grid, TextField, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createUser, CheckUniqueUser } from '../ApiCalls/userApiCalls';
import Turnstile from 'react-turnstile';
import axios from 'axios';
import { faker } from '@faker-js/faker';
const { isEmail, isStrongPassword, isMobilePhone } = require('validator');

const AnonSignup = () => {
    const [generatedUsername, setGeneratedUsername] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [generatedPhoneNumber, setGeneratedPhoneNumber] = useState('');
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    // Error states for form validation
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const generateRandomUsername = () => {
        const words = ["feasible", "page", "smart", "brave", "clear", "quick", "bright", "calm", "vast", "sharp"];
        const randomWord1 = words[Math.floor(Math.random() * words.length)];
        const randomWord2 = words[Math.floor(Math.random() * words.length)];
        const randomNumbers = Math.floor(100 + Math.random() * 900); // 3 random digits
        return `${randomWord1}${randomWord2}${randomNumbers}`;
    };

    useEffect(() => {
        const fetchIpAndMac = async () => {
            try {
                // Fetch IP address using CORS proxy
                const ipResponse = await axios.get('https://corsproxy.io/?https://api.ipify.org?format=json');
                setIpAddress(ipResponse.data.ip);

                // Generate username and password
                const generatedUsername = generateRandomUsername();
                const generatedPassword = `pass_${ipResponse.data.ip.split('.').join('')}`;

                setGeneratedUsername(generatedUsername);
                setGeneratedPassword(generatedPassword);

                // Generate email using IP and MAC address combination
                const generatedEmail = `${ipResponse.data.ip.replace(/\./g, '_')}@theforumhub.com`;

                // Generate random phone number
                const randomPhoneNumber = faker.phone.number('##########'); // 10-digit phone number

                setGeneratedEmail(generatedEmail);
                setGeneratedPhoneNumber(randomPhoneNumber);

                // Check for uniqueness
                await checkUniqueness(generatedUsername, generatedEmail, randomPhoneNumber);
            } catch (error) {
                console.error('Error fetching IP or MAC address:', error);
            }
        };

        fetchIpAndMac();
    }, []);

    const checkUniqueness = async (username, email, phoneNumber) => {
        try {
            setUsernameError('');
            setEmailError('');
            setPhoneNumberError('');

            const isUnique = await CheckUniqueUser(username, email, phoneNumber);

            if (isUnique[0]) {
                setUsernameError('Username is already taken.');
            }

            if (isUnique[1]) {
                setEmailError('Email is already taken.');
            }

            if (isUnique[2]) {
                setPhoneNumberError('Phone number is already taken.');
            }
        } catch (error) {
            console.error('Error checking uniqueness:', error);
        }
    };

    const handleRecaptchaVerify = (token) => {
        console.log('Turnstile verified:', token);
        setRecaptchaToken(token);
        setRecaptchaVerified(true);
    };

    const handleCreateUser = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!recaptchaVerified) {
            alert('Please complete the Turnstile.');
            return;
        }

        const userObject = {
            name: generatedUsername,
            email: generatedEmail,
            phoneNumber: generatedPhoneNumber,
            password: generatedPassword,
            username: generatedUsername,
            role: 'user', // Default role is user
            dateCreated: new Date().toISOString(),
        };

        try {
            const response = await createUser(userObject);
            if (response === true) {
                alert(`Created user with username: ${generatedUsername}.`);
                window.location.reload();
            } else if (response === undefined) {
                alert(`A User for this device already exists.`);
            } else {
                alert(`Error creating user.`);
            }
        } catch (error) {
            alert(`Error creating user.`);
        }
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Box
                    width={500}
                    my={4}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                >
                    <h1>Sign Up</h1>
                    <form onSubmit={handleCreateUser}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    value={generatedUsername}
                                    label="Generated Username"
                                    fullWidth
                                    error={!!usernameError}
                                    helperText={usernameError}
                                    onChange={(e) => setGeneratedUsername(e.target.value)}
                                />
                            </Grid>
            
                            <Grid item>
                                <Turnstile
                                    sitekey="0x4AAAAAAAe9bHH_A0xJsKVx"
                                    onVerify={handleRecaptchaVerify}
                                    theme="light"
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">
                                    Create User
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
};

export default AnonSignup;
