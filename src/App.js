import React from 'react';
import { Helmet } from 'react-helmet';
import { createCustomTheme } from './components/Objects/theme'; // Correct import statement
import { ThemeProvider } from '@mui/material/styles';
import PageRoutes from './PageRoutes';

const themeInstance = createCustomTheme();

const App = () => {
  return (
    <div>
      <Helmet>
        {/* Add the Google AdSense script to the head */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
                crossorigin="anonymous"></script>
      </Helmet>
      {/* Use the ThemeProvider from Material-UI to apply the theme */}
      <ThemeProvider theme={themeInstance}>
        <PageRoutes />
      </ThemeProvider>
    </div>
  );
};

export default App;
