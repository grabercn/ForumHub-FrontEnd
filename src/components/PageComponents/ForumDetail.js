import * as React from 'react';
import PostList from './PostList';
import ForumBanner from './ForumBanner';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getUserDataCookieValues } from '../Objects/userData.object';
import { getForumById } from '../ApiCalls/forumApiCalls';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';

// ForumDetail Component
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
        <Grid container spacing={2} id='forumDetails'>
          <Grid item xs={12}>
            {/* Display the alert button if forumIdUrl is defined */}
            {forumIdUrl && (
              <a href="/">
                <center>
                  <Alert
                    style={{
                      width: '20%',
                      float: 'right',
                      position: 'fixed',
                      zIndex: '999',
                      textAlign: 'center',
                      borderRadius: '10px', // Add rounded corners
                    }}
                    severity="info"
                  >
                    Viewing a post from homepage. Click to exit.
                  </Alert>
                </center>
              </a>
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
