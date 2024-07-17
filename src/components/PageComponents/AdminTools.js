import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Input, MenuItem, Select, InputLabel} from '@mui/material';
import ForumDetail from './ForumDetail';
import ForumList from './ForumList';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import { forumsData } from '../Objects/forumsData.objects';
import { createForum, getAllForums, deleteForumById } from '../ApiCalls/forumApiCalls';

/**
 * AdminTools component for managing forums.
 * @component
 */
const AdminTools = () => {

    var forums = forumsData;

    const [selectedForum, setSelectedForum] = useState(null);
    const [showAddForumForm, setShowAddForumForm] = useState(false);
    const [showRemoveForumForm, setShowRemoveForumForm] = useState(false);
    const [category, setCategory] = useState('');

    const handleForumClick = (forum) => {
        setSelectedForum(forum);
    };

    const handleRemoveForum = (event) => {
        const id = document.getElementById('id').value;

        //Delete the forum from the API
        try{
            if (id === '') {
                throw 'Forum not found!';
            }
            deleteForumById(id);
            alert('Forum removed!');
        }catch(e){
            alert('Forum not found!');
        }

        setShowRemoveForumForm(false);

        event.preventDefault();
        window.location.reload()
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

        forums = getAllForums();
        
        setShowAddForumForm(false);
        window.location.reload()
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
    }

    return (
        <div>
            <Container maxWidth='xs'>
            <Box
                p={2}
                my={0}
                display="ho"
                alignItems="top"
                gap={4}
            >
                <h1>Admin Tools</h1>
                <br />
                <h2>Forum Management</h2>
                <p>Click on a forum to view more details</p>
                <br />

                <Grid container spacing={2}>
                {/* Wrap the content in a Container component */}
                <Grid item xs={12}>
                        {!showAddForumForm && (
                            <Button onClick={handleAddShowForum}>
                                <AddIcon />
                                Add Forum
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {!showRemoveForumForm && (
                            <Button onClick={handleShowRemoveForum}>
                                <RemoveIcon />
                                Remove Forum
                            </Button>
                        )}
                    <Grid item xs={12}/>
                    </Grid>
                    
                <Grid container spacing={2}>
                    {forums.map((forum) => (
                        <Grid item xs={12} md={4} key={forum.id} style={{marginLeft: '10px'}}>
                            <div className="forum-list-wrapper" style={{ overflowWrap: 'break-word' }}>
                                {/* Include the ForumList component */}
                                <ForumList forums={[forum]} onForumClick={handleForumClick}/>
                            </div>
                        </Grid>
                    ))}
                    <Grid item xs={12} md={6}>
                        {selectedForum && <ForumDetail forum={selectedForum} />}
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
                                        <Input type="text" id="name" placeholder="Name" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Input type="text" id="description" placeholder="Description" />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <InputLabel>Category</InputLabel>
                                        <Select
                                        id="category"
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                        >
                                        <MenuItem value="General">General</MenuItem>
                                        <MenuItem value="Technology">Technology</MenuItem>
                                        <MenuItem value="Science">Science</MenuItem>
                                        <MenuItem value="Health">Health</MenuItem>
                                        <MenuItem value="Business">Business</MenuItem>
                                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                                        <MenuItem value="Sports">Sports</MenuItem>
                                        <MenuItem value="Education">Education</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </Grid> 
                                    <Grid item xs={12}>
                                    <Input type="text" id="imgUrl" placeholder="Image URL (Optional)" />
                                    </Grid>
                                    <br />
                                    <br />
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
                            <Container maxWidth="page" style={{ padding: '20px', marginTop: '20px'}}>
                                <h2>Remove Forum</h2>
                                <Grid container spacing={1}>
                                <ForumList forums={forums} onForumClick={handleForumClick}/>
                                </Grid>
                                <form onSubmit={handleRemoveForum}>
                                    <br />
                                    <Grid container spacing={1} >
                                        <Grid item xs={12}>
                                            <Input type="text" id="id" placeholder="ID" />
                                        </Grid>
                                        <Grid item xs={12}/>
                                        <Grid item xs={12}>
                                            <Button type="submit">Remove Forum</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        </Dialog>
                    )}
                </Container>

                {/* blank space */}
                    <Grid item xs={12}/>
                </Grid>
            </Box>
            </Container>
        </div>
    );
};

export default AdminTools;

