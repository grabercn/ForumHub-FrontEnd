import React, { useEffect, useState } from 'react';
import PostList from '../Posts/PostList';
import ForumBanner from './ForumBanner';
import Grid from '@mui/material/Grid';
import { getForumById } from '../../ApiCalls/forumApiCalls';
import { useParams, Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const ForumDetail = ({ forum, postId }) => {
  const [forumDataFromUrl, setForumDataFromUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { forumIdUrl, postIdUrl } = useParams();

  const forumDetail = forum || forumDataFromUrl;
  postId = postId || postIdUrl;

  useEffect(() => {
    if (forumIdUrl) {
      setLoading(true);
      getForumById(forumIdUrl)
        .then(setForumDataFromUrl)
        .catch((error) => console.error("Failed to fetch forum data:", error))
        .finally(() => setLoading(false));
    }
  }, [forumIdUrl]);

  useEffect(() => {
    if (forumDetail?.forumName) {
      document.title = forumDetail.forumName;
    }
  }, [forumDetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!forumDetail) {
    return <div>Forum not found</div>;
  }

  const { forumName, forumDescription, imgUrl } = forumDetail;

  return (
    <Grid container id="forumDetails">
      <Grid item xs={12}>
        {forumIdUrl && (
          <Link to="/">
            <div
              style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                zIndex: '1000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: '#000',
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, background-color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Close"
              title="Go back to forums"
            >
              <CloseIcon style={{ fontSize: '24px' }} />
            </div>
          </Link>
        )}
        <center>
            <ForumBanner
              heading={forumName}
              subheading={forumDescription}
              imgUrl={imgUrl}
            />
        </center>
      </Grid>
      <Grid item xs={12}>
        <center>
          <PostList forum={forumDetail} postId={postId} />
        </center>
      </Grid>
    </Grid>
  );
};

ForumDetail.propTypes = {
  forum: PropTypes.shape({
    forumName: PropTypes.string,
    forumDescription: PropTypes.string,
    imgUrl: PropTypes.string,
  }),
  postId: PropTypes.string,
};

export default ForumDetail;
