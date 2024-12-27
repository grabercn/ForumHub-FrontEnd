import React, { useState, useEffect, useRef } from "react";
import { createTheme } from '@mui/material/styles';
import ForumDetail from "./Forums/ForumDetail";
import ForumList from "./Forums/ForumList";
import ResponsiveAppBar from "./Navbar";
import Container from '@mui/material/Container';
import { Alert, Grid, Box, List, ListItem, ListItemIcon, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import { forumsData as forumsData } from "../Objects/forumsData.objects";
import PageBanner from "./PageBanner";
import LocationSetter from "./LocationSetter";
import { checkCookie } from "../Objects/userData.object";
import { useMediaQuery } from '@mui/material';
import HomeSettings from "./HomeSettings";
import HomeFeed from "./HomeFeed";
import { isNightMode, setPrimaryColor } from "../Objects/theme";
import LoadingSpinner from "../StyledComponents/LoadingSpinner";
import AnimationTag from "../StyledComponents/AnimationTag";

// Create the theme instance (not in use here but need for breakpoints)
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

var PRIMARY_COLOR = null; // Variable to store the primary color

/**
 * Represents the Home component.
 * 
 * @component
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [forums, setForums] = useState([]);
  const [settings, setSettings] = useState([]);
  const [pages, setPages] = useState([]);
  const [rgb, setRgb] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // For list item selection
  const [isLoadingForums, setIsLoadingForums] = useState(true);
  const [isProcessingImage, setIsProcessingImage] = useState(true);
  const [openLocationSetter, setOpenLocationSetter] = useState(false)
  const [sortBy, setSortBy] = useState('reactions'); // State for sorting option
  const bannerImgUrl = useRef(getRandomImageUrl()); // Use useRef to store the image URL

  const imageProcessed = useRef(false); // Track if the image has been processed
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleForumClick(forum) {
    setSelectedForum(forum);
  }

  useEffect(() => {
    setForums(forumsData);
    setIsLoadingForums(false);
  }, []);

  useEffect(() => {
    const response = checkCookie('user_city')
      if (response !== false) {
        setPages([]);
        setOpenLocationSetter(false)
      } else {
        setPages([]);
        setOpenLocationSetter(true);
      }
    }, []);

  useEffect(() => {
    if (!imageProcessed.current) {
      getAverageRGB(bannerImgUrl.current);
      imageProcessed.current = true; // Set the flag to true after processing the image
      setIsProcessingImage(false);
    }
  }, []);

  function getRandomImageUrl() {
    const numberOfImages = 24;
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

  // Sorting function
  const sortForums = (sortBy) => {
    switch (sortBy) {
      case 'name':
        setForums([...forums].sort((a, b) => a.forumName.localeCompare(b.forumName)));
        break;
      case 'category':
        setForums([...forums].sort((a, b) => a.forumCategory.localeCompare(b.forumCategory)));
        break;
      default:
        break;
    }
  };

  // Effect to sort forums when selectedIndex changes
  useEffect(() => {
    if (selectedIndex === 1) { // Check if forums tab is selected
      sortForums(sortBy); // Sort by current sortBy option
    }
  }, [selectedIndex, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // if nightmode is enabled, set the primary color to the rgb value and background color to black
  if (isNightMode()) {
    PRIMARY_COLOR = rgb;
    document.body.style.backgroundColor = 'black';
  }

  return (
    <>
      <div>
        { isLoadingForums || isProcessingImage ? (
          <LoadingSpinner isLoading={true} />
        ) : (
          <>
            {<ResponsiveAppBar settings={settings} pages={pages} />}

            {rgb && (
              <PageBanner text="Welcome to ForumHub" subtext="Connect Locally, Share Globally!" imgUrl={bannerImgUrl.current} waveColor={rgb} />
            )}

            <AnimationTag animation="grow">
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
            </AnimationTag>

            <Box>
              <LocationSetter />
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel id="sort-by-label">Sort by</InputLabel>
                      <Select
                        labelId="sort-by-label"
                        id="sort-by"
                        value={sortBy}
                        onChange={handleSortChange}
                        label="Sort by"
                      >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="category">Category</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Grid container spacing={2}>
                    {Object.values(forums).length === 0 ? (
                      <Alert severity="info"><strong>No forums available.</strong></Alert>
                    ) : (
                      Object.values(forums).map((forum) => (
                        <Grid item xs={12} md={2} key={forum.forumId}>
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
          </>
        )}
      </div>
    </>
  );
};

export default Home;
