import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Dialog,
  DialogContent,
  Link,
} from "@mui/material";
import { setCookie, getCookie, deleteCookie } from "../Objects/userData.object";
import { createForum, getForumByName } from "../ApiCalls/forumApiCalls";
import { isNightMode } from "../Objects/theme";

// Function to create the forum object
const createForumObject = async (city, isLocked = false) => {
  try {
    const forumDescription = city;
    const imageUrl = "https://images.pexels.com/photos/4368897/pexels-photo-4368897.jpeg";

    // Construct the forum object
    const forumObject = {
      forumCategory: 'Cities',
      forumName: city,
      forumDescription: forumDescription,
      imgUrl: imageUrl,
      isLocked: isLocked,
    };

    // Call createForum and handle its response
    const forumResponse = await createForum(forumObject);

    if (forumResponse && forumResponse.success) {
      console.log("Forum created successfully:", forumResponse);
      setCookie('user_city', city, 7)
      return true; // Forum was successfully created
    } else {
      console.error("Forum creation failed:", forumResponse);
      return false; // Forum creation failed
    }
  } catch (error) {
    console.error("Error creating forum:", error);
    return false; // Return false in case of an error
  }
};

const LocationSetter = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(getCookie("user_city") || null);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(!city);  // Show dialog if no city is set

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          await determineCity(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const determineCity = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const cityData = data.address;
      const nearestCity = `${cityData.city || cityData.town || cityData.village}, ${cityData.state || cityData.region}, ${cityData.country}`;
      setCity(nearestCity);
    } catch (error) {
      setError("Failed to determine the nearest city.");
    }
  };

  const confirmCity = () => {
    if (city) {
      try {
        // Reset the location by deleting the cookie and setting city to null
        resetLocation();
  
        // Call getForumByName and handle the response with .then()
        getForumByName(city)
          .then(forumResponse => {
            console.log(forumResponse)
            if (forumResponse.length !== 0) {              // Forum exists, use it and set the cookie
              setCookie("user_city", city, 7);
              setIsDialogOpen(false); // Close dialog if forum already exists
            } else {
              // Forum doesn't exist, create a new forum
              createForumObject(city, false)
                .then(forumCreated => {
                  if (forumCreated != null) {
                    setCookie("user_city", city, 7);  // Set the cookie only if the forum is successfully created
                    setIsDialogOpen(false); // Close dialog after successful creation
                  } else {
                    // Show error message only if forum creation fails
                    alert("Failed to create a forum for your city. Please try again later...");
                    setIsDialogOpen(true);  // Keep the dialog open if forum creation fails
                  }
                });
            }
          })
          .catch(error => {
            // Show error message only if there was an error while fetching the forum
            alert("Failed to check if the forum exists. Please try again later...");
            setIsDialogOpen(true);  // Keep the dialog open if there was an error checking the forum
          });
      } catch (error) {
        // Show generic error message in case something unexpected happens
        alert("An error occurred. Please try again later...");
        setIsDialogOpen(true);  // Keep the dialog open if forum creation fails
      }
    }
  };  

  const resetLocation = () => {
    // Remove city cookie and reset state
    deleteCookie("user_city");
    setCity(null);
    setIsDialogOpen(true);
    getUserLocation();
  };

  // Only call getUserLocation if there is no city from the cookie or if city is null
  useEffect(() => {
    if (!city) {
      getUserLocation();
    }
  }, [city]);

  return (
    <Box>
      <Dialog open={isDialogOpen} fullWidth maxWidth="sm">
        <DialogContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              Welcome to ForumHub!
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Set your location to interact with others in your area. This data is private, locally stored, and only used to determine your community.{" "}
              <Link href="/privacy-policy" target="_blank" rel="noopener">
                Read our Privacy Policy
              </Link>
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {city ? (
            <Stack spacing={2}>
              <Typography variant="body1">
                Your nearest city is: <strong>{city}</strong>
              </Typography>
              <Button variant="contained" color="primary" onClick={confirmCity}>
                Confirm
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => getUserLocation()}>
                Retry Detection
              </Button>
            </Stack>
          ) : (
            <Stack alignItems="center">
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Determining your location...
              </Typography>
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      {city && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            variant="body2"  // Small text style
            sx={{
              fontWeight: 'bold', 
              cursor: 'pointer', 
              color: isNightMode() ? 'white' : 'black',
              textDecoration: 'underline', // Makes it look clickable
            }}
            onClick={() => setIsDialogOpen(true)}  // Reopens the location selector
          >
            Change Location: {city || "No city selected"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LocationSetter;
