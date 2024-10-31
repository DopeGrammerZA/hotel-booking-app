import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, selectRoom } from "../../redux/roomsSlice";
import { useNavigate } from "react-router-dom";
import "../css/RoomList.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleRoomSelection = (room) => {
    dispatch(selectRoom(room));
    navigate("/room/:id");
  };

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  if (error) {
    return <p>Error fetching rooms: {error}</p>;
  }

  return (
    <div className="room-list-container">
      <Navbar />
      <div className="room-list-title">
        <h2 className="room-list-title">Available Rooms</h2>
      </div>

      <div className="room-list">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="image-container">
              <img
                className="room-image"
                src={room.roomImage}
                alt="Room Image"
              />
              </div>
              
              <div className="price-name-container">
                <h4 className="room-name">{room.name}</h4>
                <h4 className="price">R{room.pricePerNight}/Night</h4>
              </div>
              
              <div className="card-paragraphs">
                  <p className="room-description">{room.description}</p>
                  <p className="room-location"><span className="card-span">Location: </span>{room.location}</p>
                  <p className="room-rating"><span className="card-span">Rating: </span> {room.rating}</p>
                  <p className="room-amenities">
                  <span className="card-span">Anemeties: </span>{" "}
                    {Array.isArray(room.amenities)
                      ? room.amenities.join(", ")
                      : room.amenities || "No amenities listed"}
                  </p>
              </div>
              
              <button
                className="select-button"
                onClick={() => handleRoomSelection(room)}
              >
                Select Room
              </button>
            </div>
          ))
        ) : (
          <p>No rooms available at the moment.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RoomList;
