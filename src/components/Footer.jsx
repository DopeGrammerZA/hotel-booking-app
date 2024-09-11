import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#offers">Special Offers</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p><strong>Address:</strong> 1937 Pretoria, South Africa</p>
          <p><strong>Phone:</strong> 10111 </p>
          <p><strong>Email:</strong> info@Peaceful.co.za</p>
        </div>
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="footer-section map">
          <h3>Find Us</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.935328083818!2d-122.41941808468126!3d37.77492927975943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f1c5e4d55%3A0x5d0902a34a0d6c0d!2sSan%20Francisco%2C%20CA%2094110!5e0!3m2!1sen!2sus!4v1633111889904!5m2!1sen!2sus"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              title="Hotel Location"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Peaceful Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
