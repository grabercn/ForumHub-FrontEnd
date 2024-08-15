// Login.js
// Login Page for both users and staff members
import React from 'react';
import { removeAuthCookieValues, removeUserDataCookieValues } from '../Objects/userData.object';
import { googleLogout } from '@react-oauth/google';

function Logout () {    
        return (
            <div>
                {/* Remove the auth cookie values and user data cookie values, then reload */}
                {removeAuthCookieValues() && removeUserDataCookieValues() && googleLogout ? (
                    console.log("User logged out successfully!"),
                    window.location.href = '/'
                ) : (alert("Error logging out, please try again later."))}
            </div>
        );
    }

export default Logout;
