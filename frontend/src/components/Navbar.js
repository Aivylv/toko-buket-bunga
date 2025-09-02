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

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          FLORIST
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          
          {currentUser ? (
            <>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
              <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>
              <div className="nav-user">
                <span>Hello, {currentUser.name}</span>
                <button onClick={handleLogout} className="nav-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
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