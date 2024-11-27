// File: Navbar.js
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Searchbar from './Searchbar';
import UserProfile from './UserProfile';
import About from './About';
import ProfileIcon from '../StyledComponents/ProfileIcon';
import ResponsiveDialog from '../StyledComponents/ResponsiveDialog'; // Import the new dialog component
import ForumHubIcon from '../StyledComponents/ForumHubIcon';
import NewsDropdown from './NewsDropdown';

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [showDialog, setShowDialog] = useState({
    login: false,
    auth: false,
    about: false,
    userProfile: false,
    settings: false,
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseDialog = (dialogName) => {
    setShowDialog((prevState) => ({ ...prevState, [dialogName]: false }));
    if (dialogName === 'auth') window.location.reload();
  };

  const pages = props.pages || [];
  const settings = props.settings || [];

  const handleNavClick = (button) => {
    const selectedButton = button.target.innerText;
    handleCloseUserMenu();

    if (selectedButton === 'Login') {
      setShowDialog({ ...showDialog, login: true });
    } else if (selectedButton === 'Logout') {
      setShowDialog({ ...showDialog, login: true });
    } else if (selectedButton === 'Profile') {
      setShowDialog({ ...showDialog, userProfile: true });
    } else if (selectedButton === 'User Settings') {
      setShowDialog({ ...showDialog, settings: true });
    }
  };

  const handleSettingsClick = (button) => {
    const selectedButton = button.target.innerText;
    handleCloseUserMenu();

    if (selectedButton === 'ADMIN TOOLS') {
      setShowDialog({ ...showDialog, auth: true });
    } else if (selectedButton === 'ABOUT') {
      setShowDialog({ ...showDialog, about: true });
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ForumHubIcon variant='noUnderline'/>
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ForumHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleSettingsClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Searchbar />
          </Box>

          <Box sx={{ flexGrow: 0, width: '16px' }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <NewsDropdown />
          </Box>
          
        </Toolbar>
      </Container>
      {showDialog.about && (
        <ResponsiveDialog open={showDialog.about} onClose={() => handleCloseDialog('about')} title="About">
          <About />
        </ResponsiveDialog>
      )}
      {showDialog.userProfile && (
        <ResponsiveDialog open={showDialog.userProfile} onClose={() => handleCloseDialog('userProfile')} title="User Profile">
          <UserProfile userId={userData.userId} />
        </ResponsiveDialog>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
