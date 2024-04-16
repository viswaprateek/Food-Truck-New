import React, { useState } from 'react';
import { Container, Box, Button, Typography, TextField, Paper, Grid, Tab, Tabs } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login();
    navigate('/menu'); // Redirect to the menu page after login
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // For example, send a request to your backend service
  };
  

  return (
// Continue from the return statement in AuthPage
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {!isLogin && (
            <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus />
          )}
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          {!isLogin && (
            <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" />
          )}
          <Button type="submit" onClick={handleLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={toggleForm} sx={{ textTransform: 'none' }}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign in'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthPage;
