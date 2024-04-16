import React, { createContext, useContext, useState } from 'react';
import App from '../App';
// Create the OrdersContext
const OrdersContext = createContext();

// Custom hook to consume the OrdersContext
export const useOrders = () => useContext(OrdersContext);

// OrdersProvider component to provide the context value
export const OrdersProvider = ({ children }) => {
  // State to store the orders
  const [orders, setOrders] = useState([]);

  // Function to add an order
  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  // Value provided by the OrdersContext
  const value = {
    orders,
    addOrder,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
      {/* <App /> */}
    </OrdersContext.Provider>
  );
};
