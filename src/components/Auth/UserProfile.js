import React from 'react';
import { Container, Alert, Paper } from '@mui/material';
import { getAuthCookieValues, getUserDataCookieValues, removeAuthCookieValues, removeUserDataCookieValues } from '../Objects/userData.object';
import { getUserByEmailAndPassword } from '../Helpers/authApiCalls';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { UpdateUserById } from '../Helpers/userApiCalls';
import Typography from '@mui/material/Typography';
import { Email, Phone, SupervisedUserCircle, AlternateEmail } from '@mui/icons-material';

const UserProfile = () => {
    const [userData, setUserData] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        const response = getUserByEmailAndPassword(getAuthCookieValues().userEmail, getAuthCookieValues().userPassword);
        response.then(data => {
            setUserData(data);
        });
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);

        const updatedUserData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phone').value,
        };
        
        UpdateUserById(getUserDataCookieValues().userId, {
            name: userData.name,
            email: updatedUserData.email,
            phoneNumber: updatedUserData.phoneNumber,
            password: userData.password,
            username: updatedUserData.username,
        }).then((result) => {
            if (result) {
                setIsSaved(true);
                updatedUserData.role = userData.role; // Keep the role the same for when page updates
                updatedUserData.name = userData.name; // Keep the name the same for when page updates
                setUserData(updatedUserData);
                removeAuthCookieValues();
                removeUserDataCookieValues();
                window.location.reload();
            } else {
                setIsError(true);
            }
        });
    };

    return (
        <div>
            <Container maxWidth="md">
                <br />
                {isSaved && (
                    <Grid item>
                        <Alert severity="success">Saved successfully!</Alert>
                        <br />
                    </Grid>
                )}
                {isError && (
                    <Grid item>
                        <Alert severity="error">Error saving. Try again later.</Alert>
                        <br />
                    </Grid>
                )}
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <center><Typography variant="h10">Hello, {userData.name}</Typography></center>
                        <center><Typography variant="h5">Your Profile</Typography></center>
                        <br />
                        <center >Change your account settings below...</center>
                        <hr />
                    </Grid>
                    <Grid item>
                        {isEditing ? (
                            <>
                                <Grid item>
                                    <TextField id='username' label="Username" defaultValue={userData.username} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <TextField id='email' label="Email" defaultValue={userData.email} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <TextField id='phone' label="Phone" defaultValue={userData.phoneNumber} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <center><Button onClick={handleSave} style={{ margin: '10px 0' }}>Save</Button></center>
                                </Grid>
                            </>
                        ) : (
                            <>
                                 <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <AlternateEmail style={{ marginRight: '5px' }} />
                                    {userData.username}
                                </Typography>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Email style={{ marginRight: '5px' }} />
                                    {userData.email}
                                </Typography>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <SupervisedUserCircle style={{ marginRight: '5px' }} />
                                    {userData.role}
                                </Typography>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Phone style={{ marginRight: '5px' }} />
                                    {userData.phoneNumber}
                                </Typography>
                                <Grid item>
                                    <br />
                                    <center><Button onClick={handleEdit}>Edit</Button></center>
                                </Grid>
                            </>
                        )}
                        <br />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default UserProfile;
