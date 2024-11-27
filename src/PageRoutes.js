import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/PageComponents/Home";
import ForumDetail from "./components/PageComponents/Forums/ForumDetail";
import ResponsiveDialog from "./components/StyledComponents/ResponsiveDialog";
import UserProfile from "./components/PageComponents/UserProfile";
import ForumBanner from "./components/PageComponents/Forums/ForumBanner";
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
