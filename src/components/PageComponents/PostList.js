import React, { useEffect, useRef } from "react";
import {
  Input,
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Helmet } from 'react-helmet-async';
import {
  getFullPostsByForumId,
  addPost,
  removePost,
  addReactionByPostId,
  removeReactionByPostId,
} from "../ApiCalls/postApiCalls";
import {
  addComment,
  removeAllCommentsByPostId,
} from "../ApiCalls/commentApiCalls";
import { checkAuthLocal } from "../Objects/userData.object";
import GlassTopBar from "../StyledComponents/GlassTopBar";
import { isNightMode } from "../Objects/theme";
import { Link } from "react-router-dom";
import ProfileIcon from "../StyledComponents/ProfileIcon";
import LoadingSpinner from "../StyledComponents/LoadingSpinner";
import { getReactionsByPostId } from "../ApiCalls/postApiCalls";

function PostList(props) {
  const { forum, userId, postId } = props;
  const forumId = forum.forumId;

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [comments, setComments] = React.useState({});
  const [comment, setComment] = React.useState("");
  const [isCommentFormOpen, setIsCommentFormOpen] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  const [sortMethod, setSortMethod] = React.useState("date");
  const [isLoadingPosts, setIsLoadingPosts] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reactions, setReactions] = React.useState({});
  const [likeCount, setLikeCount] = React.useState({});
  const [likedUsers, setLikedUsers] = React.useState({});
  const postsPerPage = 10;

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortMethod) {
      case "subject":
        return a.postSubject.localeCompare(b.postSubject);
      case "comments":
        return (a.comments || []).length - (b.comments || []).length;
      case "likes":
        return (
          (b.reactions || []).filter(
            (reaction) => reaction.reactionType === "like"
          ).length -
          (a.reactions || []).filter(
            (reaction) => reaction.reactionType === "like"
          ).length
        );
      default:
        return new Date(b.postDate) - new Date(a.postDate);
    }
  });

  // Function to format the date difference
  const formatDateDifference = (postDate) => {
    const currentDate = new Date();
    const datePosted = new Date(postDate);
    const currentUtcDate = new Date(currentDate.toUTCString());
    const postedUtcDate = new Date(datePosted.toUTCString());
    const differenceInSeconds = Math.abs(
      Math.floor((currentUtcDate - postedUtcDate) / 1000) + 14400
    );

    if (differenceInSeconds < 60) {
      return `now`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 2592000) {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 31536000) {
      const months = Math.floor(differenceInSeconds / 2592000);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(differenceInSeconds / 31536000);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const postRefs = useRef({});

  const handleOpenForm = () => {
    setIsFormOpen(!isFormOpen);
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
    if (!isLoggedin) {
      return;
    }
    setIsCommentFormOpen(isCommentFormOpen === postId ? null : postId);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handleRemovePost = (postId) => {
    removeAllCommentsByPostId(postId);
    removePost(postId);
    setPosts(posts.filter((post) => post.postId !== postId));
  };

  const handleSubmitComment = (event, postId) => {
    event.preventDefault();

    console.log(postId);

    const newComment = {
      commentText: comment,
      postId: postId,
      userId: userId,
      commentDate: new Date().toISOString(),
    };

    addComment(newComment).then(() => {
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newComment],
      }));
    });
    refreshPosts();
    setComment("");
    setIsCommentFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      postSubject: title,
      postText: content,
      forumId: forumId,
      userId: userId,
      postDate: new Date().toISOString(),
    };

    addPost(newPost).then(() => {
      setPosts([...posts, newPost]);
      setSortMethod("date");
      window.scrollTo(0, 0);
    });

    setTitle("");
    setContent("");
    refreshPosts();
    setIsFormOpen(false);
  };

  const handleLikeReaction = async (postId) => {
    try {
      const reactions = await getReactionsByPostId(postId);
      const isLiked = reactions.some(
        (reaction) =>
          reaction.userId.userId === userId && reaction.reactionType === "like"
      );

      if (isLiked) {
        await removeReactionByPostId(userId, postId);
        setLikeCount((prevCount) => ({
          ...prevCount,
          [postId]: (prevCount[postId] || 0) - 1,
        }));
        refreshPosts();
      } else {
        await addReactionByPostId(userId, postId, 1);
        setLikeCount((prevCount) => ({
          ...prevCount,
          [postId]: (prevCount[postId] || 0) + 1,
        }));
        refreshPosts();
      }
    } catch (error) {
      console.error("Failed to update like reaction:", error);
    }
  };

  const refreshPosts = async () => {
    try {
      setIsLoadingPosts(true);

      // Fetch posts data
      const data = await getFullPostsByForumId(forumId);
      if (!data) {
        setPosts([]);
        setComments({});
        setLikeCount({});
        setLikedUsers({});
        setIsLoadingPosts(false);
        return;
      }

      // Extract and organize comments
      const commentsMap = {};
      const likedUsersMap = {}; // To store liked users for each post
      data.forEach((post) => {
        if (post.comments) {
          commentsMap[post.postId] = post.comments;
        }
        if (post.reactions) {
          likedUsersMap[post.postId] = post.reactions
            .filter((reaction) => reaction.reactionType === "like")
            .map((reaction) => reaction.userId);
        }
      });

      // set like count
      setLikeCount(
        data.reduce((acc, post) => {
          acc[post.postId] = (post.reactions || []).filter(
            (reaction) => reaction.reactionType === "like"
          ).length;
          return acc;
        }, {})
      );
      // Set posts, comments, and liked users
      setPosts(data);
      setComments(commentsMap);
      setLikedUsers(likedUsersMap); // Set liked users
    } catch (error) { // Catch any errors
      console.error("Failed to fetch posts:", error);
    } finally { // Finally, set loading to false
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    checkAuthLocal().then((response) => {
      setIsLoggedin(response);
    });
    checkAuthLocal("admin").then((response) => {
      setAdmin(response);
    });
  }, []);

  useEffect(() => {
    if (postId && postRefs.current[postId]) {
      postRefs.current[postId].scrollIntoView({ behavior: "smooth" });
    }
  }, [posts, postId]);

  useEffect(() => {
    refreshPosts();
  }, [forumId]);

  return (
    <div style={{marginBottom: "20px", marginTop: "20px"}}>
       <Helmet>
        <title>{`Posts in ${forum.name}`}</title>
        <meta name="description" content={`Browse posts in ${forum.forumName}.`} />
      </Helmet>
      {posts.length === 0 && (
        <div>
          <Alert severity="info">
            No posts found. Be the first! Click the "Add Post" button to create one.
          </Alert>
          <br />
          <center>
          <Button variant="contained" color="primary" onClick={handleOpenForm}> Add Post </Button>
          </center>
        </div>
      )}
      

      {isLoggedin && posts.length > 0 && (
        <GlassTopBar>
          <Button variant="contained" color="primary" onClick={handleOpenForm}>
            Add Post
          </Button>

          <FormControl sx={{ marginBottom: 2, minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select native value={sortMethod} onChange={handleSortChange}>
              <option value="date">Date</option>
              <option value="subject">Subject</option>
              <option value="comments">Comments</option>
              <option value="likes">Likes</option>
            </Select>
          </FormControl>
        </GlassTopBar>
      )}

      <br />

      {isFormOpen && (
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ marginBottom: 2, padding: 2 }}
        >
          <Typography variant="h6">Add Post</Typography>
          <Input
            style={{ marginBottom: "10px" }}
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Content"
            value={content}
            onChange={handleContentChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 1 }}
          >
            Submit
          </Button>
        </Paper>
      )}

      <Container>
        {isLoadingPosts && <LoadingSpinner isLoading={true} />}

        {currentPosts.map((post) => (
          <Paper
            key={post.postId}
            ref={(el) => (postRefs.current[post.postId] = el)}
            sx={{
              padding: 1.5,
              marginBottom: 2,
              backgroundColor: isNightMode() ? "grey.800" : "background.paper",
              color: isNightMode() ? "grey.200" : "text.primary",
            }}
          >
             <Helmet>
                <title>{post.postSubject}</title>
                <meta name="description" content={post.postText.substring(0, 150)} />
              </Helmet>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <ProfileIcon size={25} username={post.userId.username} imgUrl={post.userId.profilePicture} />
              <div style={{ width: "10px" }} />
              <Typography
                component={Link}
                to={`/users/${post.userId.userId}`}
                sx={{
                  color: isNightMode() ? "grey.200" : "text.primary",
                  textDecoration: "none",
                }}
              >
                {post.userId.username}
              </Typography>
              <Typography variant="caption" sx={{ marginLeft: 1 }}>
                {formatDateDifference(post.postDate)}
              </Typography>
                {(admin || (userId === post.userId.userId)) && (
                <div style={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleRemovePost(post.postId)}
                >
                  Remove
                </Button>
              </div>
              )}
            </Box>
            
            <Typography variant="h6">{post.postSubject}</Typography>
            <Typography variant="body1">{post.postText}</Typography>

            <Box display="flex" alignItems="center" marginBottom={1}>
              <IconButton
                color="primary"
                onClick={() => handleLikeReaction(post.postId)}
                disabled={!isLoggedin}
              >
                {reactions[post.postId]?.some(
                  (reaction) =>
                    reaction.userId === userId &&
                    reaction.reactionType === "like"
                ) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                {likeCount[post.postId] || 0}
              </Typography>
              <Box display="flex" alignItems="center">
                {likedUsers[post.postId]?.slice(0, 5).map((user) => (
                  <ProfileIcon
                    key={user.userId}
                    username={user.username}
                    imgUrl={post.userId.profilePicture}
                    size={15}
                    sx={{ marginLeft: 0.5 }}
                    component={Link}
                  />
                ))}
                {likedUsers[post.postId]?.length > 5 && (
                  <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                    +{likedUsers[post.postId].length - 5}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  color: "primary.main",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenCommentForm(post.postId)}
              >
                {comments[post.postId]?.length || 0} Comments
              </Typography>

              {comments[post.postId] &&
                comments[post.postId].map((comment) => (
                  <Paper
                    key={comment.commentId}
                    sx={{ padding: 1, marginBottom: 1 }}
                  >
                    <Box display="flex" alignItems="center" marginBottom={1}>
                      <ProfileIcon
                        size={20}
                        username={comment.userId.username}
                        imgUrl={post.userId.profilePicture}
                      />
                      <div style={{ width: "10px" }} />
                      <Typography
                        component={Link}
                        to={`/users/${comment.userId.userId}`}
                        sx={{
                          color: isNightMode() ? "grey.200" : "text.primary",
                          textDecoration: "none",
                        }}
                      >
                        {comment.userId.username}
                      </Typography>
                      <Typography variant="caption" sx={{ marginLeft: 1 }}>
                        {formatDateDifference(comment.commentDate)}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {comment.commentText}
                    </Typography>
                  </Paper>
                ))}

              {isCommentFormOpen === post.postId && (
                <Box
                  component="form"
                  onSubmit={(event) => handleSubmitComment(event, post.postId)}
                  sx={{ marginBottom: 2 }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Container>

      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
}

export default PostList;
