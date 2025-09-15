import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// MODIFIKASI: Ganti localhost dengan IP lokal Anda
const API_BASE_URL = 'http://192.168.0.108:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_BASE_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        setCurrentUser(res.data.user);
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: error.response.data.message || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: error.response.data.message || 'Invalid email or password' };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    
    if (token && currentUser) {
      try {
        // 1. Kirim permintaan ke backend HANYA UNTUK MENCATAT log.
        // Kita mengirim token agar backend tahu siapa yang logout.
        await axios.post(`${API_BASE_URL}/logout`, {}, { // Body kosong
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        // Jika API gagal (misal: token kadaluwarsa, server mati), 
        // kita tetap logout pengguna di frontend. Jangan hentikan proses logout.
        console.error('Logout API call failed, logging out locally anyway:', error.response?.data?.message || error.message);
      }
    }
    
    // 2. Selalu bersihkan sisi klien (frontend) apa pun yang terjadi pada API.
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};