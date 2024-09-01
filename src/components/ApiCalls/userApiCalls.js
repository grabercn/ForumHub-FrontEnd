import { apiCall } from './authentication';

/**
 * Creates a new user in the system.
 * @param {Object} userObject - The user object to be created.
 * @returns {Promise<Object|null>} - A promise that resolves to the created user data or null if there was an error.
 */
const createUser = async (userObject) => {
    const endpoint = `/users`;
    return await apiCall(endpoint, 'POST', userObject);
};

/**
 * Retrieves a user by their ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object|null>} - A promise that resolves to the user data or null if there was an error.
 */
const getUserById = async (userId) => {
    const endpoint = `/users/${userId}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Updates a user by their ID.
 * @param {number} userId - The ID of the user.
 * @param {Object} userObject - The updated user data.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated user data or null if there was an error.
 */
const updateUserById = async (userId, userObject) => {
    const endpoint = `/users/${userId}`;
    return await apiCall(endpoint, 'PUT', userObject);
};

/**
 * Deletes a user by their ID.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully deleted.
 */
const deleteUserById = async (userId) => {
    const endpoint = `/users/${userId}`;
    await apiCall(endpoint, 'DELETE');
};

/**
 * Checks if a username, email, or phone number is unique in the system.
 * @param {string} username - The username to check.
 * @param {string} email - The email to check.
 * @param {string} phoneNumber - The phone number to check.
 * @returns {Promise<Object|null>} - A promise that resolves to the uniqueness check result or null if there was an error.
 */
const checkUniqueUser = async (username, email, phoneNumber) => {
    const endpoint = `/users/check/${username}/${email}/${phoneNumber}`;
    return await apiCall(endpoint, 'GET');
};

/**
 * Retrieves all user IDs in the system.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of user IDs or null if there was an error.
 */
const getAllUserIds = async () => {
    const endpoint = `/users/ids`;
    return await apiCall(endpoint, 'GET');
};

// Export the functions to be used in other files
export {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    checkUniqueUser,
    getAllUserIds
};
