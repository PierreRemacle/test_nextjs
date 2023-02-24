import React, { useState, useEffect } from 'react';

const AuthenticatedComponent = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuth(true);
      }
    }, []);
  
    return isAuth ? <>{children}</> : null;
  };

export default AuthenticatedComponent;