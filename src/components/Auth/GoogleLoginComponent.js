import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import Turnstile from "react-turnstile"; 
import { setAuthCookieValues, checkAuthLocal, removeAuthCookieValues } from '../Objects/userData.object';
import { sha256 } from 'js-sha256';
import { createUser } from '../ApiCalls/userApiCalls';
import { CheckUniqueUser } from '../ApiCalls/userApiCalls';
import { faker } from '@faker-js/faker';

function GoogleLoginComponent() {
    const [googleUserLoggedIn, setGoogleUserLoggedIn] = useState(null);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [isError, setIsError] = useState(true);
    const [errorType, setErrorType] = useState("info");
    const [errorMessage, setErrorMessage] = useState("Login with Google to continue.");

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUserLoggedIn(codeResponse),
        onError: (error) => setError(error)
    });

    const handleRecaptchaVerify = (token) => {
        setRecaptchaToken(token);
        setRecaptchaVerified(true);
    };

    const handleGoogleLogin = () => {
        if (!recaptchaVerified) {
            setErrorMessage("Please complete the Turnstile.");
            setIsError(true);
            setErrorType("error");
            return;
        }

        login();
        if (error) {
            setErrorMessage("Error logging in with Google!");
            setIsError(true);
            setErrorType("error");
            return;
        }
    }

    // Fetch Google user data once Google User is logged in
    const getGoogleUserData = () => {
        if (googleUserLoggedIn) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUserLoggedIn.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${googleUserLoggedIn.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    };

    // Function to handle login after Google login is successful in the backend
    const handleLogin = () => {
        if (!googleUserLoggedIn) {
            setErrorMessage("Error logging in with Google!");
            setErrorType("error");
            setIsError(true);
            return;
        } else if (!profile) {
            setErrorMessage("Error getting user profile!");
            setErrorType("error");
            setIsError(true);
            return;
        }

        const password = sha256(profile.email+profile.name).toString();
        const email = profile.email;
        const userType = ["user", "admin"];

        if (!recaptchaVerified) {
            setErrorMessage("Please complete the Turnstile.");
            setIsError(true);
            return;
        }

        // Continue with authentication logic
        setAuthCookieValues(email, password);
        checkAuthLocal(userType[0]).then((response) => {
            if (response === true) {
                setErrorType("success");
                setErrorMessage("User Login successful!");
                setIsError(true);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else if (response === 'error getting user role') {
                setErrorType("error");
                setErrorMessage("Error getting user role! Try again later.");
                setIsError(true);
                logOut();
            } else {
                // Check for admin authentication
                checkAuthLocal(userType[1]).then((adminResponse) => {
                    if (adminResponse === true) {
                        setErrorType("success");
                        setErrorMessage("Admin Login successful!");
                        setIsError(true);

                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        setErrorType("info");
                        setErrorMessage("User not found. Creating user...");
                        setIsError(true);
                        setTimeout(() => {
                            handleSignup();
                        }, 1000);
                    }
                });
            }
        });

        setErrorMessage(""); // Clear any previous error message
        setIsError(false); // Reset error state
    };

    const handleSignup = () => {

    var error = false;

    // Generate a unique username based on the user's name
    const generateRandomUsername = () => {
        const adjectives = ["feasible", "page", "smart", "brave", "clear", "quick", "bright", "calm", "vast", "sharp" ];
        const nouns = ["apple", "banana", "carrot", "dog", "elephant", "fish", "giraffe", "horse", "iguana", "jaguar" ];
        const randomWord1 = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomWord2 = nouns[Math.floor(Math.random() * nouns.length)];
        const randomNumbers = Math.floor(100 + Math.random() * 900); // 3 random digits
        return `${randomWord1}${randomWord2}${randomNumbers}`;
    };

    const uniqueusername = generateRandomUsername();
    const password = sha256(profile.email+profile.name).toString();
    const email = profile.email;
    const phoneNumber = faker.phone.number('##########'); // 10-digit phone number
    const userName = profile.name;
    const profileImgUrl = profile.picture || '';

    CheckUniqueUser(uniqueusername, email, phoneNumber).then((isUnique) => {
    if (isUnique[0]) {
        setErrorMessage('Username is already taken.');
        setErrorType('error');
        setError(true);
        error = true;
    }
    if (isUnique[1]) {
        setErrorMessage('Email is already taken.');
        setErrorType('error');
        setError(true);
        error = true;
    }
    if (isUnique[2]) {
        setErrorMessage('Phone number is already taken.');
        setErrorType('error');
        setError(true);
        error = true;
    }
    });

    // If there is an error aka duplicate value, return
    if (error) {
        logOut();
        return;
    }

    const userObject2 = {
        name: userName,
        username: uniqueusername,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        profileImgUrl: profileImgUrl,
        role: 'user' // Default role is user, is not able to be changed from the front end, so value here does not matter
    };

    try {
        createUser(userObject2).then((response) => {
        if (response === true) {
            setErrorMessage('User created successfully.');
            setErrorType('success');
            setError(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (response === undefined) {
            setErrorMessage('Error getting user role.');
            setErrorType('error');
            setError(true);
        } else {
            setErrorMessage('Error creating user.');
            setErrorType('error');
            setError(true);
        }
    });
    } catch (error) {
        alert(`Error creating user.`);
        console.error(error);
    }
    };

    // UseEffect to handle Google user data fetching once user is logged in
    useEffect(() => {
        if (googleUserLoggedIn) {
            console.log("User logged in: ", googleUserLoggedIn);
            getGoogleUserData();
        }
    }, [googleUserLoggedIn]);

    // UseEffect to handle backend server login once user profile is fetched
    useEffect(() => {
        if (profile) {
            handleLogin();
        }
    }, [profile]);

    // Logout function to log the user out of google and reset the profile and login status
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setGoogleUserLoggedIn(null);
        removeAuthCookieValues();
    };

    return (
        <div>
            {isError && <Alert severity={errorType}>{errorMessage}</Alert>}
            <div style={{ height: "20px" }}></div>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <Typography>User Logged in</Typography>
                    <Typography>Name: {profile.name}</Typography>
                    <Typography>Email Address: {profile.email}</Typography>
                    <Button onClick={logOut}>Log out</Button>
                </div>
            ) : (
                <Grid container spacing={2} direction="column" alignContent={'center'}>
                    <Grid item>
                        <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
                    </Grid>
                    <Grid item>
                        {/* Render Turnstile component */}
                        <Turnstile
                            sitekey="0x4AAAAAAAe9bHH_A0xJsKVx"
                            onVerify={handleRecaptchaVerify}
                            theme="light"
                        />
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default GoogleLoginComponent;
