// Import the BASE_URL constant
import BASE_URL from './baseUrl';

/**
 * Adds a new post to the API.
 * @param {Object} postObject - The post object to be added.
 */
const addPost = async (postObject) => {
    const url = `${BASE_URL}/posts`;
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
 * Retrieves all posts for a specific forum (full) including related Comments and Reactions from the API.
 * @param {number} forumId - The ID of the forum.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts with all related comments and reactions.
 */
const getFullPostsByForumId = async (forumId) => {
    const url = `${BASE_URL}/posts/full/forum/${forumId}`;
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
        console.error("Error retrieving posts:", error);
    }
}

/**
 * Removes a post from the API.
 * @param {number} postId - The ID of the post to be removed.
 */
const removePost = async (postId) => {
    const url = `${BASE_URL}/posts/${postId}`;
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
 * Retrieves popular posts from the API.
 * @returns {Promise<Array>} - A promise that resolves to an array of popular posts.
 */
async function getPopularPosts () {
    const url = `${BASE_URL}/posts/popular`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error retrieving popular posts:", error);
    }
}

/**
 * Removes all posts for a specific forum from the API.
 * @param {number} forumId - The ID of the forum.
 */
const removeAllPostsByForumId = async (forumId) => {
    const url = `${BASE_URL}/posts/forum/${forumId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error("Error deleting posts:", error);
    }
}

/**
 * Retrieves a post by its ID from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Object>} - A promise that resolves to the post object.
 */
const getPostById = async (postId) => {
    const url = `${BASE_URL}/posts/${postId}`;
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
        console.error("Error retrieving post:", error);
    }
}

/**
 * Retrieves reactions for a specific post from the API.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Array>} - A promise that resolves to an array of reactions for the post.
 */
const getReactionsByPostId = async (postId) => {
    const url = `${BASE_URL}/reactions/${postId}`;
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
        console.error("Error retrieving reactions:", error);
    }
}

/**
 * Adds a reaction to a post by a specific user.
 * @param {number} userId - The ID of the user.
 * @param {number} postId - The ID of the post.
 * @param {string} reactionType - The type of reaction (e.g., 'like', 'dislike').
 */
const addReactionByPostId = async (userId, postId, reactionType) => {
    const url = `${BASE_URL}/reactions/${userId}/${postId}/${reactionType}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error("Error adding reaction:", error);
    }
}

/**
 * Retrieves the reaction score for a specific post.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Object>} - A promise that resolves to the reaction score of the post.
 */
const getReactionScoreByPostId = async (postId) => {
    const url = `${BASE_URL}/reactions/score/posts/${postId}`;
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
        console.error("Error retrieving reaction score:", error);
    }
}

/**
 * Removes a reaction from a post by a specific user.
 * @param {number} userId - The ID of the user.
 * @param {number} postId - The ID of the post.
 */
const removeReactionByPostId = async (userId, postId) => {
    const url = `${BASE_URL}/reactions/${userId}/${postId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error("Error removing reaction:", error);
    }
}

/**
 * Removes all reactions for a specific post.
 * @param {number} postId - The ID of the post.
 */
const removeAllReactionsByPostId = async (postId) => {
    const url = `${BASE_URL}/reactions/${postId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
    }
    catch(error) {
        console.error("Error removing reactions:", error);
    }
}

export { removeAllPostsByForumId, addPost, removePost, getPostById, getFullPostsByForumId, getPopularPosts, 
         getReactionsByPostId, addReactionByPostId, getReactionScoreByPostId, 
         removeReactionByPostId, removeAllReactionsByPostId };
