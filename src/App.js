import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createCustomTheme } from './components/Objects/theme'; // Correct import statement
import { ThemeProvider } from '@mui/material/styles';
import PageRoutes from './PageRoutes';
import LoadingSpinner from './components/StyledComponents/LoadingSpinner';
import { GoogleOAuthProvider } from '@react-oauth/google';

const themeInstance = createCustomTheme();

const App = () => {
  return (
    <div>
      <HelmetProvider>
        <LoadingSpinner isLoading={false} /> {/* Add the LoadingSpinner component */}
        {/* Add the Google AdSense script to the head */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
                crossorigin="anonymous"></script>
      
      {/* Use the ThemeProvider from Material-UI to apply the theme */}
      <ThemeProvider theme={themeInstance}>
      <GoogleOAuthProvider clientId="754714750051-e4l4rhjjsce3nrso7f8il9a2p2iuss50.apps.googleusercontent.com">
        <PageRoutes />
      </GoogleOAuthProvider>
      </ThemeProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
