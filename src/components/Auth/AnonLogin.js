import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { default as Signup } from "./AnonSignup";
import { Alert } from "@mui/material";
import axios from "axios";
import Turnstile from "react-turnstile"; // Import Turnstile
import { faker } from '@faker-js/faker'; // Import faker for generating random data
import { setAuthCookieValues, checkAuthLocal } from "../Objects/userData.object";

const AnonLogin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState("error");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [generatedPhoneNumber, setGeneratedPhoneNumber] = useState("");

  useEffect(() => {
    const fetchIpAndMac = async () => {
      try {
        // Fetch IP address using axios
        const ipResponse = await axios.get('https://corsproxy.io/?https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip;
        setIpAddress(ip);

        // Generate username and password
        const generatedUsername = generateRandomUsername();
        const generatedPassword = `pass_${ip.split('.').join('')}`;
        setGeneratedUsername(generatedUsername);
        setGeneratedPassword(generatedPassword);

        // Generate email using IP and MAC address combination
        const generatedEmail = `${ip.replace(/\./g, '_')}@theforumhub.com`;
        setGeneratedEmail(generatedEmail);

        // Generate random phone number
        const randomPhoneNumber = faker.phone.number('##########'); // 10-digit phone number
        setGeneratedPhoneNumber(randomPhoneNumber);

        // Check for uniqueness (implement this function based on your backend)
        // await checkUniqueness(generatedUsername, generatedEmail, randomPhoneNumber);
      } catch (error) {
        console.error('Error fetching IP or MAC address:', error);
      }
    };

    fetchIpAndMac();
  }, []);

  const generateRandomUsername = () => {
    // Function to generate a random username
    return `user_${Math.random().toString(36).substring(2, 10)}`;
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleRecaptchaVerify = (token) => {
    // Handle Turnstile verification here
    console.log("Turnstile verified:", token);
    setRecaptchaToken(token);
    setRecaptchaVerified(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!recaptchaVerified) {
      setErrorMessage("Please complete the Turnstile.");
      setIsError(true);
      return;
    }

    // Continue with authentication logic using generated details
    setAuthCookieValues(generatedEmail, generatedPassword);
    checkAuthLocal("user").then((response) => {
      if (response === true) {
        setErrorType("success");
        setErrorMessage("User Login successful!");
        setIsError(true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setErrorType("error");
        setErrorMessage("User not found! Please sign up.");
        setIsError(true);
      }
    });

    setErrorMessage(""); // Clear any previous error message
    setIsError(false); // Reset error state
  };

  return (
    <Box p={4} my={4} display="flex" alignItems="center" justifyContent="center" style={{ maxWidth: 600 }}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <h1>Login:</h1>
          </Grid>
          {isError && <Alert severity={errorType}>{errorMessage}</Alert>}
          
          <Grid item>
            {/* Render Turnstile component */}
            <Turnstile
              sitekey="0x4AAAAAAAe9bHH_A0xJsKVx"
              onVerify={handleRecaptchaVerify}
              theme="light"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Sign-in
            </Button>
          </Grid>
          <Grid item>
            <br />
            <h3>
              <u>Need an account?</u>
            </h3>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleSignup}>
              Sign-up
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={showSignup} onClose={() => setShowSignup(false)}>
        <Signup />
      </Dialog>
    </Box>
  );
};

export default AnonLogin;
