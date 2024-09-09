import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import Footer from './components/Footer';
import Register from './components/Register';
import FirestoreExample from './firebase/FirestoreExample';
import AuthPage from './components/auth/AuthPage';

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
              <FirestoreExample/>
              <AuthPage />
            </>
          } />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
