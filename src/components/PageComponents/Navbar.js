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
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Searchbar from './Searchbar';
import AdminTools from './AdminTools';
import UserSettings from './UserSettings';
import UserProfile from './UserProfile';
import About from './About';
import NewsDropdown from './NewsDropdown'; // New dropdown component for news
import { checkAuthLocal, getAuthCookieValues } from '../Objects/userData.object';
import ProfileIcon from '../StyledComponents/ProfileIcon';
import ResponsiveDialog from '../StyledComponents/ResponsiveDialog';
import { getUserByEmailAndPassword } from '../ApiCalls/authApiCalls';
import ForumHubIcon from '../StyledComponents/ForumHubIcon';

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNews, setAnchorElNews] = useState(null); // State for news dropdown
  const [userData, setUserData] = useState({});
  const [showDialog, setShowDialog] = useState({
    login: false,
    auth: false,
    about: false,
    userProfile: false,
    settings: false,
  });
  const [isLoggedin, setIsLoggedin] = useState(false);

  const defaultProfilePhoto = "https://images.pexels.com/photos/4368897/pexels-photo-4368897.jpeg";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNewsMenu = (event) => {
    setAnchorElNews(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNewsMenu = () => {
    setAnchorElNews(null);
  };

  const handleCloseDialog = (dialogName) => {
    setShowDialog((prevState) => ({ ...prevState, [dialogName]: false }));
    if (dialogName === 'auth') window.location.reload();
  };

  useEffect(() => {
    getUserByEmailAndPassword(getAuthCookieValues().userEmail, getAuthCookieValues().userPassword).then((data) => {
      if (data) {
        setUserData(data);
      } else {
        setUserData(null);
      }
    });
  }, []);

  const pages = props.pages || [];
  const settings = props.settings || [];

  const handleNavClick = (event) => {
    const selectedButton = event.target.innerText;
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

  const handleSettingsClick = (event) => {
    const selectedButton = event.target.innerText;
    handleCloseNavMenu();

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
                <MenuItem key={page} onClick={handleSettingsClick}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ForumHubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
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
          </Box>

          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Searchbar />
          </Box>

          <Box sx={{ flexGrow: 0, m: 2 }}>
            <Tooltip title="Notifications">
              <IconButton onClick={handleOpenNewsMenu} sx={{ p: 0 }}>
                <NotificationsNoneIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="news-menu"
              anchorEl={anchorElNews}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNews)}
              onClose={handleCloseNewsMenu}
            >
              <NewsDropdown />
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userData ? (
                  <ProfileIcon username={userData.username} imgUrl={userData.profilePicture} size={40} outline={false} />
                ) : (
                  <ProfileIcon imgUrl={defaultProfilePhoto} size={40} outline={false} />
                )}
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
          <UserProfile />
        </ResponsiveDialog>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
