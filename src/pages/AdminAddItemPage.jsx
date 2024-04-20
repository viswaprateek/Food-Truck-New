import React, { useState } from 'react';
import { Container, Box, Button, Typography, TextField, Paper } from '@mui/material';
import { axiosWithToken } from './axiosWithToken';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

function AdminAddItemPage() {
  const { isLoggedIn } = useAuth(); // Get the isLoggedIn state from the context

  const [formData, setFormData] = useState({
    description: '',
    name: '',
    pictureUrl: '',
    price: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosWithToken.post('http://127.0.0.1:5000/item/create', formData);
      alert(response.data.message); // Display success message
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Display error message
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Container component="main" maxWidth="xs">
          <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Typography component="h1" variant="h5">
              Add New Item
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={formData.description}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="pictureUrl"
                label="Picture URL"
                name="pictureUrl"
                autoComplete="url"
                value={formData.pictureUrl}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                value={formData.price}
                onChange={handleChange}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create Item
              </Button>
            </Box>
          </Paper>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 8, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Oops! Please log in.
            </Typography>
            <Button variant="contained" color="primary" href="/login">
              Log In
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
}

export default AdminAddItemPage;
