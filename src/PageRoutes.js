import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/PageComponents/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import HomeFeed from "./components/PageComponents/HomeFeed";
import ForumDetail from "./components/PageComponents/ForumDetail";
import { Dialog, Tooltip } from "@mui/material";
import UserProfile from "./components/PageComponents/UserProfile";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/forums/:forumIdUrl"
          element={
            <Dialog open={true} sx={{ backgroundColor: "light-gray" }}>
              <ForumDetail />
            </Dialog>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/users/:userIdUrl"
          element={
            <Dialog open={true} sx={{ backgroundColor: "light-gray" }}>
              <UserProfile />
            </Dialog>
          }
        />
        <Route
          path="/posts/:forumIdUrl/:postIdUrl"
          element={
            <Dialog open={true} sx={{ backgroundColor: "light-gray" }}>
              <ForumDetail />
            </Dialog>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
