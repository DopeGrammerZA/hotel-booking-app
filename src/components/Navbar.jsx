// Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; 


const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Peaceful Hotel</h1>
      </div>
      <ul className="navbar-menu">
      <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>About</Link></li>
        <li><Link to='/'>Rooms</Link></li>
        <li><Link to='/'>Contact</Link></li>
      </ul>
      <div className="navbar-buttons">
        {!user ? (
          <Link to='/login' className="btn-book-now">Login</Link>
        ) : (
          <div className="user-menu">
            <img
              src={faUserCircle} 
              alt="User Icon"
              className="user-icon"
            />
            <div className="user-options">
              <Link to="/edit-profile" className="user-option">Edit Profile</Link>
              <button onClick={handleLogout} className="user-option">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
