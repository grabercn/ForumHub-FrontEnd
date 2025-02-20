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
import Turnstile from "react-turnstile";

// Function to fetch a map image of a city
const fetchCityMapImage = async (city) => {
  try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`);
      const data = await response.json();

      if (data && data.length > 0) {
          const { lat, lon } = data[0];
          return `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${lon},${lat}&z=10&l=map&size=650,450`;
      }

      throw new Error("City not found in OpenStreetMap data.");
  } catch (error) {
      console.error("Error fetching city map image:", error);
      // Fallback to a default image
      return "public/images/image1.jpg";
  }
};

const fetchCityDescription = async (city) => {
  try {
    // Ensure proper formatting: add spaces after commas
    const formattedCity = city.replace(/,/g, ', ').trim();
    const cityName = formattedCity.split(',')[0]; // Extract just the city name
    const stateOrCountry = formattedCity.split(',').slice(1).map(s => s.trim()).join(', '); // Get state/country

    // Fetch Wikipedia summary
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`);
    const data = await response.json();

    // If it's a valid description, return the first two sentences
    if (data && data.extract && !data.extract.includes("may refer to")) {
      return data.extract.split('. ').slice(0, 2).join('. ') + '.';
    }

    // Handle disambiguation
    if (data.extract && data.extract.includes("may refer to")) {
      console.warn(`Disambiguation detected for: ${cityName}`);

      // Fetch the disambiguation page links
      const disambigResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=links&titles=${encodeURIComponent(cityName)}&format=json&pllimit=max&origin=*`);
      const disambigData = await disambigResponse.json();

      if (disambigData.query) {
        const page = Object.values(disambigData.query.pages)[0];
        if (page.links) {
          let bestMatch = null;

          // Look for a title that matches "City, State" or "City, Country"
          for (const link of page.links) {
            const title = link.title;
            if (stateOrCountry && title.includes(stateOrCountry)) {
              bestMatch = title;
              break;
            }
          }

          // If no match, default to the first disambiguation result
          if (!bestMatch && page.links.length > 0) {
            bestMatch = page.links[0].title;
          }

          // Fetch the best match summary
          if (bestMatch) {
            const bestMatchResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestMatch)}`);
            const bestMatchData = await bestMatchResponse.json();

            if (bestMatchData && bestMatchData.extract) {
              return bestMatchData.extract.split('. ').slice(0, 2).join('. ') + '.';
            }
          }
        }
      }
    }

    throw new Error("City description not found.");
  } catch (error) {
    console.error("Error fetching city description:", error);
    return "Discover the unique history and culture of this city.";
  }
};


const createForumObject = async (city, isLocked = false) => {
  try {
      const [forumDescription, imageUrl] = await Promise.all([
          fetchCityDescription(city),
          fetchCityMapImage(city)
      ]);

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
          setCookie('user_city', city, 7);
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
  const [turnstileResponse, setTurnstileResponse] = useState(null);

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
        return `${cityData.city},${cityData.state || cityData.region || cityData.municipality},${cityData.country}`;
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
      setCity("Vagabonds")
    }
  };

  const confirmCity = () => {
    if (city && turnstileResponse) {
      setLoading(true);  // Disable buttons while confirming city
      try {
        // Reset the location by deleting the cookie and setting city to null
        resetLocation();

        // Check if the forum already exists or needs to be created
        getForumByName(city)
          .then(forumResponse => {
            if (forumResponse.length !== 0) {  
              // delete then create a user token 
              deleteCookie("user_token");
              createUser().then(token => {
                if (token !== null){
                  setCookie("user_token", token.sessionToken, 30);
                } else {
                  setError("Failed to create a user session. Please try again later...");
                  setIsDialogOpen(true);  
                  setLoading(false); 
                }
              });

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
                        deleteCookie("user_token");
                        setCookie("user_token", token.sessionToken, 30);
                      } else {
                        deleteCookie("user_token");
                        setError("Failed to create a user session. Please try again later...");
                        setIsDialogOpen(true);  
                        setLoading(false); 
                      }
                    });

                    setCookie("user_city", city, 30);  // Set the cookie only if the forum is successfully created
                    setIsDialogOpen(false); // Close dialog after successful creation
                    setLoading(false);  // Re-enable buttons after the process is complete
                  } else {
                    // Show error message if forum creation fails
                    setError("Failed to create a forum for your city. Please try again later...");
                    setIsDialogOpen(true);  // Keep the dialog open if forum creation fails
                    setLoading(false);  // Re-enable buttons after the process is complete
                  }
                });
            }
          })
          .catch(error => {
            // Show error message if there was an error while fetching the forum
            setError("Failed to check if the forum exists. Please try again later...");
            setIsDialogOpen(true);  // Keep the dialog open if there was an error checking the forum
            setLoading(false);  // Re-enable buttons after the process is complete
          });
      } catch (error) {
        // Show generic error message in case something unexpected happens
        setError("An error occurred. Please try again later...");
        setIsDialogOpen(true);  // Keep the dialog open if forum creation fails
        setLoading(false);  // Re-enable buttons after the process is complete
      }
    } else {
      setError("Please complete the CAPTCHA verification.");
    }
  };

  const resetLocation = () => {
    deleteCookie("user_city");
    setCity(null);
    setError(null);
    getUserLocation();
  };

  const handleTurnstileVerify = (response) => {
    setTurnstileResponse(response);
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
              Set your location to interact with others in your area. This data is locally stored, and only used to determine your community. By clicking confirm you agree to our{" "}
              <Link href="/privacy-policy" rel="noopener">
                Privacy Policy.
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
              <Turnstile
                sitekey="0x4AAAAAAAe9bHH_A0xJsKVx"
                onVerify={handleTurnstileVerify}
                theme="auto"
              />
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
