
// File: auth.js
// This file contains helper functions for authentication API calls

/**
 * Checks user authentication by making an API call to the server.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} - A promise that resolves to the authentication data or null if there was an error.
 */
async function checkUserAuth(email, password) {
  const url = `https://forumhubjavaservices.azurewebsites.net/api/users/auth/${email},${password}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error authenticating:", error);
    return null;
  }
}

/**
 * Gets the user role by making an API call to the server.
 * @param {string} username - The username of the user.
 * @returns {Promise<string|null>} - A promise that resolves to the user role or null if there was an error.
 */
async function getUserRole(username) {
  const url = `https://forumhubjavaservices.azurewebsites.net/api/users/role/${username}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

/**
 * Gets the user by email and password by making an API call to the server.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} - A promise that resolves to the user data or null if there was an error.
 */
async function getUserByEmailAndPassword(email, password) {
  const url = `http://localhost:8080/api/users/${email}/${password}`;
  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error authenticating:", error);
  }
}

export { checkUserAuth, getUserByEmailAndPassword, getUserRole};
