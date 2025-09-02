import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulasi database users
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Admin', 
      email: 'admin@florist.com', 
      password: 'admin123', 
      role: 'admin', 
      joinDate: '2023-01-01', 
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Budi Santoso', 
      email: 'budi@email.com', 
      password: 'budi123', 
      role: 'admin', 
      joinDate: '2023-09-05', 
      status: 'active' 
    }
  ]);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      // Auto login after register
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    users
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};