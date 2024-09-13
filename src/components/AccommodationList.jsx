import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccommodations } from '../firebase/auth/accommodationSlice'; 

const AccommodationList = () => {
  const accommodations = useSelector(selectAccommodations);

  return (
    <div>
      <h2>Accommodations</h2>
      <ul>
        {accommodations.map(accommodation => (
          <li key={accommodation.id}>
            <h3>{accommodation.name}</h3>
            <p>{accommodation.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationList;
