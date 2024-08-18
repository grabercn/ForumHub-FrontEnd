import BASE_URL from "./baseUrl";

async function createForum(forumObject) {
    const url = `${BASE_URL}/forums`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(forumObject) // Body expects JSON string
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
    }
    catch(error) {
        console.error("Error creating forum:", error);
    }
}

async function getAllForums() {
    const url = `${BASE_URL}/forums`;
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
        console.error("Error retrieving forums:", error);
    }
}

async function getPopularForums () {
    const url = `${BASE_URL}/forums/popular`;
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
        console.error("Error retrieving popular forums:", error);
    }
}

async function getForumById(forumId) {
    // Construct the URL with the forumId variable
    const url = `${BASE_URL}/forums/${forumId}`;
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
        console.error("Error retrieving forum:", error);
    }
}

async function getForumByName(forumName) {
    // Construct the URL with the forumName variable
    const url = `${BASE_URL}/forums/search/${forumName}`;
    try {
        const response = await fetch(url, {
        method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.error("Error retrieving forum:", error);
    }
}

// Parameters on updateForum() explained:
// forumId: the forumId we're updating with new data (via PUT request)
// forumObject: the JavaScript object representing new data we're putting in place of the old data
async function updateForumById(forumId, forumObject) {
    // Changing the forumObject being PUT/updated
    forumObject = {
        category: 'shirt',
        forumName: 'Forum 2',
        brand: 'Brand Y',
        size: 'Medium',
        description: 'This is forum 2',
        price: 40.00
    }
    // Construct the URL with the forumId variable
    const url = `${BASE_URL}/forums/${forumId}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(forumObject) // Body expects JSON string
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
        const data = await response.json();
    }
    catch(error) {
        console.error("Error updating forum:", error);
    }
}

async function deleteForumById(forumId) {
    // Construct the URL with the forumId variable
    const url = `${BASE_URL}/forums/${forumId}`;
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
        console.error("Error deleting forum:", error);
    }
}

// get the reaction score of a forum by forumid
async function getReactionScoreByForumId(forumId) {
    // Construct the URL with the forumId variable
    const url = `${BASE_URL}/reactions/score/forums/${forumId}`;
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
        console.error("Error getting forum reaction score:", error);
    }
}  

// Export the functions to be used in other files
export { createForum, getAllForums, getForumById, getForumByName, updateForumById, deleteForumById, getPopularForums, getReactionScoreByForumId };