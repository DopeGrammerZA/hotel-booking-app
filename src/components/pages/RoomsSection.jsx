import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../redux/roomsSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Maximize, Bed, Bath, Wifi, Coffee, Tv, Wind } from 'lucide-react';

const RoomsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleViewDetails = (room) => {
    navigate(`/room/${room.id}`);
  };

  const handleViewAllRooms = () => {
    navigate("/accommodationList");
  };

  // Default amenities icons mapping
  const amenityIcons = {
    wifi: <Wifi className="w-3 h-3" />,
    coffee: <Coffee className="w-3 h-3" />,
    tv: <Tv className="w-3 h-3" />,
    ac: <Wind className="w-3 h-3" />,
    bed: <Bed className="w-3 h-3" />,
    bath: <Bath className="w-3 h-3" />,
  };

  // Function to extract amenities from room data
  const extractAmenities = (room) => {
    if (Array.isArray(room.amenities) && room.amenities.length > 0) {
      return room.amenities.slice(0, 4); // Show only first 4 amenities
    }
    
    // Fallback to default amenities based on room type
    const defaultAmenities = {
      'presidential': ['Wifi', 'Breakfast', 'Jacuzzi', 'Minibar'],
      'executive': ['Wifi', 'Breakfast', 'Workspace', 'City View'],
      'deluxe': ['Ocean View', 'Balcony', 'Wifi', 'Breakfast'],
      'standard': ['Wifi', 'TV', 'AC', 'Coffee']
    };
    
    const roomType = room.type?.toLowerCase() || room.name?.toLowerCase() || 'standard';
    const typeMatch = Object.keys(defaultAmenities).find(type => roomType.includes(type));
    
    return defaultAmenities[typeMatch] || defaultAmenities.standard;
  };

  // Function to get icon for amenity
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return amenityIcons.wifi;
    if (amenityLower.includes('coffee') || amenityLower.includes('breakfast')) return amenityIcons.coffee;
    if (amenityLower.includes('tv')) return amenityIcons.tv;
    if (amenityLower.includes('ac') || amenityLower.includes('air')) return amenityIcons.ac;
    if (amenityLower.includes('bed')) return amenityIcons.bed;
    if (amenityLower.includes('bath')) return amenityIcons.bath;
    return null;
  };

  // Function to get guest capacity
  const getGuestCapacity = (room) => {
    if (room.guestCapacity) return room.guestCapacity;
    if (room.capacity) return room.capacity;
    
    // Estimate based on room type
    const roomType = room.type?.toLowerCase() || room.name?.toLowerCase() || '';
    if (roomType.includes('presidential') || roomType.includes('suite')) return 4;
    if (roomType.includes('executive')) return 3;
    if (roomType.includes('deluxe')) return 2;
    return 2;
  };

  // Function to get room size
  const getRoomSize = (room) => {
    if (room.size) return room.size;
    
    // Estimate based on room type
    const roomType = room.type?.toLowerCase() || room.name?.toLowerCase() || '';
    if (roomType.includes('presidential')) return '120 m²';
    if (roomType.includes('executive')) return '85 m²';
    if (roomType.includes('deluxe')) return '65 m²';
    return '45 m²';
  };

  // Function to get room rating
  const getRoomRating = (room) => {
    if (room.rating) return room.rating;
    if (room.reviews && room.reviews.length > 0) {
      const avgRating = room.reviews.reduce((sum, review) => sum + review.rating, 0) / room.reviews.length;
      return avgRating.toFixed(1);
    }
    return '4.8'; // Default rating
  };

  // Loading state
  if (loading) {
    return (
      <section className="section-spacing bg-luxury-black">
        <div className="container-narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-luxury-gold"></div>
              <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
                Loading Luxury
              </span>
              <div className="h-px w-12 bg-luxury-gold"></div>
            </div>
            <div className="text-luxury-text-light">Loading our exclusive rooms...</div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section-spacing bg-luxury-black">
        <div className="container-narrow">
          <div className="text-center">
            <div className="text-luxury-gold mb-4">Unable to load rooms</div>
            <div className="text-luxury-text-light">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  // No rooms state
  if (!rooms || rooms.length === 0) {
    return (
      <section className="section-spacing bg-luxury-black">
        <div className="container-narrow">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-luxury-gold"></div>
              <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
                No Rooms Available
              </span>
              <div className="h-px w-12 bg-luxury-gold"></div>
            </div>
            <div className="text-luxury-text-light">Please check back later for available accommodations.</div>
          </div>
        </div>
      </section>
    );
  }

  // Main component render
  return (
    <section className="section-spacing bg-luxury-black">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-luxury-gold"></div>
            <span className="text-luxury-gold text-sm tracking-widest uppercase font-light">
              Luxury Accommodations
            </span>
            <div className="h-px w-12 bg-luxury-gold"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-display-sm font-serif font-light text-luxury-text mb-6">
            Our Exclusive Rooms & Suites
          </h2>
          
          <p className="text-lg text-luxury-text-light max-w-2xl mx-auto font-light leading-relaxed">
            Each room and suite is meticulously designed to provide the ultimate in comfort, 
            luxury, and personalized service for an unforgettable stay.
          </p>
        </motion.div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rooms.slice(0, 3).map((room, index) => {
            const amenities = extractAmenities(room);
            const guests = getGuestCapacity(room);
            const size = getRoomSize(room);
            const rating = getRoomRating(room);
            
            return (
              <motion.div
                key={room.id || room._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Room Card */}
                <div className="bg-luxury-gray border border-luxury-gray-light overflow-hidden transition-all duration-500 hover:border-luxury-gold/30 h-full">
                  {/* Room Image with Price Tag */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={room.roomImage || room.image || "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1925&q=80"}
                      alt={room.name || room.title || "Luxury Room"}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1925&q=80";
                      }}
                    />
                    
                    {/* Gold Price Tag */}
                    <div className="absolute top-4 right-4 bg-luxury-gold text-black px-4 py-2">
                      <span className="font-serif text-xl font-light">
                        R{room.pricePerNight || room.price || 0}
                      </span>
                      <span className="text-xs ml-1">/night</span>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xs px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-luxury-gold fill-current" />
                      <span className="text-sm text-white font-light">{rating}</span>
                    </div>
                  </div>

                  {/* Room Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-light text-luxury-text mb-3">
                      {room.name || room.title || "Luxury Room"}
                    </h3>
                    
                    <p className="text-luxury-text-light mb-6 font-light leading-relaxed text-sm">
                      {room.description || room.about || "Experience luxury and comfort in our beautifully appointed room."}
                    </p>

                    {/* Room Features */}
                    <div className="flex items-center gap-6 mb-6 text-luxury-text-light">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-luxury-gold" />
                        <span className="text-sm font-light">{guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize className="w-4 h-4 text-luxury-gold" />
                        <span className="text-sm font-light">{size}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {amenities.map((amenity, amenityIndex) => (
                        <span 
                          key={amenityIndex}
                          className="px-3 py-1 bg-luxury-black border border-luxury-gray-light text-luxury-text-light text-xs font-light flex items-center gap-1"
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleViewDetails(room)}
                      className="btn-primary w-full group-hover:bg-luxury-gold group-hover:text-black transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={handleViewAllRooms}
            className="btn-primary px-12 py-4 text-sm tracking-widest"
          >
            View All Rooms & Suites
            <span className="ml-2">→</span>
          </button>
          <p className="text-luxury-text-light mt-4 font-light text-sm">
            Explore our complete collection of luxury accommodations
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-luxury-gray-light"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { text: 'Best Price Guarantee', desc: 'Lowest rates guaranteed' },
              { text: 'Flexible Booking', desc: 'Easy cancellation & changes' },
              { text: 'Secure Payments', desc: 'SSL encrypted transactions' },
              { text: '24/7 Support', desc: 'Always here to help' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-luxury-gold text-sm font-light mb-1">{item.text}</div>
                <div className="text-xs text-luxury-text-light/70">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomsSection;