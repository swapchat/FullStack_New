import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth status

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode token to get user info
        setUser(decodedToken); // Set the user state with decoded data
        setIsAuthenticated(true); // Set authenticated status to true
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Set user data on login
    setIsAuthenticated(true); // Set authenticated status
    localStorage.setItem("authToken", userData.token); // Store token in localStorage
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
    setIsAuthenticated(false); // Clear authenticated status
    localStorage.removeItem("authToken"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
