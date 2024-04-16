import React, { useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, TextField } from '@mui/material';

const MockPaymentForm = ({ onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate a payment success scenario
    console.log(`Simulating payment with ${paymentMethod} method`); // Log the selected payment method for demo purposes
    onPaymentSuccess(); // Indicate payment success
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Mock Payment Gateway
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <RadioGroup
          aria-label="payment method"
          name="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
        </RadioGroup>
      </FormControl>
      {/* Display fields for card details */}
      <Typography variant="body1" sx={{ mb: 1 }}>Enter Card Details (demo, do not enter real information):</Typography>
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder="Card Number" 
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ 
          maxLength: 19,
          "aria-label": "Card number"
        }} 
      />
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder="MM/YY" 
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ 
          maxLength: 5,
          "aria-label": "Expiration date"
        }} 
      />
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder="CVV" 
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ 
          maxLength: 4,
          "aria-label": "CVV"
        }} 
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Pay Now
      </Button>
    </Box>
  );
};

export default MockPaymentForm;
