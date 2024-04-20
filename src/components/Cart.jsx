import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material';
import { useOrders } from '../contexts/OrdersContext'; // Import the OrdersContext hook
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext hook
import AuthPage from '../pages/AuthPage'; // Adjust the path according to your structure
import DeliveryForm from './DeliveryForm'; // Import the DeliveryForm component
import MockPaymentForm from './MockPaymentForm'; // Import the MockPaymentForm component
import axios from  'axios';

const Cart = ({ open, onClose, cartItems }) => {
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const handleClose = () => {
    onClose();
  };

  const { isLoggedIn, username } = useAuth(); // Use the useAuth hook to access username
  const { addOrder } = useOrders(); // Access the addOrder function from OrdersContext

  const handlePlaceOrder = async () => {
    try {
      setShowPaymentForm(true);
      const response = await axios.post('http://127.0.0.1:5000/order/create', {
        username: username, // Pass the username from the context
        orderstatus: 'I', // Set order status to 'In Process'
        paymentstatus: 'S', // Set payment status to 'Success'
        totalprice: calculateTotal(cartItems),
        items: cartItems.map(item => ({
          itemid: item.itemId,
          itemprice: parseFloat(item.price),
          itemquantity: item.quantity,
          itemdescription: item.name,
        })),
      });
      cartItems([]); // Empty the cart after placing order
      console.log(response.data.message); // Log the success message from the response
  
      // If you have additional logic for handling the response, you can add it here
  
      onClose(); // Close the dialog after placing the order
    } catch (error) {
      console.error('Error:', error);
      // Handle errors (e.g., display an error message)
    }
  };
  

  const handleDeliverySubmit = (deliveryDetails) => {
    // Handle delivery form submission
    setShowDeliveryForm(false); // Close the delivery form
    setShowPaymentForm(true); // Show the payment form
  };

  const handlePaymentSuccess = () => {
    // Handle payment success
    setShowPaymentForm(false); // Close the payment form

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
          <>
            <Button onClick={handlePlaceOrder} color="primary">
              Place Order
            </Button>
            <Dialog open={showDeliveryForm} onClose={() => setShowDeliveryForm(false)}>
              <DialogContent>
                <DeliveryForm onSubmit={handleDeliverySubmit} />
              </DialogContent>
            </Dialog>
            <Dialog open={showPaymentForm} onClose={() => setShowPaymentForm(false)}>
              <DialogContent>
                <MockPaymentForm onPaymentSuccess={handlePaymentSuccess} />
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <AuthPage /> // You might need to adjust this depending on how your AuthPage is designed
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
