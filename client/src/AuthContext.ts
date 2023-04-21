import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (e) => {}
});

export default AuthContext;
