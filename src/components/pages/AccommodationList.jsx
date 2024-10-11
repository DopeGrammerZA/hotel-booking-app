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

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    rating: '',
    amenities: '',
    pricePerNight: '',
    maxOccupancy: '',
    available: ''
  });
  
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
    const amenitiesArray = formData.amenities.split(',').map(amenity => amenity.trim());
    
    const accommodationData = {
      ...formData,
      amenities: amenitiesArray
    };

    if (editMode) {
      dispatch(updateAccommodation({ id: currentAccommodation.id, updatedData: accommodationData }));
      setEditMode(false);
    } else {
      dispatch(addAccommodation(accommodationData));
    }

    setFormData({
      name: '',
      description: '',
      location: '',
      rating: '',
      amenities: '',
      pricePerNight: '',
      maxOccupancy: '',
      available: ''
    });
    setCurrentAccommodation(null);
  };

  const handleEdit = (accommodation) => {
    setEditMode(true);
    setCurrentAccommodation(accommodation);
    setFormData({
      name: accommodation.name,
      description: accommodation.description,
      location: accommodation.location,
      rating: accommodation.rating,
      amenities: accommodation.amenities.join(', '),
      pricePerNight: accommodation.pricePerNight,
      maxOccupancy: accommodation.maxOccupancy,
      available: accommodation.available
    });
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
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input-field"
          required
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (0-5)"
          className="input-field"
          required
        />
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma-separated)"
          className="input-field"
          required
        />
        <input
          type="number"
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleChange}
          placeholder="Price per Night"
          className="input-field"
          required
        />
        <input
          type="number"
          name="maxOccupancy"
          value={formData.maxOccupancy}
          onChange={handleChange}
          placeholder="Max Occupancy"
          className="input-field"
          required
        />
        <input
          type="number"
          name="available"
          value={formData.available}
          onChange={handleChange}
          placeholder="Available Rooms"
          className="input-field"
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
              <p className="accommodation-location">Location: {accommodation.location}</p>
              <p className="accommodation-rating">Rating: {accommodation.rating}</p>
              <p className="accommodation-amenities">Amenities: {Array.isArray(accommodation.amenities) ? accommodation.amenities.join(', ') : accommodation.amenities}</p>
              <p className="accommodation-price">Price per Night: R {accommodation.pricePerNight}</p>
              <p className="accommodation-max-occupancy">Max Occupancy: {accommodation.maxOccupancy}</p>
              <p className="accommodation-available">Available Rooms: {accommodation.available}</p>
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
