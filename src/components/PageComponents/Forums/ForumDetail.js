import React, { useEffect } from 'react';
import PostList from '../Posts/PostList';
import ForumBanner from './ForumBanner';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getForumById } from '../../ApiCalls/forumApiCalls';
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
  useEffect(() => {
    if (forumIdUrl) {
      getForumById(forumIdUrl).then((forum) => {
        setForumDataFromUrl(forum);
      });
    }
  }, [forumIdUrl]);

    // Return the forum details component
    return (
        <Grid container id='forumDetails'>
          <Grid item xs={12}>
            {/* Display the alert button if forumIdUrl is defined */}
              {forumIdUrl && (
                <Link to="/">
                  <div
                    style={{
                      position: 'fixed',
                      top: '16px', // Slightly more space for better alignment
                      right: '16px',
                      zIndex: '1000',
                      display: 'flex', // Center the icon
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px', // Fixed dimensions for consistency
                      height: '40px',
                      color: '#000', // Slightly darker black for modern look
                      borderRadius: '50%',
                      backgroundColor: '#f5f5f5', // Subtle background color for a softer look
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for depth
                      transition: 'transform 0.2s, background-color 0.2s', // Smooth hover effect
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e0e0e0'; // Subtle hover color
                      e.currentTarget.style.transform = 'scale(1.1)'; // Slight zoom on hover
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5'; // Revert hover color
                      e.currentTarget.style.transform = 'scale(1)'; // Revert zoom
                    }}
                  >
                    <CloseIcon style={{ fontSize: '24px' }} /> {/* Icon size for consistency */}
                  </div>
                </Link>
              )}
              <center>
                <Paper elevation={3}>
                    <ForumBanner
                        heading={forumDetail.forumName}
                        subheading={forumDetail.forumDescription}
                        imgUrl={forumDetail.imgUrl}
                    />
                </Paper>
              </center>
            </Grid>
            <Grid item xs={12}>
                {/* Add any details you want to display in the popup*/}
                {/* Display the posts in the forum */}
                <center>
                  <PostList
                      forum={forumDetail}
                      postId={postId} // Pass postId to PostList
                  />
                </center>
            </Grid>
            
        </Grid>
    );
};

export default ForumDetail;
