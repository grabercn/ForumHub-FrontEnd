// componentsConfig.js
import React from 'react';
import ForumList from '../PageComponents/ForumList';
import { Typography, Box, Card, CardContent, Link, Grid } from '@mui/material';
import { getUserDataCookieValues } from '../Objects/userData.object';
import About from '../PageComponents/About';
import { UPDATED, VERSION } from '../../version';

export const availableComponents = {
    PopularForums: (props) => (
        <Box {...props} sx={{ overflowY: 'auto'}}>
            <ForumList {...props} />
            <div style={{ height: '10px' }}></div>
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
    WelcomeTag: () => (
        <Box>
            <Typography variant="h4">Welcome, {getUserDataCookieValues().userName || "guest"}!</Typography>
        </Box>
    ),
    About: () => (
        <About />
    ),
    Version: () => (
        <Box>
            <Typography variant="h6">
                Version: <br/> {VERSION}: 
                <br />
                Last Updated: <br/> {UPDATED} 
            </Typography>
        </Box>
    ),

    // Add more components as needed
};

export const getComponent = (name) => availableComponents[name];
