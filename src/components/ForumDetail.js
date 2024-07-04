// ProductDetail.js
// Handles the specific details of a forum and allows the user to add the forum to the cart
import * as React from 'react';
import PostList from './PostList';
import ForumBanner from './ForumBanner';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getUserDataCookieValues } from './Objects/userData.object';

// Product Detail Component
// forum: The forum object to display details for
// showCartButton: A blank (undefined) value to indicate whether or not to display the add to cart button
const ForumDetail = (forum) => {

  // Extract the forum object from the props
  const forumDetail = forum.forum;

  // Return the forum details component
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Display the forum name */}
                  {/* Display the forum banner */}
                  <Paper elevation={3} style={{ padding: '10px' }}>
                    <ForumBanner heading={forumDetail.forumName} subheading={forumDetail.forumDescription} imgUrl={forumDetail.imgUrl}/>
                  </Paper>
                  </Grid>
                  <Grid item xs={12}>
                  {/* Add any details you want to display in the popup*/}
            <div>
              <p>Category: <i>{forumDetail.forumCategory}</i></p>
            </div>
            
            {/* Display the posts in the forum */}
            <PostList posts={forumDetail.posts} forum={forumDetail} userId={getUserDataCookieValues().userId}/>
          </Grid>
        </Grid>
      );
}

export default ForumDetail;
