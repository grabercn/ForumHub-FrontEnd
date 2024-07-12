// componentsConfig.js
import React from 'react';
import ForumList from '../PageComponents/ForumList';
import { Typography, Box } from '@mui/material';

export const availableComponents = {
    ForumList: (props) => (
        <Box {...props}>
            <ForumList {...props} />
        </Box>
    ),
    PopularPosts: ({ posts, ...props }) => (
        <Box {...props}>
            {posts.map((post) => (
                <Typography key={post.postId} variant="subtitle1">
                    <b>{post.postSubject}</b>: {post.postText}
                </Typography>
            ))}
        </Box>
    ),
    // Add more components as needed
};

export const getComponent = (name) => availableComponents[name];
