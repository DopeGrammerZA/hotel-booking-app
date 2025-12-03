// src/components/pages/HeroSection.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Star, ChevronRight } from 'lucide-react';
import { selectAvailableAccommodations } from '../../redux/accommodationSlice';

const HeroSection = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numRooms, setNumRooms] = useState(1);
  const [numGuests, setNumGuests] = useState(2);
  const [errorMessage, setErrorMessage] = useState('');

  const availableAccommodations = useSelector(selectAvailableAccommodations);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates');
      return;
    }
    setErrorMessage('');
    navigate('/roomlist');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
            {/* Left Text Content */}
            <div className="text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gold-500"></div>
                <span className="text-gold-500 font-semibold tracking-[0.2em] text-sm uppercase">
                  Ultimate Luxury
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight mb-6">
                Experience
                <span className="block font-semibold mt-2 text-gold-500">Peaceful Elegance</span>
              </h1>
              
              <p className="text-lg md:text-xl font-light text-white/90 mb-10 max-w-xl">
                Where timeless sophistication meets unparalleled comfort. 
                Discover the art of luxury living at Peaceful Hotel.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {['5★ Rating', '24/7 Concierge', '150+ Rooms', 'Spa & Wellness'].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-serif text-gold-500 mb-1">
                      {feature.split(' ')[0]}
                    </div>
                    <div className="text-xs md:text-sm uppercase tracking-wider text-white/80">
                      {feature.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-lg mx-auto lg:mx-0">
              <div className="mb-6">
                <h3 className="font-serif text-2xl text-gray-900 mb-2">Plan Your Stay</h3>
                <p className="text-gray-600">Experience luxury tailored to your preferences</p>
              </div>

              <div className="space-y-6">
                {/* Date Inputs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Check In
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        min={today}
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-ivory-100 border border-gray-200 rounded-lg font-sans text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Check Out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        min={checkInDate || today}
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-ivory-100 border border-gray-200 rounded-lg font-sans text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests & Rooms */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-ivory-100 border border-gray-200 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Rooms
                    </label>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        value={numRooms}
                        onChange={(e) => setNumRooms(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-ivory-100 border border-gray-200 rounded-lg font-sans text-gray-900 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all appearance-none"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Room' : 'Rooms'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {errorMessage}
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleSearchClick}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold tracking-wider uppercase text-sm rounded-lg hover:from-gold-600 hover:to-gold-700 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Check Availability
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      Best Rate Guaranteed
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      No Booking Fees
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;