import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => Cookies.get('jwt_token') || '');

  const saveToken = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken);
    setToken(jwtToken);
  };


  const clearToken = () => {
    Cookies.remove('jwt_token');
    setToken('');
  };

  const value = {
    clearToken,
    isAuthenticated: Boolean(token),
    saveToken,
    token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
