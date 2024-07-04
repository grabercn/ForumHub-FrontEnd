import React from 'react';
import { Container, Alert } from '@mui/material';
import { getAuthCookieValues, getUserDataCookieValues } from '../Objects/userData.object';
import { getUserByEmailAndPassword } from '../Helpers/authApiCalls';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { UpdateUserById } from '../Helpers/userApiCalls';

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
        
        UpdateUserById(getUserDataCookieValues().userId, {
            name: getUserDataCookieValues().username,
            email: getAuthCookieValues().userEmail,
            phoneNumber: userData.phoneNumber,
            password: getAuthCookieValues().userPassword,
        }).then((result) => {
            if (result) {
                setIsSaved(true);
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
                    </Grid>
                )}
                {isError && (
                    <Grid item>
                        <Alert severity="error">Error saving. Try again later.</Alert>
                    </Grid>
                )}
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <h1>Hello, {userData.name}</h1>
                        <h2>Your Profile</h2>
                    </Grid>
                    <Grid item>
                        {isEditing ? (
                            <>
                                <Grid item>
                                    <TextField label="Username" defaultValue={userData.username} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Role" defaultValue={userData.role} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Email" defaultValue={userData.email} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Phone" defaultValue={userData.phoneNumber} style={{ margin: '10px 0' }} />
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleSave} style={{ margin: '10px 0' }}>Save</Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item>
                                    <h2>Username: {getUserDataCookieValues().username}</h2>
                                </Grid>
                                <Grid item>
                                    <h2>Email: {getAuthCookieValues().userEmail}</h2>
                                </Grid>
                                <Grid item>
                                    <h2>Role: {getUserDataCookieValues().userType}</h2>
                                </Grid>
                                <Grid item>
                                    <h2>Email: {userData.email}</h2>
                                </Grid>
                                <Grid item>
                                    <h2>Phone: {userData.phoneNumber}</h2>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleEdit}>Edit</Button>
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
