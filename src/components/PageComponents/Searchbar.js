// File: Searchbar.js
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { getAllForums } from '../ApiCalls/forumApiCalls';
import Box from '@mui/material/Box';

function Searchbar() {
  const [searchResult, setSearchResult] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null); // State for search popover

  // Function to handle search query
  const searchQuery = (query) => {
    getAllForums().then((response) => {
      response.forEach((forum) => {
        if (query && forum.forumName.toLowerCase().includes(query.toLowerCase())) {
          setSearchResult(forum);
        }
      });
    });
  };

  // Function to handle opening the search popover
  const handleOpenSearchPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the search popover
  const handleCloseSearchPopover = () => {
    setAnchorEl(null);
    setSearchResult(null); // Clear search results when closing
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
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <div style={{ zIndex: '1000' }}>
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
              onChange={(event) => searchQuery(event.target.value)}
            />
          </Search>
          {searchResult && (
            <div className="forum-list-wrapper" style={{ overflowWrap: 'break-word', position: 'absolute' }}>
              {searchResult.forumName}
              <br />
            </div>
          )}
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
          />
        </Search>
        {searchResult && (
          <div className="forum-list-wrapper" style={{ overflowWrap: 'break-word', position: 'absolute' }}>
            {searchResult.forumName}
            <br />
          </div>
        )}
      </Box>
    </div>
  );
}

export default Searchbar;
