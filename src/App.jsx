import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/pages/HeroSection';
import AboutSection from './components/pages/AboutSection';
import RoomsSection from './components/pages/RoomsSection';
import Footer from './components/pages/Footer';
import RoomDetails from './components/pages/RoomDetails';
import AuthPage from './firebase/auth/AuthPage';
import Dashboard from './components/pages/Dashboard';
import ForgotPasswordPage from './components/pages/ForgotPassword';
import ReviewPage from './components/pages/ReviewsSection';
import EditProfile from './components/pages/EditProfile';
import AccommodationList from './components/pages/AccommodationList';
import AdminDashboard from './components/pages/AdminDashboard';
import RoomList from './components/pages/RoomList';
import ConfirmRoom from './components/pages/ConfirmRoom';
import Payment from './components/pages/Payment';




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
          <Route path="/accommodationList" element={<AccommodationList />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/roomlist" element={<RoomList />} />  
          <Route path="/confirm-room" element={<ConfirmRoom />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
