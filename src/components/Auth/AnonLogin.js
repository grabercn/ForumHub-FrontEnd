import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { default as Signup } from "./AnonSignup";
import { Alert } from "@mui/material";
import Turnstile from "react-turnstile";
import { faker } from '@faker-js/faker';
import { setAuthCookieValues, checkAuthLocal } from "../Objects/userData.object";
import { getUserIp } from "../ApiCalls/helperApiCalls";

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
          const randomPhoneNumber = faker.phone.number('##########');
          setGeneratedPhoneNumber(randomPhoneNumber);

          // Optionally, check for uniqueness here if needed
          // await checkUniqueness(generatedUsername, generatedEmail, randomPhoneNumber);
        } else {
          console.error('Error fetching IP', response);
          setIpAddress(null);
        }
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchIpAndMac();
  }, []);

  const generateRandomUsername = () => {
    return `user_${Math.random().toString(36).substring(2, 10)}`;
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleRecaptchaVerify = (token) => {
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

    if (!ipAddress) {
      setErrorMessage("Error fetching IP address. Try again later.");
      setIsError(true);
      return;
    }

    setAuthCookieValues(generatedEmail, generatedPassword);
    checkAuthLocal().then((response) => {
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
