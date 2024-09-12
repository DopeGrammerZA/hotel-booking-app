// src/AccommodationList.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, addAccommodation, selectAccommodations, selectLoading, selectError } from '../firebase/auth/accommodationSlice';

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [newAccommodation, setNewAccommodation] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccommodation({ ...newAccommodation, [name]: value });
  };

  const handleAddAccommodation = () => {
    if (newAccommodation.name && newAccommodation.description) {
      dispatch(addAccommodation(newAccommodation));
      setNewAccommodation({ name: '', description: '' }); // Reset the form
    } else {
      alert('Please fill in both fields');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Accommodation List</h2>
      <ul>
        {accommodations.length > 0 ? (
          accommodations.map((accommodation) => (
            <li key={accommodation.id}>
              <h3>{accommodation.name}</h3>
              <p>{accommodation.description}</p>
            </li>
          ))
        ) : (
          <p>No accommodations available.</p>
        )}
      </ul>

      <h3>Add New Accommodation</h3>
      <input
        type="text"
        name="name"
        value={newAccommodation.name}
        onChange={handleInputChange}
        placeholder="Accommodation Name"
      />
      <textarea
        name="description"
        value={newAccommodation.description}
        onChange={handleInputChange}
        placeholder="Accommodation Description"
      />
      <button onClick={handleAddAccommodation}>Add</button>
    </div>
  );
};

export default AccommodationList;
