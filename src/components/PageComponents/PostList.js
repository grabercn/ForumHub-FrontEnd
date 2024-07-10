import React, { useEffect, useRef } from 'react';
import { addPost } from '../ApiCalls/postApiCalls';
import { Input, Button, TextField, Container, Paper, Typography, Box, Alert } from '@mui/material';
import { addComment, getAllCommentsByPostId, removeAllCommentsByPostId } from '../ApiCalls/commentApiCalls';
import { getPostsByForumId, removePost } from '../ApiCalls/postApiCalls';
import { checkAuthLocal, getUserDataCookieValues } from '../Objects/userData.object';
import { Select, FormControl, InputLabel } from '@mui/material';
import { PRIMARY_COLOR } from './Home';
import GlassTopBar from '../StyledComponents/GlassTopBar';


function PostList(props) {
    const { forum, userId, postId } = props;
    const forumId = forum.forumId;

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isLoggedin, setIsLoggedin] = React.useState(false);
    const [comments, setComments] = React.useState({});
    const [comment, setComment] = React.useState('');
    const [isCommentFormOpen, setIsCommentFormOpen] = React.useState(null);
    const [admin, setAdmin] = React.useState(false);
    const [sortMethod, setSortMethod] = React.useState('date');
    
    
    const sortedPosts = [...posts].sort((a, b) => {
        switch (sortMethod) {
            case 'subject':
                return a.postSubject.localeCompare(b.postSubject);
            case 'user':
                return a.userId.username.localeCompare(b.userId.username);
            case 'comments':
                return (comments[b.postId] || []).length - (comments[a.postId] || []).length;
            default:
                return new Date(b.postDate) - new Date(a.postDate);
        }
    });

    const postRefs = useRef({});

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleOpenCommentForm = (postId) => {
        setIsCommentFormOpen(postId);
    };

    const handleCommentChange = (event, postId) => {
        setComment(event.target.value);
    };

    const handleSortChange = (sortMethod) => {
        setSortMethod(sortMethod);
    };

    const handleRemovePost = (postId) => {
        removeAllCommentsByPostId(postId);
        removePost(postId);
        setPosts(posts.filter((post) => post.postId !== postId));
    };

    const handleSubmitComment = (event, postId) => {
        event.preventDefault();

        const newComment = {
            commentText: comment,
            postId: postId,
            userId: userId,
        };

        addComment(newComment).then(() => {
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), newComment],
            }));
        });

        setComment('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting post')

        const newPost = {
            postSubject: title,
            postText: content,
            forumId: forumId,
            userId: userId,
            postDate: new Date().toISOString(),
        };

        addPost(newPost).then((response) => {   
            //window.location.href = "/forums/"+forumId;
            setPosts([...posts, newPost]);
            setSortMethod('date');
            window.scrollTo(0, 0);
        });

        setTitle('');
        setContent('');
        setIsFormOpen(false);
    };

    useEffect(() => {
        checkAuthLocal().then((response) => {
            setIsLoggedin(response);
        });
        checkAuthLocal('admin').then((response) => {
            setAdmin(response);
        });
    }, []);

    useEffect(() => {
        getPostsByForumId(forumId).then((data) => {
            if (data) {
                setPosts(data);
                data.forEach((post) => {
                    getAllCommentsByPostId(post.postId).then((comments) => {
                        setComments((prevComments) => ({
                            ...prevComments,
                            [post.postId]: comments,
                        }));
                    });
                });
            } else {
                setPosts([]);
            }
        });
    }, [forumId, userId , postId]);

    useEffect(() => {
        if (postId && postRefs.current[postId]) {
            postRefs.current[postId].scrollIntoView({ behavior: 'smooth' });
        }
    }, [posts, postId]);

    return (
        <div>
            {isLoggedin && (
                <Typography variant="h3">Welcome, {getUserDataCookieValues().userName || 'Unknown'}</Typography>
            )}
            <Typography variant="h4">Posts:</Typography>
            <br />
            
            {/* Display a message if there are no posts */}
            {posts.length === 0 && (
                <Alert severity="info">No posts found. Be the first to post!</Alert>
            )}

            {/* Display a message if the user is not logged in */}
            {!isLoggedin && (
                <Alert severity="info">Please log in to post and comment</Alert>
            )}


            {/* Display the add post button if the user is logged in */}
            {isLoggedin && (
                <GlassTopBar>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="sort-select">Sort by</InputLabel>
                        <Select
                            native
                            value={sortMethod}
                            onChange={(event) => handleSortChange(event.target.value)}
                            label="Sort by"
                            inputProps={{
                                name: 'sort',
                                id: 'sort-select',
                            }}
                        >
                            <option value="date">Date</option>
                            <option value="subject">Subject</option>
                            <option value="user">User</option>
                            <option value="comments">Comments</option>
                        </Select>
                    </FormControl>
                    <Button
                        style={{ marginTop: '10px' }}
                        onClick={handleOpenForm}
                        variant="contained"
                        color="primary"
                    >
                        Add Post
                    </Button>
                </GlassTopBar>
            )}

            

            {/* Display the form to add a post */}
            {isFormOpen && (
                <Container style={{ marginTop: '20px' }}>
                    <Paper elevation={3} style={{ padding: '15px', borderRadius: '15px' }}>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Title"
                                fullWidth
                                style={{ marginBottom: '10px' }}
                            />
                            <TextField
                                value={content}
                                onChange={handleContentChange}
                                placeholder="Content"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                            />
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Container>
            )}

            {/* add space between open form and posts */}
            <div style={{ marginBottom: '20px' }}></div>


            {/* Display the posts (sorted by selection) */}
            {sortedPosts.map((post) => (
                <Container key={post.postId} style={{ marginBottom: '20px' }} ref={(el) => (postRefs.current[post.postId] = el)}>
                    <Paper elevation={3} style={{ padding: '15px', borderRadius: '15px' }}>
                        {isLoggedin && (Number(post.userId.userId) === Number(userId) || admin) && (
                            <Button
                                style={{ color: 'red', fontSize: '12px', float: 'right' }}
                                onClick={() => handleRemovePost(post.postId)}
                            >
                                Delete
                            </Button>
                        )}
                        <Typography variant="h5" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                            {post.postSubject}
                        </Typography>
                        <Typography variant="h12" style={{ fontStyle: 'italic' }}>
                            Posted by: {post.userId.username || 'Unknown'} {'('+new Date(post.postDate).toLocaleString()+')'}
                        </Typography>
                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                            {post.postText}
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="h8">Comments:</Typography>
                            {comments[post.postId] && comments[post.postId].length > 0 ? (
                                <ul style={{ paddingLeft: '20px', listStyleType: 'none', marginTop: '10px' }}>
                                    {comments[post.postId].map((comment) => (
                                        <li key={comment.commentId}>
                                            <Typography variant="body1">
                                                <strong>{comment.userId.username}:</strong> {comment.commentText}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography variant="body5" style={{ fontStyle: 'italic', paddingLeft: '20px' }}>
                                    No comments yet
                                </Typography>
                            )}
                            {isLoggedin && (
                                <div style={{ marginTop: '10px' }}>
                                    <Button
                                        onClick={() => handleOpenCommentForm(post.postId)}
                                        variant="outlined"
                                        style={{ marginTop: '10px' }}
                                    >
                                        Add Comment
                                    </Button>
                                </div>
                            )}
                            {isCommentFormOpen === post.postId && (
                                <form onSubmit={(event) => handleSubmitComment(event, post.postId)}>
                                    <Input
                                        type="text"
                                        value={comment}
                                        onChange={(event) => handleCommentChange(event, post.postId)}
                                        placeholder="Write a comment..."
                                        style={{ marginTop: '10px' }}
                                        fullWidth
                                    />
                                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                        Submit
                                    </Button>
                                </form>
                            )}
                        </Box>
                    </Paper>
                </Container>
            ))}
        </div>
    );
}

export default PostList;
