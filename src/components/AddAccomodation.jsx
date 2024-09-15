import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, deleteAccommodation } from '../firebase/auth/accommodationSlice';
import { Link } from 'react-router-dom';

const AccommodationList = () => {
  const dispatch = useDispatch();
  const { accommodations, status, error } = useSelector((state) => state.accommodations);
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAccommodations());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const handleDelete = (id) => {
    dispatch(deleteAccommodation(id));
  };

  return (
    <div>
      {role === 'admin' && <Link to="/add-accommodation">Add Accommodation</Link>}
      <ul>
        {accommodations.map((acc) => (
          <li key={acc.id}>
            <h3>{acc.name}</h3>
            <p>{acc.description}</p>
            {role === 'admin' && (
              <>
                <Link to={`/edit-accommodation/${acc.id}`}>Edit</Link>
                <button onClick={() => handleDelete(acc.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationList;
