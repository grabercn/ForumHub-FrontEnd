import { apiCall } from './authentication';

/**
 * Creates a new forum.
 * @param {Object} forumObject - The forum object to be created.
 * @returns {Promise<Object|null>} - A promise that resolves to the created forum data or null if there was an error.
 */
async function createForum(forumObject) {
    const endpoint = `/forums`;
    return await apiCall(endpoint, 'POST', forumObject);
}

/**
 * Retrieves all forums.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of forums or null if there was an error.
 */
async function getAllForums() {
    const endpoint = `/forums`;
    return await apiCall(endpoint, 'GET');
}

/**
 * Retrieves the most popular forums.
 * @returns {Promise<Array|null>} - A promise that resolves to an array of popular forums or null if there was an error.
 */
async function getPopularForums() {
    const endpoint = `/forums/popular`;
    return await apiCall(endpoint, 'GET');
}

/**
 * Retrieves a forum by its ID.
 * @param {number} forumId - The ID of the forum to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the forum data or null if there was an error.
 */
async function getForumById(forumId) {
    const endpoint = `/forums/${forumId}`;
    return await apiCall(endpoint, 'GET');
}

/**
 * Retrieves a forum by its name.
 * @param {string} forumName - The name of the forum to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the forum data or null if there was an error.
 */
async function getForumByName(forumName) {
    const endpoint = `/forums/search/${forumName}`;
    return await apiCall(endpoint, 'GET');
}

/**
 * Updates a forum by its ID.
 * @param {number} forumId - The ID of the forum to update.
 * @param {Object} forumObject - The forum object with updated data.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated forum data or null if there was an error.
 */
async function updateForumById(forumId, forumObject) {
    const endpoint = `/forums/${forumId}`;
    return await apiCall(endpoint, 'PUT', forumObject);
}

/**
 * Deletes a forum by its ID.
 * @param {number} forumId - The ID of the forum to delete.
 * @returns {Promise<Object|null>} - A promise that resolves to the deleted forum data or null if there was an error.
 */
async function deleteForumById(forumId) {
    const endpoint = `/forums/${forumId}`;
    return await apiCall(endpoint, 'DELETE');
}

/**
 * Retrieves the reaction score of a forum by its ID.
 * @param {number} forumId - The ID of the forum.
 * @returns {Promise<number|null>} - A promise that resolves to the reaction score or null if there was an error.
 */
async function getReactionScoreByForumId(forumId) {
    const endpoint = `/reactions/score/forums/${forumId}`;
    return await apiCall(endpoint, 'GET');
}

// Export the functions to be used in other files
export { createForum, getAllForums, getForumById, getForumByName, updateForumById, deleteForumById, getPopularForums, getReactionScoreByForumId };
