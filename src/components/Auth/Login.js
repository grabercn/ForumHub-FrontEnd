import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GoogleLoginComponent from "./GoogleLoginComponent";

const Login = () => {
  return (
    <Box p={4} my={4} display="flex" alignItems="center" justifyContent="center">
        <Grid container spacing={2} direction="column" alignContent={'center'}>
          <Grid item>
            <GoogleLoginComponent />
          </Grid>
        </Grid>
    </Box>
  );
};

export default Login;
