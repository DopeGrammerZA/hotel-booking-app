import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/luxury-global.css';
import './styles/globals.css';

// Components
import Navbar from './components/pages/Navbar';
import HeroSection from './components/pages/HeroSection';
import AboutSection from './components/pages/AboutSection';
import RoomsSection from './components/pages/RoomsSection';
import ReviewsSection from './components/pages/ReviewsSection';
import Footer from './components/pages/Footer';
import AccommodationList from './components/pages/AccommodationList';
import RoomDetails from './components/pages/RoomDetails';
import Dashboard from './components/pages/Dashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import AuthPage from './components/auth/AuthPage';
import ForgotPassword from './components/pages/ForgotPassword';
import EditProfile from './components/pages/EditProfile';
import ContactUs from './components/pages/ContactUs';
import AboutPage from './components/pages/AboutPage';
import Payment from './components/pages/Payment';
import ConfirmedBooking from './components/pages/ConfirmedBooking';
import ProtectedRoute from './components/pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ivory-50">
        <Navbar />
        
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutSection />
              <RoomsSection />
              <ReviewsSection />
            </>
          } />
          
          {/* Public Routes */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/accommodationList" element={<AccommodationList />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/AdminDashboard" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/edit-profile" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/confirmedBooking" element={
            <ProtectedRoute>
              <ConfirmedBooking />
            </ProtectedRoute>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;