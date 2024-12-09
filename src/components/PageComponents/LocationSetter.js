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
import { LocationOnOutlined } from "@mui/icons-material";
import { createUser } from "../ApiCalls/userApiCalls";

// Function to create the forum object
const createForumObject = async (city, isLocked = false) => {
  try {
    const forumDescription = city;
    const imageUrl = "https://images.pexels.com/photos/4368897/pexels-photo-4368897.jpeg";

    const forumObject = {
      forumCategory: 'Cities',
      forumName: city,
      forumDescription: forumDescription,
      imgUrl: imageUrl,
      isLocked: isLocked,
    };

    const forumResponse = await createForum(forumObject);

    if (forumResponse && forumResponse.success) {
      console.log("Forum created successfully:", forumResponse);
      setCookie('user_city', city, 7)
      return true;
    } else {
      console.error("Forum creation failed:", forumResponse);
      return false;
    }
  } catch (error) {
    console.error("Error creating forum:", error);
    return false;
  }
};

const LocationSetter = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(getCookie("user_city") || null);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(!city);
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);  // Set loading to true when starting to get user location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          await determineCity(latitude, longitude);
        },
        (err) => {
          setLoading(false);  // Set loading to false if geolocation fails
          setError(err.message);
        }
      );
    } else {
      setLoading(false);  // Set loading to false if geolocation is not supported
      setError("Geolocation is not supported by your browser.");
    }
  };

  const determineCity = async (latitude, longitude) => {
    const setCityData = (data) => {
      const cityData = data.address;
      if (cityData.city) {
        return `${cityData.city}, ${cityData.state || cityData.region || cityData.municipality}, ${cityData.country}`;
      }
      return null;
    };

    const directions = [
      [1, 0],  // right (east)
      [-1, 0], // left (west)
      [0, 1],  // up (north)
      [0, -1], // down (south)
    ];

    try {
      // First, try to find the city directly
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
      const response = await fetch(url);
      const data = await response.json();
      const nearestCity = setCityData(data);

      if (nearestCity) {
        setLoading(false);  // Hide loading spinner
        setError(null);
        setCity(nearestCity);
      } else {
        // No city found, start searching farther
        setError("No city found near, searching farther...");
        setLoading(true);  // Keep loading state while searching for farther locations

        let cityFound = false;
        const maxRadius = 10;  // Max radius to search
        const step = 0.1;      // Step size to increment the search radius

        for (let radius = step; radius <= maxRadius; radius += step) {
          for (let [dx, dy] of directions) {
            const lat = latitude + dx * radius;
            const lon = longitude + dy * radius;
            const expandedUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

            const expandedResponse = await fetch(expandedUrl);
            const expandedData = await expandedResponse.json();
            const expandedCity = setCityData(expandedData);

            if (expandedCity) {
              setLoading(false);  // Hide loading spinner
              setError(null);
              setCity(expandedCity);
              cityFound = true;
              break;  // Exit loop once a city is found
            }
          }
          if (cityFound) break;  // Exit outer loop if city is found
        }

        if (!cityFound) {
          setLoading(false);  // Hide loading spinner
          setError("Sorry, the city is not supported at the moment.");
        }
      }
    } catch (error) {
      setLoading(false);  // Hide loading spinner
      setError("Failed to determine the nearest city.");
    }
  };

  const confirmCity = () => {
    if (city) {
      setLoading(true);  // Disable buttons while confirming city
      try {
        // Reset the location by deleting the cookie and setting city to null
        resetLocation();

        // Check if the forum already exists or needs to be created
        getForumByName(city)
          .then(forumResponse => {
            if (forumResponse.length !== 0) {  
              
              // delete then create a user token 
              deleteCookie("user_token")
              createUser().then(token => {
                console.log(token)
                if (token !== null){
                  setCookie("user_token", token.sessionToken, 30)
                }else{
                  alert("Failed to create a user session. Please try again later...");
                  setIsDialogOpen(true);  
                  setLoading(false); 
                }
              })
              
              // Forum exists, use it and set the cookie
              setCookie("user_city", city, 30);
              setIsDialogOpen(false); // Close dialog if forum already exists
              setLoading(false);  // Re-enable buttons after the process is complete
            } else {
              // Forum doesn't exist, create a new forum
              createForumObject(city, false)
                .then(forumCreated => {
                  if (forumCreated != null) {
                    
                    // create a user token 
                    createUser().then(token => {
                      if (token !== null){
                        deleteCookie("user_token")
                        setCookie("user_token", token.sessionToken, 30)
                      }else{
                        deleteCookie("user_token")
                        alert("Failed to create a user session. Please try again later...");
                        setIsDialogOpen(true);  
                        setLoading(false); 
                      }
                    })
                    
                    setCookie("user_city", city, 30);  // Set the cookie only if the forum is successfully created
                    setIsDialogOpen(false); // Close dialog after successful creation
                    setLoading(false);  // Re-enable buttons after the process is complete
                  } else {
                    // Show error message if forum creation fails
                    alert("Failed to create a forum for your city. Please try again later...");
                    setIsDialogOpen(true);  // Keep the dialog open if forum creation fails
                    setLoading(false);  // Re-enable buttons after the process is complete
                  }
                });
            }
          })
          .catch(error => {
            // Show error message if there was an error while fetching the forum
            alert("Failed to check if the forum exists. Please try again later...");
            setIsDialogOpen(true);  // Keep the dialog open if there was an error checking the forum
            setLoading(false);  // Re-enable buttons after the process is complete
          });
      } catch (error) {
        // Show generic error message in case something unexpected happens
        alert("An error occurred. Please try again later...");
        setIsDialogOpen(true);  // Keep the dialog open if forum creation fails
        setLoading(false);  // Re-enable buttons after the process is complete
      }
    }
  };

  const resetLocation = () => {
    deleteCookie("user_city");
    setCity(null);
    setError(null);
    getUserLocation();
  };

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
              <Button
                variant="contained"
                color="primary"
                onClick={confirmCity}
                disabled={loading}
              >
                Confirm
              </Button>
              <Button
                variant=""
                color="secondary"
                onClick={getUserLocation}
                disabled={loading}
              >
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
            variant="body2"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              color: isNightMode() ? "white" : "black",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            <LocationOnOutlined sx={{ mr: 1 }} />
            {city || "No city selected"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LocationSetter;
