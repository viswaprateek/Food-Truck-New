import React from 'react';
import { Dialog, DialogTitle, DialogContent,DialogActions, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material';
import AuthPage from '../pages/AuthPage'; // Adjust the path according to your structure
import PlaceOrder from './PlaceOrder';
import { useAuth } from '../contexts/AuthContext'; 

const Cart = ({ open, onClose, cartItems }) => {
  const handleClose = () => {
    onClose();
  };

  const { isAuthenticated } = useAuth();
  const handlePlaceOrder = () => {
    // Placeholder logic for placing an order
    console.log('Order has been placed');
    onClose();
  };
  const calculateTotal = (items) => items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <List dense>
          {cartItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} Price: $${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            </React.Fragment>
          ))}
          <Divider />
          <ListItem>
            <Typography variant="h6">Total: ${calculateTotal(cartItems)}</Typography>
          </ListItem>
        </List>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogContent>
      <DialogActions>
        {isAuthenticated ? (
          <PlaceOrder onPlaceOrder={handlePlaceOrder} />
        ) : (
          <AuthPage /> // You might need to adjust this depending on how your AuthPage is designed
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
