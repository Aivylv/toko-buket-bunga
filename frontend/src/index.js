import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app'; // Pastikan huruf kapital 'A' di App.js
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);