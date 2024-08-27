import BASE_URL from './baseUrl';
import {getAuthCookieValues} from "../Objects/userData.object";

// Get JWT token by user authentication
async function getJwtToken(email, password) {
  const url = `${BASE_URL}/authenticate`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error authenticating:", error);
    return null;
  }
}

// Save JWT token to local storage as local session
function saveJwtToken(token) {
  localStorage.setItem('jwtToken', token, { expires: 1 });
}

// Delete JWT token by user logout
function deleteJwtToken() {
  localStorage.removeItem('jwtToken');
}

// Retrieve the JWT token from localStorage
function getStoredJwtToken() {
  return localStorage.getItem('jwtToken');
}

// Function to automatically get or retrieve the token, and then perform the API call
async function authenticatedApiCall(endpoint, method = 'GET', body = null) {
  let token = getStoredJwtToken();

  // If token doesn't exist, prompt the user to log in or retrieve it programmatically
  if (!token) {
    const authData = getAuthCookieValues(); // Replace with your logic
    
    const email = authData.email;
    const password = authData.password;

    token = await getJwtToken(email, password);

    if (token) {
      saveJwtToken(token);  // Save the newly retrieved token
    } else {
      console.log("Authentication failed. No token obtained.");
    }
  }

  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
}

export { getJwtToken, saveJwtToken, deleteJwtToken, authenticatedApiCall, getStoredJwtToken };  
