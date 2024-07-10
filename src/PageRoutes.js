// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/PageComponents/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import HomeFeed from './components/PageComponents/HomeFeed';
import ForumDetail from './components/PageComponents/ForumDetail';
import { Dialog } from '@mui/material';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route
          path="/forums/:forumIdUrl"
          element={
            <Dialog open={true}>
              <ForumDetail />
            </Dialog>
          }
        />
        <Route path="/login" element={Login} />
        <Route path="/signup" element={Signup} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={<HomeFeed />} />
        <Route
          path="/posts/:forumIdUrl/:postIdUrl"
          element={
            <Dialog open={true}>
              <ForumDetail />
            </Dialog>
          }
        />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default PageRoutes;
