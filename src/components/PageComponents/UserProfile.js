import React, { useEffect } from "react";
import { getUserById } from "../ApiCalls/userApiCalls";
import { Typography, Grid } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  AlternateEmail,
  CalendarMonth,
  SupervisedUserCircle,
} from "@mui/icons-material";
import ProfileIcon from "../StyledComponents/ProfileIcon"; // Import the ProfileIcon component

// this element is called either from the routers or from the navbar when the user clicks on profile

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = React.useState({});
  let { userIdUrl } = useParams();

  useEffect(() => {
    if (userIdUrl) {
      getUserById(userIdUrl).then((user) => {
        setUserData(user);
      });
    } else {
      getUserById(userId).then((user) => {
        setUserData(user);
      });
    }
  }, [userIdUrl, userId]);

  return (
    <div style={{ margin: "20px" }}>
      {userIdUrl && (
        <Link to="/">
          <div
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              zIndex: "1000",
              color: "black", // Change the color of the close button
              borderRadius: "50%", // Add a circle around the close button
              backgroundColor: "white", // Add a background color
              padding: "5px", // Add padding to the close button
            }}
          >
            <CloseIcon />
          </div>
        </Link>
      )}
      <h1>User Profile</h1>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <div style={{ display: "flex", alignItems: "center" }}
          >
            {/* Render the ProfileIcon component */}
            <ProfileIcon username={userData.username} />
          </div>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <AlternateEmail style={{ marginRight: "5px" }} />
        {userData.username}
      </Typography>
      <Typography
        variant="h6"
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SupervisedUserCircle style={{ marginRight: "5px" }} />
        {userData.role}
      </Typography>
      <Typography
        variant="h6"
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <CalendarMonth style={{ marginRight: "5px" }} />
        {userData.dateCreated}
      </Typography>
    </div>
  );
};

export default UserProfile;
