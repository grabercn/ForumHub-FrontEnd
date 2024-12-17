// componentsConfig.js
import React from 'react';
import ForumList from '../PageComponents/Forums/ForumList';
import { Typography, Box, Card, CardContent, Link, Grid } from '@mui/material';
import About from '../PageComponents/About';
import { UPDATED, VERSION } from '../../version';
import { getCookie } from '../Objects/userData.object';
import ForumDetail from '../PageComponents/Forums/ForumDetail';
import { getForumByName } from '../ApiCalls/forumApiCalls';
import { useState, useEffect } from 'react';
import ForumDetailCompact from '../PageComponents/Forums/ForumDetailCompact';

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
            <Typography variant="h4">Welcome to ForumHub!</Typography>
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
    
    MyCity: () => {
        const [forum, setForum] = useState(null); // State for forum data
        const [error, setError] = useState(false); // State to track errors
        const city = getCookie("user_city"); // Get the city from the cookie

        useEffect(() => {
            // Fetch forum by city name
            if (city) {
                getForumByName(city)
                    .then((forumData) => {
                        if (forumData) {
                            setForum(forumData[0]);
                        } else {
                            setError(true); // Set error if forumData is null
                        }
                    })
                    .catch(() => {
                        setError(true); // Handle any API call errors
                    });
            } else {
                setError(true); // Handle case where city cookie is not set
            }
        }, [city]);

        if (error) {
            return (
                <Box>
                    <Typography>Error fetching your city.</Typography>
                </Box>
            );
        }

        if (!forum) {
            return (
                <Box>
                    <Typography>Loading your city...</Typography>
                </Box>
            );
        }

        return (
            <Box>
                <ForumDetailCompact forum={forum} />
            </Box>
        );
    },

    // Add more components as needed
};

export const getComponent = (name) => availableComponents[name];
