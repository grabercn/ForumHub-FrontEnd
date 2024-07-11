import React, { useEffect, useRef, useState } from "react";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    CircularProgress,
} from "@mui/material";
import { getPopularForums } from "../ApiCalls/forumApiCalls";
import ForumList from "./ForumList";
import { getPopularPosts } from "../ApiCalls/postApiCalls";
import { Link } from "react-router-dom";
import { isNightMode } from "../Objects/theme";

/**
 * Renders the home feed component.
 * Displays popular forums and posts.
 */
const HomeFeed = () => {
    const [popularForums, setPopularForums] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    const forumContainerRef = useRef(null);

    useEffect(() => {
        /**
         * Fetches popular forums from the API and updates the state.
         */
        getPopularForums().then((forums) => {
            setPopularForums(forums);
        });
    }, []);

    useEffect(() => {
        /**
         * Fetches popular posts from the API and updates the state.
         * Sets loading to false once data is fetched.
         */
        getPopularPosts().then((posts) => {
            setPopularPosts(posts);
            setLoading(false); // Set loading to false once data is fetched
        });
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Card variant="outlined" sx={{ borderRadius: 2, marginBottom: 2 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            align="left"
                            gutterBottom
                            sx={{ marginBottom: 1 }}
                        >
                            Popular Forums:
                        </Typography>
                        <Box
                            ref={forumContainerRef}
                            sx={{ overflowX: "auto", display: "flex", alignItems: "center" }}
                        >
                            <ForumList forums={popularForums} title="Popular Forums">
                                <Typography variant="h6" align="center">
                                    Recent Posts
                                </Typography>
                            </ForumList>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 2, marginBottom: 2 }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            align="left"
                            gutterBottom
                            sx={{ marginBottom: 1 }}
                        >
                            Popular Posts:
                            <br />
                            <i style={{ fontSize: "0.7em" }}>
                                Click on a post to view more details
                            </i>
                        </Typography>
                        {popularPosts.map((post) => (
                            <Link
                            key={post.postId}
                            to={`/posts/${post.forumId.forumId}/${post.postId}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ textDecoration: "none", color: isNightMode() ? "white" : "black"}}
                            >
                                <b>{post.postSubject}</b>: {post.postText}
                            </Typography>
                        </Link>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default HomeFeed;
