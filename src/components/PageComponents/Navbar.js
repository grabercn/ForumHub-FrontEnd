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
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import Login from '../Auth/AnonLogin';
import Logout from '../Auth/Logout';
import Searchbar from './Searchbar';
import AdminTools from './AdminTools';
import UserSettings from './UserSettings';
import UserProfile from './UserProfile';
import About from './About';
import { checkAuthLocal, getUserDataCookieValues } from '../Objects/userData.object';
import ProfileIcon from '../StyledComponents/ProfileIcon';
import ResponsiveDialog from '../StyledComponents/ResponsiveDialog'; // Import the new dialog component

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showDialog, setShowDialog] = useState({
    login: false,
    auth: false,
    about: false,
    userProfile: false,
    settings: false,
  });
  const [isLoggedin, setIsLoggedin] = useState(false);

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

  const userData = getUserDataCookieValues();
  const userName = userData ? userData.userName : 'User';
  const userId = userData ? userData.userId : null;

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

  useEffect(() => {
    checkAuthLocal().then((response) => {
      setIsLoggedin(response);
    });
  }, []);

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

          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Searchbar />
          </Box>

          <Box sx={{ flexGrow: 0, width: '16px' }}></Box>

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

      {showDialog.login && (
        <ResponsiveDialog open={showDialog.login} onClose={() => handleCloseDialog('login')} title={isLoggedin ? "Logout" : "Login"}>
          {isLoggedin ? <Logout /> : <Login />}
        </ResponsiveDialog>
      )}
      {showDialog.auth && (
        <ResponsiveDialog open={showDialog.auth} onClose={() => handleCloseDialog('auth')} title="Admin Tools">
          <AdminTools />
        </ResponsiveDialog>
      )}
      {showDialog.about && (
        <ResponsiveDialog open={showDialog.about} onClose={() => handleCloseDialog('about')} title="About">
          <About />
        </ResponsiveDialog>
      )}
      {showDialog.settings && (
        <ResponsiveDialog open={showDialog.settings} onClose={() => handleCloseDialog('settings')} title="User Settings">
          <UserSettings />
        </ResponsiveDialog>
      )}
      {showDialog.userProfile && (
        <ResponsiveDialog open={showDialog.userProfile} onClose={() => handleCloseDialog('userProfile')} title="User Profile">
          <UserProfile userId={userId} />
        </ResponsiveDialog>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
