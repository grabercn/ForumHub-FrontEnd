import React, { useEffect, useState } from 'react';
import { Button, Grid, Container, Dialog, Stack, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ForumDetail from './ForumDetail';
import ForumList from './ForumList';
import { forumsData } from '../Objects/forumsData.objects';
import { createForum, deleteForumById } from '../ApiCalls/forumApiCalls';
import UserProfile from './UserProfile';
import { deleteUserById, getAllUserIds } from '../ApiCalls/userApiCalls';
import LoadingSpinner from '../StyledComponents/LoadingSpinner';
import { checkAuthLocal } from '../Objects/userData.object';
import GlassTopBar from '../StyledComponents/GlassTopBar';

/**
 * AdminTools component for managing forums.
 * @component
 */
const AdminTools = () => {
    const [selectedUtility, setSelectedUtility] = useState(null);
    const [selectedForum, setSelectedForum] = useState(null);
    const [userIds, setUserIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForumForm, setShowAddForumForm] = useState(false);
    const [showRemoveForumForm, setShowRemoveForumForm] = useState(false);
    const [category, setCategory] = useState('');

    // Fetch all user IDs from the API and set the user IDs state variable
    useEffect(() => {
        // Check if the user is an admin before loading the page
        checkAuthLocal('admin').then((data) => {
            if (data === false) {
                window.location.href = '/';
            }
        });

        // Fetch all user IDs
        setLoading(true);
        getAllUserIds().then((data) => {
            if (data) {
                setUserIds(data);
            } else {
                console.log("Error fetching user IDs");
            }
            setLoading(false);
        });
    }, []);

    const handleForumClick = (forum) => {
        setSelectedForum(forum);
    };

    const handleRemoveForum = (event) => {
        const id = document.getElementById('id').value;

        // Delete the forum from the API
        try {
            if (id === '') {
                throw 'Forum not found!';
            }
            deleteForumById(id);
            alert('Forum removed!');
        } catch (e) {
            alert('Forum not found!');
        }

        setShowRemoveForumForm(false);

        event.preventDefault();
        window.location.reload();
    };

    const handleAddForum = (event) => {
        // This is the forum data object that will be sent to the API endpoint
        const forumObject = {
            forumCategory: category,
            forumName: document.getElementById('name').value,
            forumDescription: document.getElementById('description').value,
            imgUrl: document.getElementById('imgUrl').value,
        };

        // Create the forum in the API
        createForum(forumObject);

        alert('Forum added!');
        event.preventDefault();

        setShowAddForumForm(false);
        window.location.reload();
    };

    const handleAddShowForum = () => {
        setShowAddForumForm(true);
    };

    const handleCloseForm = () => {
        setShowAddForumForm(false);
        setShowRemoveForumForm(false);
    };

    const handleShowRemoveForum = () => {
        setShowRemoveForumForm(true);
    };

    const renderUtilityContent = () => {
        switch (selectedUtility) {
            case 'forumManagement':
                return (
                    <div>
                        {loading && <LoadingSpinner isLoading={loading} />}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1}>
                                    {!showAddForumForm && (
                                        <Button onClick={handleAddShowForum}>
                                            <AddIcon />
                                        </Button>
                                    )}
                                    {!showRemoveForumForm && (
                                        <Button onClick={handleShowRemoveForum}>
                                            <RemoveIcon />
                                        </Button>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid container spacing={2}>
                                {forumsData.map((forum) => (
                                    <Grid item xs={12} md={4} key={forum.id} style={{ marginLeft: '10px' }}>
                                        <div className="forum-list-wrapper" style={{ overflowWrap: 'break-word' }}>
                                            <ForumList forums={[forum]} onForumClick={handleForumClick} />
                                        </div>
                                    </Grid>
                                ))}
                                <Grid item xs={12} md={6}>
                                    {selectedForum && <ForumDetail forum={selectedForum} />}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                            {showAddForumForm && (
                                <Dialog open={true} onClose={handleCloseForm}>
                                    <Container maxWidth="page" style={{ padding: '20px', marginTop: '20px' }}>
                                        <h2>Add Forum</h2>
                                        <form>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <input type="text" id="name" placeholder="Name" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <input type="text" id="description" placeholder="Description" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <select
                                                        id="category"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    >
                                                        <option value="General">General</option>
                                                        <option value="Technology">Technology</option>
                                                        <option value="Science">Science</option>
                                                        <option value="Health">Health</option>
                                                        <option value="Business">Business</option>
                                                        <option value="Entertainment">Entertainment</option>
                                                        <option value="Sports">Sports</option>
                                                        <option value="Education">Education</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <input type="text" id="imgUrl" placeholder="Image URL (Optional)" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button onClick={handleAddForum}>Add Forum</Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Container>
                                </Dialog>
                            )}
                            {showRemoveForumForm && (
                                <Dialog open={true} onClose={handleCloseForm}>
                                    <Container maxWidth="page" style={{ padding: '20px', marginTop: '20px' }}>
                                        <h2>Remove Forum</h2>
                                        <Grid container spacing={1}>
                                            <ForumList forums={forumsData} onForumClick={handleForumClick} />
                                        </Grid>
                                        <form onSubmit={handleRemoveForum}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <input type="text" id="id" placeholder="ID" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button type="submit">Remove Forum</Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Container>
                                </Dialog>
                            )}
                        </Container>
                    </div>
                );
            case 'userManagement':
                return (
                    <div>
                        {loading && <LoadingSpinner isLoading={loading} />}
                        {userIds.map((userId) => (
                            <Paper key={userId} style={{ padding: '10px', marginBottom: '10px', alignContent: 'center' }}>
                            <UserProfile key={userId} userId={userId} size="small" />
                            <Button key={userId} variant="contained" color="secondary" onClick={() => deleteUserById(userId)}> Delete User </Button>
                            </Paper>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Click to Open a Utility
            </Typography>

            <GlassTopBar>
                    <Button
                        variant="text"
                        fullWidth
                        onClick={() => setSelectedUtility('forumManagement')}
                    >
                        Forum Management
                    </Button>
                    <Button
                        variant="text"
                        fullWidth
                        onClick={() => setSelectedUtility('userManagement')}
                    >
                        User Management
                    </Button>
            </GlassTopBar>
            <div style={{ marginTop: '20px' }}>{renderUtilityContent()}</div>
        </Container>
    );
};

export default AdminTools;
