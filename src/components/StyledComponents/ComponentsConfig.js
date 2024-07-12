// componentsConfig.js
import React from 'react';
import ForumList from '../PageComponents/ForumList';
import { Typography, Box, Card, CardContent, Link, Grid } from '@mui/material';

export const availableComponents = {
    ForumList: (props) => (
        <Box {...props} sx={{ overflowY: 'auto'}}>
            <ForumList {...props} />
        </Box>
    ),
    PopularPosts: ({ posts, ...props }) => (
        <Grid container spacing={2} {...props}>
            {posts.map((post) => (
                <Grid item xs={12} sm={6} key={post.postId}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Link
                                key={post.postId}
                                href={`/posts/${post.forumId.forumId}/${post.postId}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="subtitle1">
                                    <b>{post.postSubject}</b>: {post.postText}
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    ),
    // Add more components as needed
};

export const getComponent = (name) => availableComponents[name];
