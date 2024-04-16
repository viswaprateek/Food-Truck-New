import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid } from '@mui/material';
import bgImage from '../assets/bg1.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Demo featured dishes data
const featuredDishes = [
  { 
    id: 1, 
    name: 'Cheeseburger', 
    imageUrl: 'https://via.placeholder.com/150', 
    description: 'A classic favorite with cheese, lettuce, and tomato.' 
  },
  { 
    id: 2, 
    name: 'Veggie Pizza', 
    imageUrl: 'https://via.placeholder.com/150', 
    description: 'Loaded with fresh vegetables on a crisp crust.' 
  },
  { 
    id: 3, 
    name: 'Grilled Chicken Salad', 
    imageUrl: 'https://via.placeholder.com/150', 
    description: 'Grilled chicken over fresh greens with a balsamic glaze.' 
  },
  // Add more dishes as needed
];

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handler for clicking the "View Menu" button
  const handleViewMenuClick = () => {
    navigate('/menu'); // Replace '/menu' with your menu page's route
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{ 
        height: 400, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundImage: `url(${bgImage})`, // Use template literals
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}>
        <Typography variant="h3" component="h1" sx={{ color: '#fff', textShadow: '1px 1px 2px black' }}>
          Delicious Meals on Wheels!
        </Typography>
      </Box>

      {/* About Snippet */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>About Us</Typography>
        <Typography>Discover the story behind our food truck and what makes us special. Serving you fresh and delicious meals on-the-go!</Typography>
      </Box>

      {/* Featured Menu Items */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>Featured Dishes</Typography>
        <Grid container spacing={2}>
          {featuredDishes.map((dish) => (
            <Grid item xs={12} sm={6} md={4} key={dish.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={dish.imageUrl}
                  alt={dish.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">{dish.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{dish.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>How It Works</Typography>
        <Typography>Ordering from us is easy! Just follow these simple steps: Choose your favorite dishes, place an order, and enjoy!</Typography>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Button 
          onClick={handleViewMenuClick} // Use the handler for the onClick event
          variant="contained" 
          color="primary" 
          size="large"
        >
          View Menu
        </Button>      </Box>
    </Box>
  );
};

export default HomePage;
