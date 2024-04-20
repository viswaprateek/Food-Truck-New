import React, { useState } from 'react';
import { Container, Box, Button, Typography, TextField, Paper, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    mobileno: '',
    emailid: '',
    password: '',
    isAdmin: 'Y',
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { isLoggedIn, setAuthStatus } = useAuth(); // Use the isLoggedIn state and setAuthStatus function from the context

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      let response;
      if (isLogin) {
        response = await axios.post('http://127.0.0.1:5000/auth/login', {
          emailid: formData.emailid,
          password: formData.password,
          isAdmin: 'Y',
        });
      } else {
        response = await axios.post('http://127.0.0.1:5000/auth/signup', {
          name: formData.name,
          mobileno: formData.mobileno,
          emailid: formData.emailid,
          password: formData.password,
          isAdmin: 'Y', // Always pass 'Y' for isAdmin in signup request
        });
      }
  
      // Log the response data to the console
      console.log(response.data);
  
      // Handle the response based on the message
      if (response.data.message === 'User created successfully' || response.data.success === 'Login successful') {
        // Update the authentication status to true
        setAuthStatus(true,formData.name);
        // Save the username if available

        // if (formData.name) {
          // auth.setUsername(formData.name);
        // }

        alert(`${response.data.message || response.data.success}\nNow redirecting you to menu...`);
        navigate('/menu');
      } else if (response.data.error === 'Email already exists') {
        alert(`${response.data.error}\nPlease use a different email id.`);
      } else if (response.data.error === 'Please enter correct email id/password combination') {
        alert(`${response.data.error}`);
      } else {
        alert('Uncaught error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    setAuthStatus(false); // Set isLoggedIn to false when logging out
    // Additional logout logic here (e.g., clearing local storage, redirecting, etc.)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography component="h1" variant="h5">
          {isLoggedIn ? 'Logout' : (isLogin ? 'Login' : 'Sign Up')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          {!isLoggedIn &&  (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
          )}
          {!isLogin && !isLoggedIn &&  (
            <TextField
              margin="normal"
              required
              fullWidth
              name="mobileno"
              label="Mobile Number"
              type="number"
              id="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
            />
          )}
          {!isLoggedIn &&  (
            <TextField
              margin="normal"
              required
              fullWidth
              id="emailid"
              label="Email Address"
              name="emailid"
              autoComplete="email"
              autoFocus
              value={formData.emailid}
              onChange={handleChange}
            />
          )}
          {!isLoggedIn &&  (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
          )}
          
          {!isLogin && !isLoggedIn &&  (
            <TextField
              margin="normal"
              required
              fullWidth
              name="isAdmin"
              label="isAdmin"
              type="text"
              id="isAdmin"
              value={formData.isAdmin}
              onChange={handleChange}
            />
          )}
          {!isLoggedIn && (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          )}
          
          {isLoggedIn && (
            <Button fullWidth variant="contained" color="error" onClick={handleLogout} sx={{ mb: 2 }}>
              Logout
            </Button>
          )}

          {!isLoggedIn && (
            <Grid container>
              <Grid item>
                <Button onClick={toggleForm} sx={{ textTransform: 'none' }}>
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign in'}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthPage;
