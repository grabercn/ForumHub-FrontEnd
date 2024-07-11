// Fetch all comments from the API

/**
 * Adds a comment to the API.
 * @param {Object} postObject - The comment object to be added.
 */
const addComment = async (postObject) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/comments`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
    }
    catch(error) {
        console.error("Error adding post:", error);
    }
}

/**
 * Retrieves all comments for a specific post from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Array} - An array of comments.
 */
const getAllCommentsByPostId = async (postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/comments/post/${postId}`;
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error retrieving comments:", error);
    }
}

/**
 * Removes a comment from the API.
 * @param {number} postId - The ID of the comment to be removed.
 */
const removeComment = async (postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/comments/${postId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error("Error deleting post:", error);
    }
}

/**
 * Removes all comments for a specific post from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Array} - An array of deleted comments.
 */
const removeAllCommentsByPostId = async (postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/comments/post/${postId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error deleting comments:", error);
    }
}

export { getAllCommentsByPostId, removeAllCommentsByPostId, addComment, removeComment };
