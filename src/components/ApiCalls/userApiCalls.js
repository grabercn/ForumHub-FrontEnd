import { apiCall } from './authentication';

/**
 * Creates a new user in the system.
 * @param {Object} userObject - The user object to be created.
 * @returns {Promise<Object|null>} - A promise that resolves to the created user data or null if there was an error.
 */
const createUser = async () => {
    const endpoint = `/users/create-session`;
    return await apiCall(endpoint, 'POST');
};

/**
 * Retrieves a user by their session token.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object|null>} - A promise that resolves to the user data or null if there was an error.
 */
const getUserBySessionToken = async (token) => {
    const endpoint = `/users/session/${token}`;
    return await apiCall(endpoint, 'GET');
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
    getUserBySessionToken,
    getUserById,
    getAllUserIds
};
