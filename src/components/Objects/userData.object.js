import { getUserBySessionToken } from "../ApiCalls/userApiCalls";

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    // set cookie secure to true if the website is using https and httpOnly to true to prevent access from javascript
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure=true;SameSite=Strict;`;
}

// delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Retrieves the value of a specified cookie or handles specific cases for `user_token` and `user_token_data`.
 *
 * This function processes cookies in three distinct ways:
 * 1. **Normal Cookie Data:** For any `name` other than `user_token` or `user_token_data`,
 *    it simply returns the cookie's value if it exists, or `null` if not found.
 * 2. **`user_token`:** Validates the token by calling `getUserBySessionToken`.
 *    - Returns the token value if the token is valid.
 *    - Returns `null` if the token is invalid or not found.
 * 3. **`user_token_data`:** Fetches and resolves user details using `getUserBySessionToken`.
 *    - Returns the user data object if the token is valid.
 *    - Returns `null` if the token is invalid or no user data is found.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {Promise<string | object | null>} A promise resolving to the cookie value, the token value, 
 *          user data, or `null` based on the specified case.
 */
function getCookie(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const cookieName = `${name}=`;

    for (const cookie of cookies) {
        if (cookie.startsWith(cookieName)) {
            const value = cookie.substring(cookieName.length);
            // Return the cookie value for cookie names
            return value;
        }
    }
    // Return null if no matching cookie is found
    return null;
}

// Function to check if a cookie exists
function checkCookie(name) {
    const cookieValue = getCookie(name);
    return cookieValue !== null;
}

export {setCookie, deleteCookie, getCookie, checkCookie};