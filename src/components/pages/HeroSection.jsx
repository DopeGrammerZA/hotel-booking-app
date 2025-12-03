import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HeroSection = () => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'all'
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const heroImages = [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    navigate('/rooms', { state: bookingData });
    toast.success('Searching for available rooms...');
  };

  const scrollToRooms = () => {
    const roomsSection = document.getElementById('rooms-section');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/rooms');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative h-screen min-h-[900px] flex items-center overflow-hidden">
      {/* Background Images with Fade Animation */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10"></div>
          <img 
            src={image}
            alt={`Luxury Hotel ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto container-padding relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="h-px w-20 bg-gold-500 mb-8"></div>
            <h1 className="text-white font-display text-5xl md:text-6xl lg:text-display font-light leading-[0.9] mb-8">
              Experience
              <span className="block text-gold-500 mt-6">True Luxury</span>
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed max-w-xl">
              A sanctuary of elegance in the heart of the city, where every moment 
              is crafted to perfection. Discover unparalleled luxury and impeccable 
              service at Peaceful Hotel.
            </p>
          </motion.div>

          {/* Booking Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-effect rounded-sm p-1 max-w-4xl">
              <form onSubmit={handleBooking} className="flex flex-col md:flex-row gap-1">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-1">
                  {/* Check-in */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Calendar className="w-5 h-5 text-gold-500 group-hover:text-white transition-colors" />
                    </div>
                    <input
                      type="date"
                      className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 p-4 pl-12 border-r border-white/10 focus:outline-none focus:bg-white/20 transition-colors"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                      required
                    />
                    <label className="absolute left-12 top-4 text-xs text-white/60 pointer-events-none">
                      CHECK-IN
                    </label>
                  </div>

                  {/* Check-out */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Calendar className="w-5 h-5 text-gold-500 group-hover:text-white transition-colors" />
                    </div>
                    <input
                      type="date"
                      className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 p-4 pl-12 border-r border-white/10 focus:outline-none focus:bg-white/20 transition-colors"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                      required
                    />
                    <label className="absolute left-12 top-4 text-xs text-white/60 pointer-events-none">
                      CHECK-OUT
                    </label>
                  </div>

                  {/* Guests */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Users className="w-5 h-5 text-gold-500 group-hover:text-white transition-colors" />
                    </div>
                    <select
                      className="w-full bg-white/10 backdrop-blur-sm text-white p-4 pl-12 pr-8 border-r border-white/10 focus:outline-none focus:bg-white/20 transition-colors appearance-none cursor-pointer"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                    >
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num} className="bg-charcoal-900">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <label className="absolute left-12 top-4 text-xs text-white/60 pointer-events-none">
                      GUESTS
                    </label>
                  </div>

                  {/* Room Type */}
                  <div className="relative group">
                    <select
                      className="w-full bg-white/10 backdrop-blur-sm text-white p-4 pr-8 focus:outline-none focus:bg-white/20 transition-colors appearance-none cursor-pointer"
                      value={bookingData.roomType}
                      onChange={(e) => setBookingData({...bookingData, roomType: e.target.value})}
                    >
                      <option value="all" className="bg-charcoal-900">ALL ROOMS</option>
                      <option value="suite" className="bg-charcoal-900">SUITES</option>
                      <option value="deluxe" className="bg-charcoal-900">DELUXE</option>
                    </select>
                    <label className="absolute left-4 top-4 text-xs text-white/60 pointer-events-none">
                      ROOM TYPE
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gold-500 text-white px-8 py-4 flex items-center justify-center space-x-2 hover:bg-gold-600 transition-colors group min-w-[200px]"
                >
                  <Search className="w-5 h-5" />
                  <span className="tracking-widest text-sm">CHECK AVAILABILITY</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-8"
          >
            {['Best Price Guarantee', 'Free Cancellation', '24/7 Luxury Service'].map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        onClick={scrollToRooms}
      >
        <div className="text-center">
          <div className="text-white/60 text-xxs tracking-widest mb-4">
            EXPLORE OUR LUXURY
          </div>
          <ChevronDown className="w-6 h-6 text-white/60 mx-auto" />
        </div>
      </motion.div>

      {/* Image Counter */}
      <div className="absolute bottom-12 right-12 z-30">
        <div className="flex items-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-gold-500 w-4' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;