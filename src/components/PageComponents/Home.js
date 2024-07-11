import React, { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForumDetail from "./ForumDetail";
import ForumList from "./ForumList";
import ResponsiveAppBar from "./Navbar";
import Container from '@mui/material/Container';
import { Alert, Grid, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import { forumsData as forumsData } from "../Objects/forumsData.objects";
import PageBanner from "./PageBanner";
import { checkAuthLocal } from "../Objects/userData.object";
import GoogleAd from "../GoogleAd";
import { useMediaQuery } from '@mui/material';
import HomeSettings from "./HomeSettings";
import HomeFeed from "./HomeFeed";
import { isNightMode, setPrimaryColor } from "../Objects/theme";

// Create the theme instance (not in use here but need for breakpoints)
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

var PRIMARY_COLOR = null; // Variable to store the primary color';

/**
 * Represents the Home component.
 * 
 * @component
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [forums, setForums] = useState(forumsData);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [settings, setSettings] = useState([]);
  const [pages, setPages] = useState([]);
  const [rgb, setRgb] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // For list item selection
  const bannerImgUrl = useRef(getRandomImageUrl()); // Use useRef to store the image URL

  const imageProcessed = useRef(false); // Track if the image has been processed
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleForumClick(forum) {
    setSelectedForum(forum);
  }

  useEffect(() => {
    setForums(forumsData);
  } , []);

  useEffect(() => {
    checkAuthLocal().then((response) => {
      if (response === true){
        setSettings(['Profile', 'User Settings', 'Logout']);
        checkAuthLocal("admin").then((response) => {
          if (response){
            setPages(['Admin Tools', 'About']);
          } else {
            setPages(['About']);
          }
        });
        setIsAuthChecked(true);
      } else {
        setSettings(['Login']);
        setPages(['About']);
        setIsAuthChecked(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!imageProcessed.current) {
      getAverageRGB(bannerImgUrl.current);
      imageProcessed.current = true; // Set the flag to true after processing the image
    }
  }, []);

  function getRandomImageUrl() {
    const numberOfImages = 14;
    const randomImageNumber = Math.floor(Math.random() * numberOfImages) + 1;
    return `/images/image${randomImageNumber}.jpg`;
  }

  const getAverageRGB = (imgSrc) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgSrc;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const blockSize = 5;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let rgb = { r: 0, g: 0, b: 0 };
      let count = 0;

      for (let i = 0; i < data.length; i += 4 * blockSize) {
        count++;
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
      }

      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);

      setRgb(rgb);
      setPrimaryColor(rgb);
    };
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  // if nightmode is enabled, set the primary color to the rgb value and background color to black
  if (isNightMode()) {
    PRIMARY_COLOR = rgb;
    document.body.style.backgroundColor = 'black';
  }

  return (
    <>
      <div>
        {isAuthChecked && <ResponsiveAppBar settings={settings} pages={pages} />}
        
        {rgb && (
          <PageBanner text="Welcome to ForumHub" subtext="Click on a forum to view it." imgUrl={bannerImgUrl.current} waveColor={rgb} />
        )}

        <Box sx={{ mt: 2, mb: 2 }}>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: isNightMode() ? 'black' : 'white' }}>
            <List component="nav" aria-label="main mailbox folders" sx={{ display: 'flex', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
              <ListItem 
                button 
                selected={selectedIndex === 0} 
                onClick={(event) => handleListItemClick(event, 0)}
                sx={{ flex: '1 1 auto', justifyContent: 'center', textAlign: 'center', padding: '8px 16px', color: isNightMode() ? 'white' : 'black' }}
              >
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      <HomeIcon />
                    </ListItemIcon>
                  </Grid>
                  <Grid item>
                    <ListItemText primary="HOME" sx={{ marginLeft: '8px', textAlign: 'center' }} />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem 
                button 
                selected={selectedIndex === 1} 
                onClick={(event) => handleListItemClick(event, 1)}
                sx={{ flex: '1 1 auto', justifyContent: 'center', textAlign: 'center', padding: '8px 16px', color: isNightMode() ? 'white' : 'black' }}
              >
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      <ForumIcon />
                    </ListItemIcon>
                  </Grid>
                  <Grid item>
                    <ListItemText primary="FORUMS" sx={{ marginLeft: '8px', textAlign: 'center' }} />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem 
                button 
                selected={selectedIndex === 2} 
                onClick={(event) => handleListItemClick(event, 2)}
                sx={{ flex: '1 1 auto', justifyContent: 'center', textAlign: 'center', padding: '8px 16px', color: isNightMode() ? 'white' : 'black' }}
              >
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      <SettingsIcon />
                    </ListItemIcon>
                  </Grid>
                  <Grid item>
                    <ListItemText primary="SETTINGS" sx={{ marginLeft: '8px', textAlign: 'center' }} />
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          {selectedIndex === 0 && (
            <Container maxWidth="xl">
              { /* Display the HomeFeed component */}
              <HomeFeed />
            </Container>
          )}

          {selectedIndex === 1 && (
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                {Object.values(forums).length === 0 ? (
                  <Alert severity="info"><strong>No forums available.</strong></Alert>
                ) : (
                  Object.values(forums).map((forum) => (
                    <Grid item xs={12} md={2} key={forum.id}>
                      <div className="forum-list-wrapper" style={{ overflowWrap: 'break-word', fontFamily: 'Roboto, sans-serif' }}>
                        <ForumList forums={[forum]} onForumClick={handleForumClick} />
                      </div>
                    </Grid>
                  ))
                )}
                <Grid item xs={12} md={6}>
                  {selectedForum && <ForumDetail forum={selectedForum} />}
                </Grid>
              </Grid>
            </Container>
          )}

          {selectedIndex === 2 && (
            <Container maxWidth="xl">
              { /* Display the HomeSettings component */}
              <HomeSettings />
            </Container>
          )}
        </Box>
        
      </div>
      <div>
        <GoogleAd />
      </div>
      </>
  );
};

export default Home;
