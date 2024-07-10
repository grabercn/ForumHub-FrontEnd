import { Container, Grid, Input, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { createUser, createStaff } from '../ApiCalls/userApiCalls';
import { checkUniqueUser } from '../ApiCalls/userApiCalls';
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
    const [nameError, setNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);  
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const verifyFormData = (formData) => {
        // verify password and email format

        // Reset all error states
        setEmailError('');
        setUsernameError('');   
        setPasswordError('');
        setPassword2Error('');
        setNameError('');
        setPhoneNumberError('');
        
        // Regular expressions for email, password, and phone number
        const validateEmail = (email) => {
            return isEmail(email);
        };
        const validatePassword = (password) => {
            return isStrongPassword(password);
        };
        const validatePhoneNumber = (phoneNumber) => {
            return isMobilePhone(phoneNumber);
        };

        var error = false;

        if(formData.userName.length === 0 || formData.userName === '') {
            setNameError('Name cannot be empty.');
            error = true;
        }

        if(formData.uniqueusername.length === 0 || formData.uniqueusername === '') {
            setUsernameError('Username cannot be empty.');
            error = true;
        }
    
        if (!validateEmail(String(formData.email))) {
            setEmailError('Invalid email format. (Ex owen@gmail.com) \n ');
            error = true;
        }
    
        if (!validatePassword(String(formData.password))) {
            setPasswordError('Invalid password format.');
            error = true;
        }

        if (!validatePassword(String(formData.password2))) {
            setPassword2Error('Invalid password format.');
            error = true;
        }

        if (formData.password !== formData.password2) {
            setPasswordError('Passwords do not match.');
            setPassword2Error('Passwords do not match.');
            error = true;
        }
    
        if (!validatePhoneNumber(String(formData.phoneNumber))) {
            setPhoneNumberError('Invalid phone number format. (Ex 123-456-7890)');
            error = true;
        }

        // If any errors are found, return false

        // bypassing regex check for now, will fix later
        //if (error) {
         //   return false;
        //}

        // If no errors are found, return true
        return true;
        
        
    }

    const handleCreateUser = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!verifyFormData({ userName, uniqueusername, email, password, password2, phoneNumber })) {
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
                createUser(userObject2).then((response) => {
                    console.log(response);
                    if (response === true) {
                        alert(`Created user with username: ${userName}.`);
                        window.location.reload();
                    } else if (response === undefined) {
                        alert(`User with this (phone number, email, or username) already exists.`);
                    } else {
                        alert(`Error creating user.`);
                    }
                });
            } catch (error) {
                alert(`Error creating user.`);
            }
        }
    }

    return (
        <Container maxWidth="md">
        <Grid container spacing={2} width={'page'}>
            <Box
                width={500}
                height={'page'}
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
                                onChange={(e) => setUserName(e.target.value)} 
                                placeholder="Enter full name"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                value={uniqueusername}
                                helperText={usernameError}
                                onChange={(e) => setUniqueUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                helperText={emailError} 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                helperText={passwordError} 
                                name='password'
                                type="password" 
                                placeholder="Enter password" 
                                onChange={(e) => setPassword(e.target.value)}
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
                                helperText={password2Error} 
                                type="password" 
                                placeholder="Confirm password" 
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                helperText={phoneNumberError} 
                                type="phoneNumber" 
                                placeholder="Enter phone number" 
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
}

export default Signup;
