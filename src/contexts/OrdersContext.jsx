import React, { createContext, useContext, useState } from 'react';

// Create the context
const OrdersContext = createContext();

// Create a custom hook to consume the context
export const useOrders = () => useContext(OrdersContext);

// Create the provider component
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
    </OrdersContext.Provider>
  );
};
