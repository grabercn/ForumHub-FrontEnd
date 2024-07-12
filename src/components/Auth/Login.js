import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import Signup from "./Signup";
import { checkAuthLocal, setAuthCookieValues } from "../Objects/userData.object";
import { Alert } from "@mui/material";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState("error");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const password = event.target.elements.password.value;
    const email = event.target.elements.email.value;
    const userType = ['user', 'admin'];

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
            setErrorType("error");
            setErrorMessage("Invalid credentials!");
            setIsError(true);
          }
        });
      }
    });
  };

  return (
    <Box
      p={4}
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <h1>Login:</h1>
          </Grid>
          {isError && (
            <Alert severity={errorType}>{errorMessage}</Alert>
          )}
          <Grid item>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              name="email"
            />
          </Grid>
          { (
            <Grid item>
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                name="password"
              />
            </Grid>
          )}
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

export default Login;
