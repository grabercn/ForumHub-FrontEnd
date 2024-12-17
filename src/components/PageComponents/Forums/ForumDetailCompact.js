import React from 'react';
import PostList from '../Posts/PostList';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

/**
 * Renders a compact version of the forum details with horizontal posts and a title displaying the city.
 * 
 * This component displays the forum title and a list of posts in a horizontal layout.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.forum - The forum object containing the forum details (name).
 * @returns {JSX.Element} The rendered ForumDetailCompact component.
 */
const ForumDetailCompact = ({ forum }) => {
  let forumDetail = forum || {};

  return (
    <Box
      sx={{
        width: '100%',
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Grid container id="forumDetails">
        <Grid item xs={12}>
          <center>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: 'bold' }}
              component="div" // Prevents invalid <p> tag wrapping by using <div> instead
            >
              Latest from {forumDetail.forumName}.
            </Typography>
          </center>
        </Grid>
        <Grid item xs={12}>
          <center>
            <PostList forum={forumDetail} />
          </center>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForumDetailCompact;
