import { createContext, useContext, useEffect, useState } from "react";
import { getUserByToken } from "../api/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            getUserByToken(token).then((response) => {
              console.log(response);
                setUser(response.data[0]);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);
  
    const login = () => {
      const token = localStorage.getItem('token');
        if (token) {
            getUserByToken(token).then((response) => {
                console.log("respon ini",response);
                setUser(response.data[0]);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
            setIsLoggedIn(true);
        } else {
            setIsLoading(false);
        }
    }
    const logout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    };
  
    console.log("auth provider", isLoggedIn);
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, user }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => useContext(AuthContext);