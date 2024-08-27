import { authenticatedApiCall } from './authentication';

/**
 * Checks user authentication by making an API call to the server.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} - A promise that resolves to the authentication data or null if there was an error.
 */
async function checkUserAuth(email, password) {
  const endpoint = `/users/auth/${email},${password}`;
  return await authenticatedApiCall(endpoint, 'GET');
}

/**
 * Gets the user role by making an API call to the server.
 * @param {string} username - The username of the user.
 * @returns {Promise<string|null>} - A promise that resolves to the user role or null if there was an error.
 */
async function getUserRole(username) {
  const endpoint = `/users/role/${username}`;
  return await authenticatedApiCall(endpoint, 'GET');
}

/**
 * Gets the user by email and password by making an API call to the server.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} - A promise that resolves to the user data or null if there was an error.
 */
async function getUserByEmailAndPassword(email, password) {
  const endpoint = `/users/${email}/${password}`;
  return await authenticatedApiCall(endpoint, 'GET');
}

export { checkUserAuth, getUserByEmailAndPassword, getUserRole };
