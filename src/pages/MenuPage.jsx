import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton, Typography, Button } from '@mui/material';
import Cart from '../components/Cart'; // Adjust the path according to your structure
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useOrders } from '../contexts/OrdersContext'; // Import the OrdersContext hook
import axios from 'axios'; // Import axios for making API requests

const MenuPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // State to store menu items
  const [quantities, setQuantities] = useState({}); // State to store quantities
  const { addOrder } = useOrders();

  useEffect(() => {
    // Fetch menu items from the database
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/item/all');
        setMenuItems(response.data); // Set the fetched menu items to state
        // Initialize quantities for each item
        const initialQuantities = response.data.reduce((acc, item) => {
          acc[item.itemId] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleQuantityChange = (itemId, delta) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: Math.max(1, prevQuantities[itemId] + delta)
    }));
  };

  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  const handleAddToCart = (itemToAdd) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.itemId === itemToAdd.itemId);
      if (existingItemIndex > -1) {
        // If the item already exists in the cart, update its quantity
        const newCart = [...currentCart];
        newCart[existingItemIndex].quantity += quantities[itemToAdd.itemId];
        return newCart;
      } else {
        // If the item doesn't exist in the cart, add it with the specified quantity
        return [...currentCart, { ...itemToAdd, quantity: quantities[itemToAdd.itemId] }];
      }
    });
  };
  

  const handlePlaceOrder = () => {
    // addOrder(cart);
    setCart([]); 
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Button variant="outlined" onClick={handleCartToggle}>
        View Cart
      </Button>
      {menuItems.map((item) => (
        <Grid item key={item.itemId} xs={12} sm={6} md={4} lg={3}>
          <Card raised>
            <CardMedia
              component="img"
              height="140"
              image={item.pictureUrl}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="h6">

  {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'Invalid Price'}
</Typography>



              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                <IconButton onClick={() => handleQuantityChange(item.itemId, -1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography variant="h6" style={{ margin: '0 20px' }}>
                  {quantities[item.itemId]}
                </Typography>
                <IconButton onClick={() => handleQuantityChange(item.itemId, 1)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Cart open={isCartOpen} onClose={handleCartToggle} cartItems={cart} onPlaceOrder={handlePlaceOrder} />
    </Grid>
  );
};

export default MenuPage;
