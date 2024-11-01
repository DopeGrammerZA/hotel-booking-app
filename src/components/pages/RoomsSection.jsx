import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../redux/roomsSlice";
import { useNavigate } from "react-router-dom";
import "../css/RoomsSection.css";

const RoomsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleBookNowClick = (room) => {
    navigate(`/roomList/`);
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error fetching rooms: {error}</p>;

  return (
    <section className="rooms-section">
      <h2>Our Featured Homes</h2>
      <div className="rooms-container">
        {rooms.slice(0, 3).map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.roomImage} alt={room.name} className="room-image" />
            <div className="room-details">
              <h3>{room.name}</h3>
              <p className="room-price">R{room.pricePerNight}/Night</p>
              <ul className="room-features">
                {Array.isArray(room.amenities)
                  ? room.amenities.map((amenity, index) => <li key={index}>{amenity}</li>)
                  : room.amenities || "No amenities listed"}
              </ul>
              <button className="btn-book-room" onClick={() => handleBookNowClick(room)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;
