// File: Navbar.js
// This file contains the Navbar component that displays the navigation bar at the top of the page. 
// It includes links to different pages, a user profile menu, and a responsive menu for small screens.
// The component also handles navigation logic based on user interactions. All components are rendered conditionally based on the state.
// See bottom of file for the conditional rendering of each component.

import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import {default as Login} from '../Auth/AnonLogin';
import Logout from '../Auth/Logout';
import { Dialog } from '@mui/material';
import Searchbar from './Searchbar';
import AdminTools from './AdminTools';
import UserSettings from './UserSettings';
import UserProfile from './UserProfile';
import About from './About';
import { checkAuthLocal, getUserDataCookieValues } from '../Objects/userData.object'
import ProfileIcon from '../StyledComponents/ProfileIcon';

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);
  const [showUserProfile, setShowUserProfile] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [isLoggedin, setIsLoggedin] = React.useState(false);

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

  const handleCloseAdminTools = () => {
    setShowAuth(false);
    window.location.reload()
  };

  const userData = getUserDataCookieValues();
  const userName = userData ? userData.userName : 'User';
  const userId = userData ? userData.userId : null;

  // Add the pages and settings to the navbar, force them to be arrays
  var pages = props.pages || [];
  var settings = props.settings || [];

  const handleNavClick = (button) => {
    setAnchorElUser(null); // close menu after clicking

    var selectedButton = button.target.innerText;

    // Add logic to handle navigation based on the button clicked
    if (selectedButton === 'Login') {
      // Show the login component
      setShowLogin(true);
    } else if (selectedButton === 'Logout') {
      // Show the logout component
      setShowLogin(true);
    }else if (selectedButton === 'Profile') {
        setShowUserProfile(true);
    } else if (selectedButton === 'User Settings') {
      setShowSettings(true);
    }
    
  };

  // Check if the user is logged in, and set the state accordingly
  useEffect(() => {
    checkAuthLocal().then((response) => {
      if (response === true){
        setIsLoggedin(true);
      }else{
        setIsLoggedin(false);
      }
    });
  }, []);

  const handleSettingsClick = (button) => {
    setAnchorElUser(null); // close menu after clicking

    var selectedButton = button.target.innerText;

    // Add logic to handle navigation based on the button clicked
    if (selectedButton === 'ADMIN TOOLS') {
      // Show the admin tools component
      setShowAuth(true);
    } else if (selectedButton === 'ABOUT') {
      // Show the about component
      setShowAbout(true);
    }
  };

  // return the responsive app bar
  return (
    // THE BELOW CODE IS MOBILE ONLY / SMALL SCREENS
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HubOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          <HubOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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

          {/* Show the search bar */}
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Searchbar/>
          </Box> 

          {/* Add blank space */}
          <Box sx={{ flexGrow: 0, width: '16px' }}></Box>

          {/* Show the user menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src={<ProfileIcon />} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleNavClick}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Show login component */}
      {showLogin && (
        <>
          <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
            {isLoggedin ? <Logout /> : <Login />}
          </Dialog>
        </>
      )}
      {/* Show the admin tools */}
      {showAuth && (
        <>
          <Dialog open={showAuth} onClose={handleCloseAdminTools} fullWidth={true} >
            <AdminTools />
          </Dialog>
        </>
      )}
      {showAbout && (
        <Dialog open={showAbout} onClose={() => setShowAbout(false)}>
          <About />
        </Dialog>
      )}
      {showSettings && (
        <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
          <UserSettings />
        </Dialog>
      )}
      {showUserProfile && (
        <Dialog open={showUserProfile} onClose={() => setShowUserProfile(false)}>
          <UserProfile userId={userId}/>
        </Dialog>
      )}
    </AppBar>
  );
}
export default ResponsiveAppBar;

