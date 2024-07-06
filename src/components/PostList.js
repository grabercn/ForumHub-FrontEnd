import React from 'react';
import { addPost } from './Helpers/postApiCalls';
import { useEffect } from 'react';
import { getUserById } from './Helpers/userApiCalls';
import { Input, Button, TextField, Grid, Alert, Container, Paper } from '@mui/material';
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

        addComment(newComment);
        try{
            comments.push(newComment);
        }catch(e){
            setComments([newComment]);
        }
        
        setComment('');
        setComments(comments);
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

        // Call the addPost function from postApiCalls.js
        addPost(newPost);

        //set the posts state to include the new post
        setPosts([...posts, newPost]);
        setTitle('');
        setContent('');
    };

    //check auth status on load
    useEffect(() => {
        checkAuthLocal().then((response) => {
            if (response === true){
                setIsLoggedin(true);
            }else{
                setIsLoggedin(false);
            }
        });
        checkAuthLocal('admin').then((response) => {
            if (response === true){
                setAdmin(true);
            }else{
                setAdmin(false);
            }
        });
    }, []);

    // Get posts, comments, and user name on load
    useEffect(() => {
        getUserById(userId).then((data) => {
            if (!data) return;
            setUserName(data.username);
        });
        getPostsByForumId(forumId).then((data) => { // Get posts by forumId
            
            if (!data) {
                return alert("No posts found");
            }

            setPosts(data); // Set posts state
           
            data.forEach((post) => { // For each post
                
                // Get comments for each post
                getAllCommentsByPostId(post.postId).then((comments) => { // Get comments by postId
                    setComments((prevComments) => { // Set comments state
                        return { // Return the previous comments and add the new comments
                            ...prevComments,
                            [post.postId]: comments,
                        };
                    }); 
                });
            });
        });
    }, [comment, forumId, userId]);
    
    return (
        <div>
            {isLoggedin && <h2>Welcome, {getUserDataCookieValues().userName || 'Unknown'}</h2>}
            <h3>Posts:</h3>
                {/* posts render in here via mapping each post to a list item*/}
            {posts && (
                posts.map((post) => (
                <Container key={post.postId} style={{ justifyContent: 'center', display: 'inherit'}}>
                    <Paper style={{ border: '0.5px solid black', padding: '10px', marginBottom: '15px' }}>
                    
                    {/* display remove post button if user who created post is logged in */}
                    {isLoggedin && (Number(post.userId.userId) === Number(userId)) && <Button style={{color: 'red', fontSize: '12px', float: 'right' }} onClick={() => handleRemovePost(post.postId)}>Delete</Button>}
                    {/* display remove post button if user is admin using checkAuthLocal */}
                    {isLoggedin && admin && <Button style={{color: 'red', fontSize: '12px', float: 'right' }} onClick={() => handleRemovePost(post.postId)}>Delete</Button>}

                    <p style={{ fontSize: '12px', fontStyle: 'italic' }}>{post.userId.username || 'Unknown'}</p>
                    <h4 style={{ fontWeight: 'bold' }}>{post.postSubject} </h4>
                    <p style={{ fontSize: '12px' }}>Posted on: {new Date(post.postDate).toLocaleString()}</p>
                    <hr />
                    <p style={{ fontSize: '14px' }}>{post.postText}</p>

                    {/* Comments */}
                    <h5>Comments:</h5>
                    <ul>
                        {comments && comments[post.postId] && comments[post.postId].map((comment) => (
                            <li key={comment.commentId}>
                                {/* comments render in here via mapping each comment to a post*/ }
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <p>{comment.userId.username} : <i>{comment.commentText}</i></p>
                                    </Grid>
                                </Grid>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Add comment form */}
                    {isLoggedin && <Button onClick={() => handleOpenCommentForm(post.postId)}>Add Comment</Button>}
                    {isCommentFormOpen === post.postId && (
                        <div>
                        <form onSubmit={(event) => handleSubmitComment(event, post.postId)}>
                            <Input type="text" value={comment} onChange={(event) => handleCommentChange(event, post.postId)} placeholder="Comment" />
                            <Button type="submit">Submit</Button>
                        </form>
                        </div>
                    )}
                    </Paper>
                </Container>
                ))
            )}

            {/* Add new post */}
            {isLoggedin && <Button onClick={handleOpenForm}>Add Post</Button>}

            {/* Popup form */}
            {isFormOpen && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <Input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
                        <TextField value={content} onChange={handleContentChange} placeholder="Content" />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            )}
            
        </div>
    );
}

export default PostList;