import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Button,
    IconButton,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { getPopularForums } from "../ApiCalls/forumApiCalls";
import { getPopularPosts } from "../ApiCalls/postApiCalls";
import { availableComponents, getComponent } from "../StyledComponents/ComponentsConfig";
import { isNightMode } from "../Objects/theme";
import LoadingSpinner from "../StyledComponents/LoadingSpinner";
import AnimationTag from "../StyledComponents/AnimationTag";
import ForumHubIcon from "../StyledComponents/ForumHubIcon";

/**
 * Renders the home feed component.
 * Displays popular forums and posts.
 */
const HomeFeed = () => {
    const [popularForums, setPopularForums] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [customizeMode, setCustomizeMode] = useState(false); // State to track customization mode
    const [layout, setLayout] = useState([]); // State to track the layout

    useEffect(() => {
        // Fetch layout from localStorage
        const savedLayout = JSON.parse(localStorage.getItem("homeFeedLayout"));
        if (savedLayout) {
            setLayout(savedLayout);
        }

        // Fetch popular forums from the API and updates the state.
        getPopularForums().then((forums) => {
            setPopularForums(forums);
        });

        // Fetch popular posts from the API and updates the state.
        getPopularPosts().then((posts) => {
            setPopularPosts(posts);
            setLoading(false); // Set loading to false once data is fetched
        });
    }, []);

    const saveLayoutToLocalStorage = (newLayout) => {
        setLayout(newLayout);
        localStorage.setItem("homeFeedLayout", JSON.stringify(newLayout));
    };

    const addComponent = (componentName) => {
        const newLayout = [...layout, { name: componentName }];
        saveLayoutToLocalStorage(newLayout);
    };

    const removeComponent = (index) => {
        const newLayout = layout.filter((_, i) => i !== index);
        saveLayoutToLocalStorage(newLayout);
    };

    const toggleCustomizeMode = () => {
        setCustomizeMode((prev) => !prev);
    };

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
                <LoadingSpinner isLoading={loading} />
            </Box>
        );
    }

    return (
        <AnimationTag animation="slide-up">
            <Box sx={{ padding: 2 }}>
                {layout.length === 0 && (
                    <Box
                        sx={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "50vh", // Ensures vertical centering within the viewport height
                        }}
                    >
                        <ForumHubIcon width={200} height={200} variant="normal" />
                        <Typography
                            variant="h6"
                            color={isNightMode() ? 'white' : 'black'}
                            sx={{ marginTop: 2 }}
                        >
                            Welcome to your customizable homepage.
                        </Typography>
                        <Typography
                            variant="body1"
                            color={isNightMode() ? 'lightblue' : 'black'}
                        >
                            Click "Customize" to add components.
                        </Typography>
                    </Box>
                )}
                <Grid container spacing={2}>
                    {layout.map((component, index) => {
                        const Component = getComponent(component.name);
                        return (
                            <Grid item xs={12} key={index}>
                                <Card variant="outlined" sx={{ borderRadius: 2, marginBottom: 2 }}>
                                    <CardContent>
                                        {customizeMode && (
                                            <IconButton
                                                aria-label="remove component"
                                                onClick={() => removeComponent(index)}
                                                sx={{ float: "right" }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        )}
                                        <Component
                                            forums={popularForums}
                                            posts={popularPosts}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                    {customizeMode && (
                        <Grid item xs={12}>
                            <Select
                                label="Add Component"
                                onChange={(e) => addComponent(e.target.value)}
                                value=""
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Add Component
                                </MenuItem>
                                {Object.keys(availableComponents).map((key) => (
                                    <MenuItem key={key} value={key}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    )}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleCustomizeMode}
                        sx={{ marginRight: 2 }}
                    >
                        {customizeMode ? "Save" : "Customize"}
                    </Button>
                </Box>
            </Box>
        </AnimationTag>
    );
};

export default HomeFeed;
