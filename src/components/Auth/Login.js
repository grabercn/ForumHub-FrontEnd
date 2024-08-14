import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import GoogleLoginComponent from "./GoogleLoginComponent";
import Signup from "./Signup";
import { Alert } from "@mui/material";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignup = () => {
    setShowSignup(true);
  };

  return (
    <Box p={4} my={4} display="flex" alignItems="center" justifyContent="center">
        <Grid container spacing={2} direction="column" alignContent={'center'}>

          <Grid item>
            <GoogleLoginComponent />
          </Grid>
          
        </Grid>
      <Dialog open={showSignup} onClose={() => setShowSignup(false)}>
        <Signup />
      </Dialog>
    </Box>
  );
};

export default Login;
