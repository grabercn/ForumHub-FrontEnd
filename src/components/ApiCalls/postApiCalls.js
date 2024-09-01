import { apiCall } from './authentication';

/**
 * Adds a new post to the API.
 * @param {Object} postObject - The post object to be added.
 * @returns {Promise<Object|null>} - A promise that resolves to the added post data or null if there was an error.
 */
const addPost = async (postObject) => {
    const endpoint = `/posts`;
    return await apiCall(endpoint, 'POST', postObject);
};

/**
 * Retrieves all posts for a specific forum (full) including related Comments and Reactions from the API.
 * @param {number} forumId - The ID of the forum.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of posts with all related comments and reactions or null if there was an error.
 */
const getFullPostsByForumId = async (forumId) => {
    const endpoint = `/posts/full/forum/${forumId}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Removes a post from the API.
 * @param {number} postId - The ID of the post to be removed.
 * @returns {Promise<void>} - A promise that resolves when the post is successfully removed.
 */
const removePost = async (postId) => {
    const endpoint = `/posts/${postId}`;
    await apiCall(endpoint, 'DELETE');
};

/**
 * Retrieves popular posts from the API.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of popular posts or null if there was an error.
 */
const getPopularPosts = async () => {
    const endpoint = `/posts/popular`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Removes all posts for a specific forum from the API.
 * @param {number} forumId - The ID of the forum.
 * @returns {Promise<void>} - A promise that resolves when all posts are successfully removed.
 */
const removeAllPostsByForumId = async (forumId) => {
    const endpoint = `/posts/forum/${forumId}`;
    await apiCall(endpoint, 'DELETE');
};

/**
 * Retrieves a post by its ID from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Object|null>} - A promise that resolves to the post object or null if there was an error.
 */
const getPostById = async (postId) => {
    const endpoint = `/posts/${postId}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Retrieves reactions for a specific post from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of reactions for the post or null if there was an error.
 */
const getReactionsByPostId = async (postId) => {
    const endpoint = `/reactions/${postId}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Adds a reaction to a post by a specific user.
 * @param {number} userId - The ID of the user.
 * @param {number} postId - The ID of the post.
 * @param {string} reactionType - The type of reaction (e.g., 'like', 'dislike').
 * @returns {Promise<void>} - A promise that resolves when the reaction is successfully added.
 */
const addReactionByPostId = async (userId, postId, reactionType) => {
    const endpoint = `/reactions/${userId}/${postId}/${reactionType}`;
    await apiCall(endpoint, 'POST');
};

/**
 * Retrieves the reaction score for a specific post.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Object|null>} - A promise that resolves to the reaction score of the post or null if there was an error.
 */
const getReactionScoreByPostId = async (postId) => {
    const endpoint = `/reactions/score/posts/${postId}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Removes a reaction from a post by a specific user.
 * @param {number} userId - The ID of the user.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<void>} - A promise that resolves when the reaction is successfully removed.
 */
const removeReactionByPostId = async (userId, postId) => {
    const endpoint = `/reactions/${userId}/${postId}`;
    await apiCall(endpoint, 'DELETE');
};

/**
 * Removes all reactions for a specific post.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<void>} - A promise that resolves when all reactions are successfully removed.
 */
const removeAllReactionsByPostId = async (postId) => {
    const endpoint = `/reactions/${postId}`;
    await apiCall(endpoint, 'DELETE');
};

export {
    addPost,
    getFullPostsByForumId,
    removePost,
    getPopularPosts,
    removeAllPostsByForumId,
    getPostById,
    getReactionsByPostId,
    addReactionByPostId,
    getReactionScoreByPostId,
    removeReactionByPostId,
    removeAllReactionsByPostId,
};
