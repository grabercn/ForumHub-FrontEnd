import { Container, Grid, Input, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { createUser, CheckUniqueUser } from '../ApiCalls/userApiCalls';
const { isEmail, isStrongPassword, isMobilePhone } = require('validator');

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [uniqueusername, setUniqueUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // Error states for form validation
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const verifyFormData = async (formData) => {
        // Reset all error states
        setNameError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setPassword2Error('');
        setPhoneNumberError('');

        var error = false;

        if (formData.userName.length === 0) {
            setNameError('Name cannot be empty.');
            error = true;
        }

        if (formData.uniqueusername.length === 0) {
            setUsernameError('Username cannot be empty.');
            error = true;
        } else {
            CheckUniqueUser(formData.uniqueusername, formData.email, formData.phoneNumber)
            .then((isUnique) => {
            if (isUnique[0]) {
                setUsernameError('Username is already taken.');
                error = true;
            }
            })
            .catch((error) => {
            console.log('Error checking username uniqueness:', error);
            });
        }

        if (!isEmail(formData.email)) {
            setEmailError('Invalid email format.');
            error = true;
        } else {
            CheckUniqueUser(formData.email)
            .then((isUnique) => {
            if (isUnique[1]) {
                setEmailError('Email is already taken.');
                error = true;
            }
            })
            .catch((error) => {
            setEmailError('Error checking email uniqueness.');
            });
        }

        if (!isStrongPassword(formData.password)) {
            setPasswordError('Invalid password format.');
            error = true;
        }

        if (formData.password !== formData.password2) {
            setPasswordError('Passwords do not match.');
            setPassword2Error('Passwords do not match.');
            error = true;
        }

        if (!isMobilePhone(formData.phoneNumber)) {
            setPhoneNumberError('Invalid phone number format.');
            error = true;
        } else {
            CheckUniqueUser(formData.phoneNumber)
            .then((isUnique) => {
            if (isUnique[2]) {
                setPhoneNumberError('Phone number is already taken.');
                error = true;
            }
            })
            .catch((error) => {
            setPhoneNumberError('Error checking phone number uniqueness.');
            });
        }

        return !error;
    };

    const handleCreateUser = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!(await verifyFormData({ userName, uniqueusername, email, password, password2, phoneNumber }))) {
            alert('Invalid form data.');
        } else {
            const userObject2 = {
                name: userName,
                username: uniqueusername,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                role: 'user' // Default role is user, is not able to be changed from the front end, so value here does not matter
            };

            try {
                const response = await createUser(userObject2);
                if (response === true) {
                    alert(`Created user with username: ${userName}.`);
                    window.location.reload();
                } else if (response === undefined) {
                    alert(`User already exists or format is incorrect.`);
                } else {
                    alert(`Error creating user.`);
                }
            } catch (error) {
                alert(`Error creating user.`);
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Box
                    width={500}
                    my={4}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                >
                    <h1>Sign Up</h1>
                    <form onSubmit={handleCreateUser}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField 
                                    value={userName} 
                                    helperText={nameError}
                                    error={!!nameError}
                                    onChange={(e) => setUserName(e.target.value)} 
                                    placeholder="Enter full name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    value={uniqueusername}
                                    helperText={usernameError}
                                    error={!!usernameError}
                                    onChange={(e) => setUniqueUsername(e.target.value)}
                                    placeholder="Enter username"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    value={email}
                                    helperText={emailError} 
                                    error={!!emailError}
                                    type="email" 
                                    placeholder="Enter email" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    value={password}
                                    helperText={passwordError} 
                                    error={!!passwordError}
                                    name="password"
                                    type="password" 
                                    placeholder="Enter password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Alert severity="info">Password Requirements:
                                    <ul>
                                        <li>At least 8 characters</li>
                                        <li>At least one uppercase letter</li>
                                        <li>At least one lowercase letter</li>
                                        <li>At least one special character</li>
                                        <li>At least one number</li>
                                    </ul>
                                </Alert>
                            </Grid>
                            <Grid item>
                                <TextField 
                                    value={password2}
                                    helperText={password2Error} 
                                    error={!!password2Error}
                                    type="password" 
                                    placeholder="Confirm password" 
                                    onChange={(e) => setPassword2(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    value={phoneNumber}
                                    helperText={phoneNumberError} 
                                    error={!!phoneNumberError}
                                    type="tel" 
                                    placeholder="Enter phone number" 
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">
                                    Create User
                                </Button>    
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
};

export default Signup;
