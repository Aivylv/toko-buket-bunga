import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          FLORIST.
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          
          {/* Menu Utama Berdasarkan Peran */}
          {currentUser && currentUser.role === 'admin' ? (
            <Link to="/admin" className="nav-link" onClick={closeMenu}>
              Admin Panel
            </Link>
          ) : (
            <>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/products" className="nav-link" onClick={closeMenu}>
                Products
              </Link>
            </>
          )}

          {/* Menu Khusus untuk Buyer yang sudah Login */}
          {currentUser && currentUser.role === 'buyer' && (
            <>
              <Link to="/cart" className="nav-link" onClick={closeMenu}>
                Cart
              </Link>
              <Link to="/my-orders" className="nav-link" onClick={closeMenu}>
                Order History
              </Link>
            </>
          )}
          
          {/* Info Login/Logout */}
          {currentUser ? (
            <div className="nav-user">
              <span>Hello, {currentUser.name || 'User'}</span>
              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </div>
          ) : (
            ! (currentUser && currentUser.role === 'admin') && (
              <Link to="/login" className="nav-link" onClick={closeMenu}>
                Login
              </Link>
            )
          )}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;