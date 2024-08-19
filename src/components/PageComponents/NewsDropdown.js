import React, { useState } from 'react';
import { Box, IconButton, MenuItem, Typography, Collapse, Popover } from '@mui/material';
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function NewsDropdown() {
  const newsItems = [
    { title: 'A little welcome.', description: 'Welcome to ForumHub! We are constantly working to improve your experience here! Come back here to be notified of the latest updates and changes.' },
    { title: 'We are live.', description: 'ForumHub is live!' },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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
                <Box display="flex" alignItems="center" width="100%">
                  <Box flexGrow={1}>
                    <Typography variant="body2" fontWeight="bold">
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
