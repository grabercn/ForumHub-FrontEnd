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

  // Use effect to focus input on search result change
  React.useEffect(() => {
    if (searchResults.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchResults]);

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
      </Popover>

      {/* Original search bar for larger screens */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
      </Box>

      {/* Floating search results */}
      {searchResults.length > 0 && (
        <Paper elevation={3} style={{ position: 'absolute', top: '60px', left: 0, right: 0, zIndex: 1000 }}>
          {searchResults.map((forum) => (
            <Link to={`/forum/${forum.forumId}`} key={forum.forumId} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1" sx={{ p: 2 }}>
                {forum.forumName}
              </Typography>
            </Link>
          ))}
        </Paper>
      )}
    </div>
  );
}

export default Searchbar;
