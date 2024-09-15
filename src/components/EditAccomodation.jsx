import { useState,   } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccommodation } from '../firebase/auth/accommodationSlice'; 
import { useParams, useNavigate } from 'react-router-dom';

const EditAccommodation = () => {
  const { id } = useParams();
  const accommodations = useSelector((state) => state.accommodations.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accommodation = accommodations.find((a) => a.id === id);

  const [name, setName] = useState(accommodation?.name || '');
  const [description, setDescription] = useState(accommodation?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAccommodation({ id, name, description }));
    navigate('/accommodations');
  };

  return (
    <div>
      <h2>Edit Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditAccommodation;
