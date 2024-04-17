import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import AuthPage from './pages/AuthPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext'; // Adjust the import path as necessary
import { OrdersProvider } from './contexts/OrdersContext.jsx';



function App() {
  return (
    <OrdersProvider>
      <AuthProvider>
    <ThemeProvider theme={theme}>
   <BrowserRouter>
   <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faqs" element={<FAQPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="order" element={<OrderPage />} />
        {/* <Route path="ord" element={<MyOrdersPage />} /> */}

        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
    </OrdersProvider>
    
  );
}

export default App;
