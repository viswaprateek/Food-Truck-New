import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the entire application and provide authentication functionality
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
  const [username, setUsername] = useState(''); // State to track the username

  // Function to set the authentication status when the user logs in or out
  const setAuthStatus = (status, name = '') => {
    setIsLoggedIn(status);
    setUsername(name);
  };

  // Value object to be provided by the context
  const value = {
    isLoggedIn,
    username,
    setAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
