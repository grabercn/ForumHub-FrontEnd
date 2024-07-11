import * as React from 'react';
import PostList from './PostList';
import ForumBanner from './ForumBanner';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getUserDataCookieValues } from '../Objects/userData.object';
import { getForumById } from '../ApiCalls/forumApiCalls';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

/**
 * Renders the details of a forum, including the forum banner, category, and posts.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.forum - The forum object.
 * @param {string} props.postId - The ID of the post.
 * @returns {JSX.Element} The rendered ForumDetail component.
 */
const ForumDetail = ({ forum, postId }) => {
  
  const [forumDataFromUrl, setForumDataFromUrl] = React.useState({});

  let { forumIdUrl, postIdUrl } = useParams();

  // Extract the forum object from the props, if not passed in as a prop, find it in the url
  let forumDetail = forum || forumDataFromUrl
  postId = postId || postIdUrl;

  // Get the forum data from the API
  React.useEffect(() => {
    if (forumIdUrl) {
      getForumById(forumIdUrl).then((forum) => {
        setForumDataFromUrl(forum);
      });
    }
  }, [forumIdUrl]);

    // Return the forum details component
    return (
        <Grid container spacing={2} id='forumDetails'  >
          <Grid item xs={12}>
            {/* Display the alert button if forumIdUrl is defined */}
              {forumIdUrl && (
              <Link to='/'>
                <div
                style={{
                  position: 'fixed',
                  top: '10px',
                  right: '10px',
                  zIndex: '1000',
                  color: 'black', // Change the color of the close button
                  borderRadius: '50%', // Add a circle around the close button
                  backgroundColor: 'white', // Add a background color
                  padding: '5px' // Add padding to the close button
                }}
                >
                <CloseIcon />
                </div>
              </Link>
              )}
                <Paper elevation={3} style={{ padding: '10px' }}>
                    <ForumBanner
                        heading={forumDetail.forumName}
                        subheading={forumDetail.forumDescription}
                        imgUrl={forumDetail.imgUrl}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                {/* Add any details you want to display in the popup*/}
                <div>
                    <p>Category: <i>{forumDetail.forumCategory}</i></p>
                </div>

                {/* Display the posts in the forum */}
                <PostList
                    forum={forumDetail}
                    userId={getUserDataCookieValues().userId}
                    postId={postId} // Pass postId to PostList
                />
            </Grid>
        </Grid>
    );
};

export default ForumDetail;
