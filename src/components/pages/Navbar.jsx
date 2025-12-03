import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  User,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isLoggedIn = false; // Replace with actual auth state
  const isAdmin = false; // Replace with actual admin check

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Experience', path: '/experience' },
    { label: 'Dining', path: '/dining' },
    { label: 'Spa', path: '/spa' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleBookClick = () => {
    navigate('/rooms');
    toast.success('Explore our luxury accommodations');
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      }
    }
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className={`hidden lg:block transition-all duration-300 ${
        scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
      } bg-charcoal-900 text-white`}>
        <div className="container mx-auto container-padding h-full">
          <div className="flex items-center justify-between h-full text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>123 Luxury Avenue, New York</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <Link to="/login" className="hover:text-gold-500 transition-colors">
                  Sign In
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 hover:text-gold-500 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Account</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-sm border border-charcoal-100 z-50"
                      >
                        <Link
                          to="/dashboard"
                          className="block px-4 py-3 text-sm text-charcoal-700 hover:bg-sand-100 hover:text-gold-500 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm text-charcoal-700 hover:bg-sand-100 hover:text-gold-500 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="block px-4 py-3 text-sm text-charcoal-700 hover:bg-sand-100 hover:text-gold-500 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          className="block w-full text-left px-4 py-3 text-sm text-charcoal-700 hover:bg-sand-100 hover:text-red-500 transition-colors border-t border-charcoal-100"
                          onClick={() => {
                            // Handle logout
                            setIsDropdownOpen(false);
                          }}
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto container-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className={`w-10 h-10 flex items-center justify-center transition-all duration-300 ${
                scrolled ? 'bg-gold-500' : 'bg-white'
              } rounded-sm group-hover:rotate-12`}>
                <span className={`font-display text-xl font-bold ${
                  scrolled ? 'text-white' : 'text-charcoal-900'
                }`}>P</span>
              </div>
              <div>
                <h1 className={`font-display text-xl font-bold tracking-wider ${
                  scrolled ? 'text-charcoal-900' : 'text-white'
                }`}>
                  PEACEFUL HOTEL
                </h1>
                <p className={`text-xs tracking-widest uppercase ${
                  scrolled ? 'text-gold-500' : 'text-white/80'
                }`}>
                  Luxury Collection
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm tracking-widest transition-all duration-300 relative group ${
                    scrolled ? 'text-charcoal-700' : 'text-white/90'
                  } ${location.pathname === item.path ? 'text-gold-500' : ''}`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-gold-500' : 'bg-white'
                  }`}></span>
                  {location.pathname === item.path && (
                    <span className={`absolute -bottom-1 left-0 w-full h-px ${
                      scrolled ? 'bg-gold-500' : 'bg-white'
                    }`}></span>
                  )}
                </Link>
              ))}
              <button
                onClick={handleBookClick}
                className="btn-primary"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden transition-colors ${
                scrolled ? 'text-charcoal-900' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 w-full lg:hidden bg-white shadow-2xl z-40"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 border-b border-charcoal-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-white">P</span>
                    </div>
                    <div>
                      <h1 className="font-display text-xl font-bold text-charcoal-900">
                        PEACEFUL HOTEL
                      </h1>
                      <p className="text-xs text-gold-500 tracking-widest uppercase">
                        Luxury Collection
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-charcoal-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={`block py-4 px-4 text-sm tracking-widest transition-colors ${
                          location.pathname === item.path
                            ? 'text-gold-500 bg-sand-100'
                            : 'text-charcoal-700 hover:text-gold-500 hover:bg-sand-50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-charcoal-100">
                    <div className="space-y-4">
                      <Link
                        to="/login"
                        className="block py-3 text-center border border-charcoal-900 text-charcoal-900 text-sm tracking-widest hover:bg-charcoal-900 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <button
                        onClick={() => {
                          handleBookClick();
                          setIsOpen(false);
                        }}
                        className="btn-primary w-full"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-charcoal-100">
                  <div className="text-sm text-charcoal-600 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gold-500" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gold-500" />
                      <span>123 Luxury Avenue, New York</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;