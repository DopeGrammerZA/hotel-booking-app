import { useEffect } from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { listenToAuthChanges, signOutUser } from '../../redux/authSlice'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 

  useEffect(() => {
    dispatch(listenToAuthChanges()); 
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(signOutUser()); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1><Link to='/'>Peaceful Hotel</Link></h1>
      </div>
      <ul className="navbar-menu">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/roomlist'>Rooms</Link></li>
        <li><Link to='/'>Contact</Link></li>
      </ul>
      <div className="navbar-buttons">
        {!user ? (
          <Link to='/login' className="btn-book-now">Login</Link>
        ) : (
          <div className="user-menu">
            <FaUserCircle />
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
