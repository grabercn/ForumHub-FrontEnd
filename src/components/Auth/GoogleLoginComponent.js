import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import Turnstile from "react-turnstile"; 
import { setAuthCookieValues, checkAuthLocal, removeAuthCookieValues, setUserDataCookieValues } from '../Objects/userData.object';
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

        if (!recaptchaVerified) {
            setErrorMessage("Please complete the Turnstile.");
            setIsError(true);
            return;
        }

        // Continue with authentication logic
        setAuthCookieValues(email, password);
        checkAuthLocal().then((response) => {
            if (response === true) {
                setErrorType("success");
                setErrorMessage("User Login successful!");
                setIsError(true);

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else if (response === 'error getting user role') {
                setErrorType("error");
                setErrorMessage("Error getting user role! Try again later.");
                setIsError(true);
                logOut();
            } else {
                // User not found, create user
                setErrorType("info");
                setErrorMessage("User not found. Creating user...");
                setIsError(true);
                setTimeout(() => {
                    handleSignup();
                }, 1000);
            
            }
        });

        setErrorMessage(""); // Clear any previous error message
        setIsError(false); // Reset error state
    };

    const handleSignup = () => {

    var error = false;

    // Generate a unique username based on the user's name
    const generateRandomUsername = () => {
        const adjectives = ["feasible", "smart", "brave", "clear", "quick", "bright", "calm", "vast", "sharp", "tall", "warm", "wild", "young", "zesty", "active", "alert", "bold", "clean", "cool", "deep", "fine", "free", "full", "great", "hard", "high", "kind", "loud", "new", "old", "rich", "safe", "soft", "true", "warm", "wise", "able", "easy", "fast", "good", "hard", "heavy", "high", "hurt", "kind", "last", "late", "long", "loud", "low", "main", "next", "open", "poor", "sad", "safe", "shy", "slow", "sure", "tall", "tiny", "ugly", "weak", "wide", "wild", "young" ];
        const nouns = ["apple", "banana", "carrot", "dog", "elephant", "fish", "giraffe", "horse", "iguana", "jaguar", "kangaroo", "lion", "monkey", "newt", "octopus", "penguin", "quail", "rabbit", "snake", "tiger", "umbrella", "vulture", "whale", "xerus", "yak", "zebra", "airplane", "titanic", "hero", "villain", "rainbow", "sunshine", "moonlight", "starlight", "firefly", "butterfly", "dragonfly", "ladybug", "bumblebee", "caterpillar", "grasshopper", "earthworm", "nightcrawler", "blackbird", "bluebird", "cardinal", "dove", "eagle", "falcon", "goldfinch", "hawk", "ibis", "jay", "kingfisher", "loon", "magpie", "nuthatch", "oriole", "pelican", "quail", "raven", "sparrow", "thrush", "vulture", "warbler", "xenops", "yellowthroat", "zebrafinch", "albatross", "bittern", "cormorant", "darter", "egret", "flamingo", "gannet", "heron", "ibis", "jacana", "kingfisher", "loon", "moorhen", "nighthawk", "osprey", "pelican", "quail", "rail", "sandpiper", "tern", "umbrellabird", "vulture", "woodpecker", "xenops", "yellowthroat", "zebrafinch", "albatross", "bittern", "cormorant", "darter", "egret", "flamingo", "gannet", "heron", "ibis", "jacana", "kingfisher", "loon", "moorhen", "nighthawk", "osprey", "pelican", "quail", "rail", "sandpiper", "tern", "umbrellabird", "vulture", "woodpecker", "xenops", "yellowthroat", "zebrafinch", "albatross", "bittern", "cormorant", "darter", "egret", "flamingo", "gannet", "heron", "ibis", "jacana", "kingfisher", "loon", "moorhen", "nighthawk", "osprey", "pelican", "quail", "rail", "sandpiper", "tern", "umbrellabird", "vulture", "woodpecker", "xenops"];
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
    const dateCreated = new Date().toISOString();

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
        profilePicture: profileImgUrl,
        role: 'user', // Default role is user, is not able to be changed from the front end, so value here does not matter
        dateCreated: dateCreated // this value is generated on the server side but is required here
    };

    try {
        createUser(userObject2).then((response) => {
        if (response === true) {
            setErrorMessage('User created successfully.');
            setErrorType('success');
            setError(true);
            setAuthCookieValues(email, password); // Set the auth cookie values to log the user in after creating the user
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
