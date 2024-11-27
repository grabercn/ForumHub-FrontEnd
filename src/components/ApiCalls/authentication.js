import BASE_URL from './baseUrl';

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

// Function to call without a token
async function apiCall(endpoint, method = 'GET', body = null) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
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

export { getJwtToken, saveJwtToken, deleteJwtToken, getStoredJwtToken, apiCall };  
