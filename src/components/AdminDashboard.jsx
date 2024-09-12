// src/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccommodation, fetchAccommodations } from '../firebase/auth/accommodationSlice';

const AdminDashboard = () => {
  const [newAccommodation, setNewAccommodation] = useState({
    id: '',
    name: '',
    description: '',
  });

  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.data);
  const loading = useSelector((state) => state.accommodations.loading);
  const error = useSelector((state) => state.accommodations.error);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleAddAccommodation = () => {
    dispatch(addAccommodation(newAccommodation));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Add Accommodation</h2>
        <input
          type="text"
          placeholder="ID"
          value={newAccommodation.id}
          onChange={(e) => setNewAccommodation({ ...newAccommodation, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newAccommodation.name}
          onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newAccommodation.description}
          onChange={(e) => setNewAccommodation({ ...newAccommodation, description: e.target.value })}
        />
        <button onClick={handleAddAccommodation} disabled={loading}>
          {loading ? 'Adding...' : 'Add Accommodation'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div>
        <h2>Accommodation List</h2>
        <ul>
          {accommodations.map((accommodation) => (
            <li key={accommodation.id}>
              <h3>{accommodation.name}</h3>
              <p>{accommodation.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
