import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function NewsDropdown() {
  // Sample news items
  const newsItems = [
    { title: 'A little welcome.', description: 'Welcome to ForumHub! We are constantly working to improve your experience here! Come back here to be notified of the latest updates and changes.' },
    { title: 'We are live.', description: 'ForumHub is live!' },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {newsItems.map((item, index) => (
        <div key={index}>
          <MenuItem onClick={() => handleToggle(index)} style={{ cursor: 'pointer' }}>
            <Box display="flex" alignItems="center" width="100%">
              <Box flexGrow={1}>
                <Typography variant="body2" fontWeight="bold">{item.title}</Typography>
              </Box>
              <IconButton size="small">
                {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </MenuItem>
          <Collapse in={expandedIndex === index}>
            <Box padding={2} sx={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              <Typography variant="body2" color="text.secondary">{item.description}</Typography>
            </Box>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default NewsDropdown;
