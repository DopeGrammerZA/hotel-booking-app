import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccommodations, selectAccommodations } from '../firebase/auth/accommodationSlice'; 

const AccommodationList = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(selectAccommodations);

  useEffect(() => {
    console.log(dispatch(fetchAccommodations())); 
  }, [dispatch]);

  if (!accommodations.length) {
    return <p>Loading accommodations...</p>; 
  }

  return (
    <div>
      {accommodations.map((accommodation) => (
        <div key={accommodation.id}>
          <h3>{accommodation.name}</h3>
          
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;
