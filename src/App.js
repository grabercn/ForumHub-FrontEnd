import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createCustomTheme } from './components/Objects/theme'; // Correct import statement
import { ThemeProvider } from '@mui/material/styles';
import PageRoutes from './PageRoutes';
import LoadingSpinner from './components/StyledComponents/LoadingSpinner';

const themeInstance = createCustomTheme();

const App = () => {
  return (
    <div>
      <HelmetProvider>
        <LoadingSpinner isLoading={false} /> {/* Add the LoadingSpinner component */}
        {/* Use the ThemeProvider from Material-UI to apply the theme */}
        <ThemeProvider theme={themeInstance}>
          <PageRoutes />
        </ThemeProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
