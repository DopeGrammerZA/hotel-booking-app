import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchAccommodations, 
  addAccommodation, 
  updateAccommodation, 
  deleteAccommodation, 
  selectAccommodations 
} from '../../redux/accommodationSlice'; 
import '../css/AccommodationList.css'; 

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);

  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState(null);

  useEffect(() => {
    dispatch(fetchAccommodations());   
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateAccommodation({ id: currentAccommodation.id, updatedData: formData }));
      setEditMode(false);
    } else {
      dispatch(addAccommodation(formData));
    }
    setFormData({ name: '', description: '' });
    setCurrentAccommodation(null);
  };

  const handleEdit = (accommodation) => {
    setEditMode(true);
    setCurrentAccommodation(accommodation);
    setFormData({ name: accommodation.name, description: accommodation.description });
  };

  const handleDelete = (id) => {
    dispatch(deleteAccommodation(id));
  };

  return (
    <div className="accommodation-list-container">
      <h2 className="title">Accommodation List</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Accommodation Name"
          className="input-field"
          required
        />
        <textarea
          name="description"
          value={formData.description}
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

      {accommodations.length > 0 ? (
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
      ) : (
        <p>No accommodations available.</p>
      )}
    </div>
  );
};

export default AccommodationList;
