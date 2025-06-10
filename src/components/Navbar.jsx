import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">InterioFlow</Link>

        {/* Toggle Button for Mobile View */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">

            {isLoggedIn && (
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            )}

            {isLoggedIn && role === 'DESIGNER' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/designer-dashboard">Designer Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/create-portfolio">Portfolio</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/shops">Vendors</Link></li>
              </>
            )}

            {isLoggedIn && role === 'USER' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/client-dashboard">Client Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/portfolios">Explore Designers</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/view-products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
              </>
            )}

            {isLoggedIn && role === 'VENDOR' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/vendor-dashboard">Vendor Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/my-shop">My Shop</Link></li>
              </>
            )}
          </ul>

          {/* Right Side Links */}
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
