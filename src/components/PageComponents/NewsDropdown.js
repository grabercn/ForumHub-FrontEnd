import React, { useState, useEffect } from 'react';
import { Box, IconButton, MenuItem, Typography, Collapse, Popover } from '@mui/material';
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';

function NewsDropdown() {
  const [newsItems, setNewsItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // GitHub API settings
  const githubToken = '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'; // Replace with your token
  const repoOwner = 'grabercn';
  const repoName = 'ForumHub-FrontEnd';
  
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repoOwner}/${repoName}/commits`,
          {
            headers: {
              Authorization: `token ${githubToken}`
            },
            params: {
              per_page: 5 // Limit the number of commits fetched
            }
          }
        );
        const commits = response.data;
        const items = commits.map(commit => ({
          title: commit.commit.message,
          description: `Description: ${commit.commit.description} - Author: ${commit.commit.author.name} - Date: ${commit.commit.author.date}`
        }));
        setNewsItems(items);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, []);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <Box>
      <IconButton 
        aria-describedby={id} 
        color="inherit" 
        onClick={handleClick}
      >
        <NotificationsNone/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {newsItems.map((item, index) => (
            <div key={index}>
              <MenuItem onClick={() => handleToggle(index)} style={{ cursor: 'pointer' }}>
                <Box display="flex" alignItems="center" width="100%" sx={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  <Box flexGrow={1}>
                    <Typography variant="body2" fontWeight="bold" sx={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </MenuItem>
              <Collapse in={expandedIndex === index}>
                <Box padding={2} sx={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Collapse>
            </div>
          ))}
        </div>
      </Popover>
    </Box>
  );
}

export default NewsDropdown;
