
// File: auth.js
// This file contains helper functions for authentication API calls

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

//get user role by username
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

// get user id by email and password
async function getUserByEmailAndPassword(email, password) {
  const url = `https://forumhubjavaservices.azurewebsites.net/api/users/${email}/${password}`;
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
