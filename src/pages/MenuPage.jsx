import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton, Typography, Button } from '@mui/material';
import Cart from '../components/Cart'; // Adjust the path according to your structure
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useOrders } from '../contexts/OrdersContext'; // Import the OrdersContext hook

const menuItems = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'A juicy burger with cheese, lettuce, tomato, and our special sauce.',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    name: 'Spaghetti Carbonara',
    description: 'A delicious Spaghetti made of veggies, tomato, and onion.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    description: 'Classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil.',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  
  // Add more items as needed
];

const MenuPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [quantities, setQuantities] = useState(menuItems.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {}));
  const { addOrder } = useOrders();

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
      const existingItemIndex = currentCart.findIndex(item => item.id === itemToAdd.id);
      if (existingItemIndex > -1) {
        // Clone the cart to avoid mutating the state directly
        const newCart = [...currentCart];
        newCart[existingItemIndex].quantity += quantities[itemToAdd.id];
        return newCart;
      } else {
        return [...currentCart, { ...itemToAdd, quantity: quantities[itemToAdd.id] }];
      }
    });
    // addOrder(itemToAdd); 
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
        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
          <Card raised>
            <CardMedia
              component="img"
              height="140"
              image={item.imageUrl}
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
                ${item.price.toFixed(2)}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography variant="h6" style={{ margin: '0 20px' }}>
                  {quantities[item.id]}
                </Typography>
                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
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
