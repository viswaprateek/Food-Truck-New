import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the entire application and provide authentication functionality
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  // Function to set the authentication status when the user logs in or out
  const setAuthStatus = (status) => {
    setIsLoggedIn(status);
  };

  // Value object to be provided by the context
  const value = {
    isLoggedIn,
    setAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
