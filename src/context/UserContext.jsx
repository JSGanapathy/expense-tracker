/*
 * File         : UserContext.jsx
 * Author       : Ganapathy
 * Description  : UserContext provides global state management for user data in the Expense Tracker application.
 *               It allows components to access and update user information throughout the application.
 */

// Import necessary modules
import { createContext, useState } from "react";
// Import React for creating context and managing state
export const UserContext = createContext();

// Create a UserProvider component to manage user state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //   Function to update user data (e.g., after login or profile update)
  const updateUser = (userData) => {
    setUser(userData?.user);
  };

  //   Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// Export the UserProvider component
export default UserProvider;
