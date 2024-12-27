import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { getForumByName } from '../ApiCalls/forumApiCalls';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Searchbar() {
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null); // State for search popover

  // Ref for input base to focus on open
  const inputRef = React.useRef(null);

  // Function to handle search query
  const searchQuery = (query) => {
    setSearchInput(query);
    if (query.length > 0) {
      getForumByName(query)
        .then((response) => {
          if (Array.isArray(response)) {
            setSearchResults(response);
          } else {
            setSearchResults([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching forums:', error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  };

  // Function to handle opening the search popover
  const handleOpenSearchPopover = (event) => {
    setAnchorEl(event.currentTarget);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Function to handle closing the search popover
  const handleCloseSearchPopover = () => {
    setAnchorEl(null);
    setSearchInput('');
    setSearchResults([]); // Clear search results when closing
  };

  // Search bar styling
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  // Search icon wrapper
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  // Styled input base
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <div style={{ position: 'relative', zIndex: '1000' }}>
      {/* Mobile Search Icon Button */}
      <IconButton
        size="large"
        aria-label="search"
        aria-controls="search-appbar"
        aria-haspopup="true"
        onClick={handleOpenSearchPopover}
        color="inherit"
        sx={{ display: { xs: 'block', md: 'none' } }} // Show only on mobile
      >
        <SearchIcon />
      </IconButton>

      {/* Main Search Popover */}
      <Popover
        id="search-appbar"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseSearchPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 2000, // Ensure this is above the background blur
        }}
      >
        <Box sx={{ p: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              inputRef={inputRef}
              onChange={(event) => searchQuery(event.target.value)}
              value={searchInput}
            />
          </Search>
        </Box>

        {/* Search Results Popover inside the main popover */}
        {searchResults.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '48px', // Ensure it's just below the input
              left: 0,
              right: 0,
              zIndex: 3000, // Ensure it is above the background blur
              maxHeight: '300px', // Adjust the height to fit more results
              overflowY: 'auto', // Add scroll when results exceed the height
              width: '300px', // Set a fixed width for the results box
            }}
          >
            {searchResults.map((forum) => (
              <Link to={`/forums/${forum.forumId}`} key={forum.forumId} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body1" sx={{ p: 2 }}>
                  {forum.forumName}
                </Typography>
              </Link>
            ))}
          </Paper>
        )}
      </Popover>

      {/* Desktop Search Bar */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => searchQuery(event.target.value)}
            value={searchInput}
          />
        </Search>
        {/* Desktop Search Results */}
        {searchResults.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: '48px',
              left: 0,
              right: 0,
              zIndex: 3000, // Ensure results are above background blur
            }}
          >
            {searchResults.map((forum) => (
              <Link to={`/forums/${forum.forumId}`} key={forum.forumId} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body1" sx={{ p: 2 }}>
                  {forum.forumName}
                </Typography>
              </Link>
            ))}
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default Searchbar;
