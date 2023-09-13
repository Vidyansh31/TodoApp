import React, { useContext, createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  Login: (token: string) => void;
  Logout: () => void;
  isLoggedIn: () => boolean;
  getToken: () => string | null;
  token: string | null;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const [token, setToken] = useState<string | null>(null);

  const Login = (token: string) => {
    const userInfo = JSON.stringify({
      token,
    });

    localStorage.setItem('user', userInfo);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    setToken(null);

  };

  const isLoggedIn = () => {
    if (localStorage.getItem('user') === null) {
      return false;
    } else {
      return true;
    }
  };

  const getToken = () => {
    if (localStorage.getItem('user') === null) {
      return null;
    }
    const userInfo = JSON.parse(localStorage.getItem('user') as string);
    return userInfo.token;
  };

  return (
    <authContext.Provider value={{ Login, Logout, token, isLoggedIn, getToken }}>
      {props.children}
    </authContext.Provider>
  );
};

export const AuthContext = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContextProvider;
