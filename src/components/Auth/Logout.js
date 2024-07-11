// Login.js
// Login Page for both users and staff members
import React from 'react';
import { removeAuthCookieValues, removeUserDataCookieValues } from '../Objects/userData.object';
import { Container } from '@mui/material';

function Logout () {    
        return (
            <div>
                <Container>
                {/* Remove the auth cookie values and user data cookie values, then reload */}
                {removeAuthCookieValues() && removeUserDataCookieValues() ? (
                    console.log("User logged out successfully!"),
                    window.location.reload()
                ) : (alert("Error logging out, please try again later."))}
                
                </Container>
            </div>
        );
    }

export default Logout;
