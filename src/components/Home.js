import React, { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForumDetail from "./ForumDetail";
import ForumList from "./ForumList";
import ResponsiveAppBar from "./Navbar";
import Container from '@mui/material/Container';
import { Alert, Grid } from '@mui/material';
import { forumsData as forumsData } from "./Objects/forumsData.objects";
import PageBanner from "./PageBanner";
import { checkAuthLocal } from "./Objects/userData.object";
import GoogleAd from "./GoogleAd";

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const Home = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [forums, setForums] = useState(forumsData);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [settings, setSettings] = useState([]);
  const [pages, setPages] = useState([]);
  const [rgb, setRgb] = useState(null);
  const bannerImgUrl = useRef(getRandomImageUrl()); // Use useRef to store the image URL

  const imageProcessed = useRef(false); // Track if the image has been processed

  function handleForumClick(forum) {
    setSelectedForum(forum);
  }

  useEffect(() => {
    setForums(forumsData);
  }, [forumsData]);

  useEffect(() => {
    checkAuthLocal().then((response) => {
      if (response === true){
        setSettings(['User Profile', 'Logout']);
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
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {isAuthChecked && <ResponsiveAppBar settings={settings} pages={pages} />}
        
        {rgb && (
          <PageBanner text="Welcome to ForumHub" subtext="Click on a forum to view it." imgUrl={bannerImgUrl.current} waveColor={rgb} />
        )}
        
        <br />
        <br />
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
      </div>
      <div>
        <GoogleAd />
      </div>
    </ThemeProvider>
  );
};

export default Home;
