import React from 'react';
import PageRoutes from './PageRoutes';
import Home from './components/Home';
import { LoadingProvider } from './components/LoadingContext';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div>
      <Helmet>
        {/* Add the Google AdSense script to the head */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
                crossorigin="anonymous"></script>
      </Helmet>
      <LoadingProvider>
        <PageRoutes />
        <Home />
      </LoadingProvider>
    </div>
  );
};

export default App;
