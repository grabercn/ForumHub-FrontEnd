import { authenticatedApiCall, apiCall } from './authentication';

/**
 * Adds a comment to the API.
 * @param {Object} postObject - The comment object to be added.
 * @returns {Promise<Object|null>} - A promise that resolves to the added comment data or null if there was an error.
 */
const addComment = async (postObject) => {
    const endpoint = `/comments`;
    return await apiCall(endpoint, 'POST', postObject);
};

/**
 * Retrieves all comments for a specific post from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of comments or null if there was an error.
 */
const getAllCommentsByPostId = async (postId) => {
    const endpoint = `/api/comments/post/${postId}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Removes a comment from the API.
 * @param {number} postId - The ID of the comment to be removed.
 * @returns {Promise<void>} - A promise that resolves when the comment is successfully removed.
 */
const removeComment = async (postId) => {
    const endpoint = `/comments/${postId}`;
    await apiCall(endpoint, 'DELETE');
};

/**
 * Removes all comments for a specific post from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of deleted comments or null if there was an error.
 */
const removeAllCommentsByPostId = async (postId) => {
    const endpoint = `/comments/post/${postId}`;
    return await apiCall(endpoint, 'DELETE');
};

export { getAllCommentsByPostId, removeAllCommentsByPostId, addComment, removeComment };
