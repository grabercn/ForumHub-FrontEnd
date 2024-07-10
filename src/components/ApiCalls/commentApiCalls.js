// Fetch all comments from the API

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

// remove all commenets by post id
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

//addComment(commentObject);
//getAllComments();
//removeComment(1);

export { getAllCommentsByPostId, removeAllCommentsByPostId,addComment, removeComment };
