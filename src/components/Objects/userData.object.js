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

// Function to get a cookie value by name
function getCookie(name) {
    const cookieName = `${name}=`;
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// Function to check if a cookie exists
function checkCookie(name) {
    const cookieValue = getCookie(name);
    return cookieValue !== null;
}

export {setCookie, deleteCookie, getCookie, checkCookie};