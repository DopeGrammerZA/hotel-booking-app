import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchAccommodations, 
  addAccommodation, 
  updateAccommodation, 
  deleteAccommodation, 
  selectAccommodations 
} from '../../firebase/auth/accommodationSlice'; 
import '../css/AccommodationList.css'; 

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);

  const [newAccommodation, setNewAccommodation] = useState({ name: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState(null);

  useEffect(() => {
    dispatch(fetchAccommodations()); 
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setCurrentAccommodation({ ...currentAccommodation, [name]: value });
    } else {
      setNewAccommodation({ ...newAccommodation, [name]: value });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addAccommodation(newAccommodation));
    setNewAccommodation({ name: '', description: '' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAccommodation({ id: currentAccommodation.id, updatedData: currentAccommodation }));
    setEditMode(false);
    setCurrentAccommodation(null);
  };

  const handleEdit = (accommodation) => {
    setEditMode(true);
    setCurrentAccommodation(accommodation);
  };

  const handleDelete = (id) => {
    dispatch(deleteAccommodation(id));
  };

  if (!accommodations.length) {
    return <p>Loading accommodations...</p>; 
  }

  return (
    <div className="accommodation-list-container">
      <h2 className="title">Accommodation List</h2>

      <form onSubmit={editMode ? handleUpdate : handleAdd} className="form">
        <input
          type="text"
          name="name"
          value={editMode ? currentAccommodation.name : newAccommodation.name}
          onChange={handleChange}
          placeholder="Accommodation Name"
          className="input-field"
          required
        />
        <textarea
          name="description"
          value={editMode ? currentAccommodation.description : newAccommodation.description}
          onChange={handleChange}
          placeholder="Description"
          className="text-area"
          required
        />
        <button type="submit" className="submit-button">
          {editMode ? 'Update Accommodation' : 'Add Accommodation'}
        </button>
      </form>

      <hr className="divider" />

      <div className="accommodation-list">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="accommodation-card">
            <h3 className="accommodation-name">{accommodation.name}</h3>
            <p className="accommodation-description">{accommodation.description}</p>
            <div className="button-group">
              <button onClick={() => handleEdit(accommodation)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(accommodation.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationList;
