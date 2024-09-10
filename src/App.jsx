import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import Footer from './components/Footer';
import RoomDetails from './components/RoomDetails';
import AuthPage from './firebase/auth/AuthPage';
import Dashboard from './components/Dashboard';
import ForgotPasswordPage from './components/ForgotPassword';




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
              <Footer />
              
              
            </>
          } />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
