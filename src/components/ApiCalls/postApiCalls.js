// Fetch all posts from the API

/**
 * Adds a new post to the API.
 * @param {Object} postObject - The post object to be added.
 */
const addPost = async (postObject) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/posts`;
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
    const url = `https://forumhubjavaservices.azurewebsites.net/api/posts/full/forum/${forumId}`;
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
    const url = `https://forumhubjavaservices.azurewebsites.net/api/posts/${postId}`;
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
    const url = 'https://forumhubjavaservices.azurewebsites.net/api/posts/popular';
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
    const url = `https://forumhubjavaservices.azurewebsites.net/api/posts/forum/${forumId}`;
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
    const url = `https://forumhubjavaservices.azurewebsites.net/api/posts/${postId}`;
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

const getReactionsByPostId = async (postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/reactions/${postId}`;
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

const addReactionByPostId = async (userId, postId, reactionType) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/reactions/${userId}/${postId}/${reactionType}`;
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

const getReactionScoreByPostId = async (postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/reactions/score/posts/${postId}`;
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

const removeReactionByPostId = async (userId, postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/reactions/${userId}/${postId}`;
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

// remove all reactions by post id
const removeAllReactionsByPostId = async (postId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/reactions/${postId}`;
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