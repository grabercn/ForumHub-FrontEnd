import BASE_URL from "./baseUrl";

async function createUser(userObject) {
    const url = `${BASE_URL}/users`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject) // Body expects JSON string
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

// find a user by id
async function getUserById(userId) {
    // Construct the URL with the userId variable
    const url = `${BASE_URL}/users/${userId}`;
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
        console.error("Error retrieving user:", error);
    }
}

async function UpdateUserById(userId, userObject) {
    // Construct the URL with the userId variable
    const url = `${BASE_URL}/users/${userId}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject) // Body expects JSON string
        });

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error updating user:", error);
    }
}

// delete a user by id
async function deleteUserById(userId) {
    // Construct the URL with the userId variable
    const url = `${BASE_URL}/users/${userId}`;
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
        console.error("Error deleting user:", error);
    }
}

async function CheckUniqueUser(username, email, phoneNumber) {
    const url = `${BASE_URL}/users/check/${username}/${email}/${phoneNumber}`;
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
        console.error("Error creating user:", error);
    }
}

async function getAllUserIds() {
    const url = `${BASE_URL}/users/ids`;
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
        console.error("Error creating user:", error);
    }
}



// Export the functions to be used in other files
export { createUser, getUserById, UpdateUserById, CheckUniqueUser, getAllUserIds, deleteUserById };

//createUser(userObject);
//getUserById(1);
//getStaffById(2);
//getUserById(1);

//createStaff(staffObject);
