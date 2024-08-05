import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/PageComponents/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForumDetail from "./components/PageComponents/ForumDetail";
import ResponsiveDialog from "./components/StyledComponents/ResponsiveDialog";
import UserProfile from "./components/PageComponents/UserProfile";
import ForumBanner from "./components/PageComponents/ForumBanner";
import PrivacyPolicy from "./components/PageComponents/PrivacyPolicy";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/forums/:forumIdUrl"
          element={
            <ResponsiveDialog open={true} sx={{ backgroundColor: "light-gray" }}>
              <ForumDetail />
            </ResponsiveDialog>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/users/:userIdUrl"
          element={
            <ResponsiveDialog open={true} sx={{ backgroundColor: "light-gray" }}>
              <UserProfile />
            </ResponsiveDialog>
          }
        />
        <Route
          path="/posts/:forumIdUrl/:postIdUrl"
          element={
            <ResponsiveDialog open={true} sx={{ backgroundColor: "light-gray" }}>
              <ForumDetail />
            </ResponsiveDialog>
          }
        />
        <Route
          path="*"
          element={
            <ForumBanner
              imgUrl="/images/image10.jpg"
              heading="404 Error"
              subheading="Page Not Found."
            />
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy /> } />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
