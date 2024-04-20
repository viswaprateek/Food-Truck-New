import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material';
import { useOrders } from '../contexts/OrdersContext'; // Import the OrdersContext hook
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext hook
import AuthPage from '../pages/AuthPage'; // Adjust the path according to your structure

const Cart = ({ open, onClose, cartItems }) => {
  const handleClose = () => {
    onClose();
  };

  const { isLoggedIn } = useAuth(); // Use the useAuth hook
  const { addOrder } = useOrders(); // Access the addOrder function from OrdersContext

  const handlePlaceOrder = () => {
    // Calculate total amount
    const totalAmount = calculateTotal(cartItems);
  
    // Construct order object with all details including quantity
    const order = {
      items: cartItems.map(item => ({
        itemId: item.itemId,
        name: item.name,
        description: item.description,
        pictureUrl: item.pictureUrl,
        price: parseFloat(item.price), // Parse price as float
        quantity: item.quantity, 
        total: parseFloat(item.price) * item.quantity, // Calculate total before spreading
      })),
      total: totalAmount,
    };
  
    // Add order to orders
    addOrder(order);
    
    console.log('Order has been placed'); // Placeholder logic for placing an order
    onClose();
  };
  
  const calculateTotal = (items) => items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <List dense>
          {cartItems.map((item, index) => (
            <React.Fragment key={item.itemId}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} Price: $${(parseFloat(item.price) * item.quantity).toFixed(2)}`}
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
        {isLoggedIn ? (
          <Button onClick={handlePlaceOrder} color="primary">
            Place Order
          </Button>
        ) : (
          <AuthPage /> // You might need to adjust this depending on how your AuthPage is designed
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
