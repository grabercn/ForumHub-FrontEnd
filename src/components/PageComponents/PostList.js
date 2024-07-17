import React, { useEffect, useRef } from 'react';
import { addPost } from '../ApiCalls/postApiCalls';
import { Input, Button, TextField, Container, Paper, Typography, Box, Alert, Pagination, Select, FormControl, InputLabel } from '@mui/material';
import { addComment, getAllCommentsByPostId, removeAllCommentsByPostId } from '../ApiCalls/commentApiCalls';
import { getPostsByForumId, removePost } from '../ApiCalls/postApiCalls';
import { checkAuthLocal, getUserDataCookieValues } from '../Objects/userData.object';
import GlassTopBar from '../StyledComponents/GlassTopBar';
import { isNightMode } from '../Objects/theme';
import { Link } from 'react-router-dom';
import ProfileIcon from '../StyledComponents/ProfileIcon';
import LoadingSpinner from '../StyledComponents/LoadingSpinner';

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
    const [isLoadingPosts, setIsLoadingPosts] = React.useState(true);

    // Function to format the date difference
    const formatDateDifference = (postDate) => {
        const currentDate = new Date();
        const datePosted = new Date(postDate);
        const currentUtcDate = new Date(currentDate.toUTCString());
        const postedUtcDate = new Date(datePosted.toUTCString());
        const differenceInSeconds = Math.abs(Math.floor((currentUtcDate - postedUtcDate) / 1000) + 14400);

        if (differenceInSeconds < 60) {
          return `now`;
        } else if (differenceInSeconds < 3600) {
          const minutes = Math.floor(differenceInSeconds / 60);
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (differenceInSeconds < 86400) {
          const hours = Math.floor(differenceInSeconds / 3600);
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (differenceInSeconds < 2592000) {
          const days = Math.floor(differenceInSeconds / 86400);
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (differenceInSeconds < 31536000) {
          const months = Math.floor(differenceInSeconds / 2592000);
          return `${months} month${months > 1 ? 's' : ''} ago`;
        } else {
          const years = Math.floor(differenceInSeconds / 31536000);
          return `${years} year${years > 1 ? 's' : ''} ago`;
        }
      };
    
    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1);
    const postsPerPage = 10; // Number of posts per page

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

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const postRefs = useRef({});

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
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
            postDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // account for timezone offset of server
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
        setIsLoadingPosts(true)
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
                setIsLoadingPosts(false)
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
            
            {/* Display a message if there are no posts */}
            {posts.length === 0 && isLoggedin && (
                <Alert style={{ marginTop: '20px' }} severity="info">No posts found. Be the first to post!</Alert>
            )}

            {/* Display a message if the user is not logged in */}
            {!isLoggedin && (
                <Alert style={{ marginTop: '20px' }} severity="info">Please log in to sort, post, and comment</Alert>
            )}

            <LoadingSpinner isLoading={isLoadingPosts}/>

            {/* Display the add post button if the user is logged in */}
            {isLoggedin && (
                <div style={{ marginTop: '20px' }}>
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
                </div>
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
                                inputProps={{ maxLength: 70 }}
                            />
                            <TextField
                                value={content}
                                onChange={handleContentChange}
                                placeholder="Content"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                inputProps={{ maxLength: 800 }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Typography variant="caption" color="textSecondary">
                                    {content.length}/800 characters
                                </Typography>
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </Container>
            )}

            {/* add space between open form and posts */}
            <div style={{ marginBottom: '20px' }}></div>


            {/* Display the posts (sorted by selection) */}
            {currentPosts.map((post) => (
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
                        
                        <Typography variant="h12">
                            <Link
                            style={{
                                textDecoration: "none",
                                color: isNightMode() ? 'lightblue' : 'navy',
                                display: "flex",
                                alignItems: "center",
                            }}
                            to={`/users/${post.userId.userId}`}
                            >
                            <ProfileIcon username={post.userId.username || 'Unknown'} size={20} />
                            <span style={{ marginLeft: "5px" }}>{post.userId.username || 'Unknown'}
                            {' (' + formatDateDifference(post.postDate) + ')'}
                            </span>
                            </Link>{' '}
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

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={Math.ceil(sortedPosts.length / postsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </div>
    );
}

export default PostList;
