import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info'; // Import the info icon
import Searchbar from './Searchbar';
import ForumHubIcon from '../StyledComponents/ForumHubIcon';
import NewsDropdown from './NewsDropdown';
import ResponsiveDialog from '../StyledComponents/ResponsiveDialog';
import About from './About';

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenAboutDialog = () => {
    setOpenDialog(true);  // Open the dialog when the InfoIcon is clicked
  };

  const handleCloseAboutDialog = () => {
    setOpenDialog(false);  // Close the dialog
  };

  const pages = props.pages || [];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <ForumHubIcon variant="noUnderline" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ForumHub
          </Typography>

          {/* Spacer Box to push elements to the right in mobile mode */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Pages for larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* Searchbar */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Searchbar />
          </Box>

          {/* Spacer Box to separate elements */}
          <Box sx={{ flexGrow: 0, width: '16px' }}></Box>

          {/* News Dropdown */}
          <Box sx={{ flexGrow: 0 }}>
            <NewsDropdown />
          </Box>

          {/* Info Icon to open About Dialog */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <IconButton onClick={handleOpenAboutDialog} color="inherit">
              <InfoIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Conditionally Render the Responsive About Dialog */}
      {openDialog && (
        <ResponsiveDialog open={openDialog} onClose={handleCloseAboutDialog}>
          <About />
        </ResponsiveDialog>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
