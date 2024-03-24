// ErrorProvider.js
import React, { createContext, useState, useContext } from 'react';

// Create a context for managing errors
const ErrorContext = createContext();

// Custom hook to consume the error context
export const useError = () => useContext(ErrorContext);

// ErrorProvider component to manage the error state
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  // Function to clear the error
  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

