// Fetch all posts from the API

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

// get all posts for a forum
const getPostsByForumId = async (forumId) => {
    const url = `https://forumhubjavaservices.azurewebsites.net/api/posts/forum/${forumId}`;
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

const getPopularPosts = async () => {
    const url = `http://forumhubjavaservices.azurewebsites.net/api/posts/popular`;
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
        console.error("Error retrieving popular posts:", error);
    }
}

// delete posts by forum id
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

// get post by id
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

//addPost(postObject);
//getAllPosts();
//getPostsByForumId(1);
//removePost(1);

export {removeAllPostsByForumId, addPost, removePost, getPostById, getPostsByForumId, getPopularPosts };
