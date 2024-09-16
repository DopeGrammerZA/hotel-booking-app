import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../firebase/auth/authSlice';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(signOutUser());
      navigate('/'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [dispatch, navigate]);

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li
            className={activeMenu === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveMenu('dashboard')}
          >
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <li
            className={activeMenu === 'accommodations' ? 'active' : ''}
            onClick={() => setActiveMenu('accommodations')}
          >
            <Link to="/AccommodationList">Accommodations</Link>
          </li>
          <li
            className={activeMenu === 'reservations' ? 'active' : ''}
            onClick={() => setActiveMenu('reservations')}
          >
            <Link to="/admin-dashboard/reservations">Reservations</Link>
          </li>
          <li
            className={activeMenu === 'users' ? 'active' : ''}
            onClick={() => setActiveMenu('users')}
          >
            <Link to="/admin-dashboard/users">Users</Link>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className="main-content">
      
      </main>
    </div>
  );
};

export default AdminDashboard;
