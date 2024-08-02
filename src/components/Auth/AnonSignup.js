import { Container, Grid, TextField, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createUser, CheckUniqueUser } from '../ApiCalls/userApiCalls';
import Turnstile from 'react-turnstile';
import { faker } from '@faker-js/faker';
import { getUserIp } from '../ApiCalls/helperApiCalls';

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
                // Fetch IP address
                const response = await getUserIp();
                if (response) {
                    const ip = response.ip;
                    setIpAddress(ip);

                    // Generate username and password
                    const generatedUsername = generateRandomUsername();
                    const generatedPassword = `pass_${ip.split('.').join('')}`;
                    setGeneratedUsername(generatedUsername);
                    setGeneratedPassword(generatedPassword);

                    // Generate email using IP
                    const generatedEmail = `${ip.replace(/\./g, '_')}@theforumhub.com`;
                    setGeneratedEmail(generatedEmail);

                    // Generate random phone number
                    const randomPhoneNumber = faker.phone.number('##########'); // 10-digit phone number
                    setGeneratedPhoneNumber(randomPhoneNumber);

                    // Check for uniqueness
                    await checkUniqueness(generatedUsername, generatedEmail, randomPhoneNumber);
                } else {
                    console.error('Error fetching IP', response);
                    setIpAddress(null);
                }
            } catch (error) {
                console.error('Error fetching IP or MAC address:', error); // Log any errors
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
        setRecaptchaToken(token);
        setRecaptchaVerified(true);
    };

    const handleCreateUser = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!recaptchaVerified) {
            alert('Please complete the Turnstile.');
            return;
        }

        if (!ipAddress) {
            alert('Error fetching IP address. Try again later.');
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
                window.location.reload();
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
                            {/* display the ip details */}
                            <Grid item>
                                <TextField
                                    value={ipAddress}
                                    label="IP Address"
                                    fullWidth
                                    disabled
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
