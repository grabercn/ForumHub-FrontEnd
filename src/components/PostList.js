import React from 'react';
import { addPost } from './Helpers/postApiCalls';
import { useEffect } from 'react';
import { getUserById } from './Helpers/userApiCalls';
import { Input, Button, TextField, Grid, Container, Paper, Typography, Box } from '@mui/material';
import { addComment, getAllCommentsByPostId, removeAllCommentsByPostId } from './Helpers/commentApiCalls';
import { getPostsByForumId, removePost  } from './Helpers/postApiCalls';
import { checkAuthLocal, getUserDataCookieValues } from './Objects/userData.object';

function PostList(props) {

    var forumId = props.forum.forumId;
    var userId = props.userId;

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [posts, setPosts] = React.useState();
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isLoggedin, setIsLoggedin] = React.useState(false);
    const [comments, setComments] = React.useState();
    const [comment, setComment] = React.useState('');
    const [isCommentFormOpen, setIsCommentFormOpen] = React.useState(null);
    const [UserName, setUserName] = React.useState('');
    const [admin, setAdmin] = React.useState(false);

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
            // Update comments state after adding new comment
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), newComment],
            }));
        });

        setComment('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPost = {
            postSubject: title,
            postText: content,
            forumId: forumId,
            userId: userId,
            postDate: new Date().toISOString(), // generated in backend so value here does not matter
        };

        addPost(newPost).then((response) => {
            // Update posts state after adding new post
            setPosts([...posts, response]);
        });

        setTitle('');
        setContent('');
    };

    // Check auth status on load
    useEffect(() => {
        checkAuthLocal().then((response) => {
            setIsLoggedin(response);
        });
        checkAuthLocal('admin').then((response) => {
            setAdmin(response);
        });
    }, []);

    // Get posts, comments, and user name on load
    useEffect(() => {
        getUserById(userId).then((data) => {
            if (data) {
                setUserName(data.username);
            }
        });
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
                console.log('No posts found');
            }
        });
    }, [forumId, userId]);

    return (
        <div>
            {isLoggedin && (
                <Typography variant="h3">Welcome, {getUserDataCookieValues().userName || 'Unknown'}</Typography>
            )}
            <Typography variant="h4">Posts:</Typography>
            <br />
            {posts && posts.map((post) => (
                <Container key={post.postId} style={{ marginBottom: '20px' }}>
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
                        {/* Comments section */}
                        <Box mt={2}>
                            <Typography variant="h8">Comments:</Typography>
                            {comments && comments[post.postId] && comments[post.postId].length > 0 ? (
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
            {isLoggedin && (
                <Button onClick={handleOpenForm} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Add Post
                </Button>
            )}
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
        </div>
    );
}

export default PostList;
