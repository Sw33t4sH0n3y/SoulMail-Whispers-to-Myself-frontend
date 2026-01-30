import { createContext, useState } from 'react';

const UserContext = createContext();

// Add the new getUserFromToken function
const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1])).payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    localStorage.removeItem('token');
    return null;
  }
};

function UserProvider({ children }) {
  // call getUserFromToken() to get our initial user state
  const [user, setUser] = useState(getUserFromToken());

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };