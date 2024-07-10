import { checkUserAuth, getUserByEmailAndPassword, getUserRole } from '../ApiCalls/authApiCalls.js';

//note: there is some ambiguity in the naming of cookies
// username and userName are two different types
// username is the username of the user
// userName is the name of the user

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
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

function setAuthCookieValues(email, password) {
    const userEmail = email;
    const userPassword = password;

    setCookie('email', userEmail, 0.1);
    setCookie('password', userPassword, 0.1);
}

//remove auth cookie values
function removeAuthCookieValues() {
    deleteCookie('email');
    deleteCookie('password');
    return true;
}

function setUserDataCookieValues(userType, userName, username, userId) {
    setCookie('userType', userType, 0.1);
    setCookie('userName', userName, 0.1);
    setCookie('username', username, 0.1);
    setCookie('userId', userId, 0.1);
}

function getUserDataCookieValues() {
    const userType = getCookie('userType');
    const userName = getCookie('userName');
    const username = getCookie('username');
    const userId = getCookie('userId');
    return { userType, userName, username, userId };
}

function removeUserDataCookieValues() {
    deleteCookie('userType');
    deleteCookie('userName');
    deleteCookie('username');
    deleteCookie('userId');
    return true;
}

function getAuthCookieValues() {
    const userEmail = getCookie('email');
    const userPassword = getCookie('password');
    return { userEmail, userPassword };
}

/**
 * Checks the user authentication cookie.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the user is authenticated or not.
 */
async function checkUserAuthCookie() {
    const { userEmail, userPassword } = getAuthCookieValues();
    return checkUserAuth(userEmail, userPassword)
        .then((userAuth) => {
            if (userAuth === true) {
                getUserByEmailAndPassword(userEmail, userPassword).then((user) => {
                    getUserRole(user.username).then((response) => {
                        if (response === 'admin') {
                            setUserDataCookieValues('admin', user.name, user.username, user.userId);
                        } else {
                            setUserDataCookieValues('user', user.name, user.username, user.userId);
                        }
                    }
                    )});
                setAuthCookieValues(userEmail, userPassword);
                return true;
            } else {
                //removeAuthCookieValues();
                return false;
            }
        });
}


// Function to check if the user is authenticated
function checkAuthLocal(userType) {
    return new Promise((resolve, reject) => {
        Promise.all([checkUserAuthCookie()])
            .then(([userAuth]) => {
                if (userAuth === true) {
                    if (userType === undefined) {
                        resolve(true);
                    }else{
                        const cookieValues = getUserDataCookieValues();
                        getUserRole(cookieValues.username).then((response) => {
                    
                            if (response === userType) {
                                resolve(true);
                            } else if (response === undefined || response === "") {
                                resolve('error getting user role');
                            } else {
                                //removeUserDataCookieValues();
                                //removeAuthCookieValues();
                                resolve(false);
                            }
                        
                        });
                    }
                } else {
                    removeAuthCookieValues();
                    removeUserDataCookieValues();
                    resolve(false);
                }
            })
            .catch((error) => {
                console.error('Error checking authentication:', error);
                resolve(false);
            });
    });
}

export {  checkAuthLocal, setAuthCookieValues, getAuthCookieValues, checkUserAuthCookie, removeAuthCookieValues, setUserDataCookieValues, getUserDataCookieValues, removeUserDataCookieValues, setCookie, deleteCookie, getCookie, checkCookie};