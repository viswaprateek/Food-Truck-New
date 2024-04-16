// DeliveryForm.jsx

import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const DeliveryForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const deliveryDetails = {
      name: formData.get('name'),
      address: formData.get('address'),
      phone: formData.get('phone'),
    };
    onSubmit(deliveryDetails);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="Delivery Address"
        name="address"
        autoComplete="address"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone Number"
        name="phone"
        autoComplete="phone"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit Order
      </Button>
    </Box>
  );
};

export default DeliveryForm;
