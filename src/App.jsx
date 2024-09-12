import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import Footer from './components/Footer';
import RoomDetails from './components/RoomDetails';
import AuthPage from './firebase/auth/AuthPage';
import Dashboard from './components/Dashboard';
import ForgotPasswordPage from './components/ForgotPassword';
import ReviewPage from './components/ReviewsSection';
import EditProfile from './components/EditProfile';
import AdminDashboard from './components/AdminDashboard'; //
import AccommodationList from './components/AccommodationList';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutSection />
              <RoomsSection />
              <ReviewPage />
              <Footer />
              
            </>
          } />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/accomodationList" element={<AccommodationList />} />
          <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
