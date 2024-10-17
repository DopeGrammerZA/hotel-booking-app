import React, { useState } from 'react';
import '../css/ContactUs.css'; 
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import emailjs from 'emailjs-com'; // Import EmailJS

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    emailjs.send('service_bkaqjmp', 'template_jnemrxs', formData, 'BgRKlOYVHby05GBTi')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSuccessMessage('Your message has been sent successfully!');
        setErrorMessage('');
        setFormData({ name: '', email: '', message: '' }); 
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setErrorMessage('Failed to send the message. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <div className="contact-us-container">
        <Navbar />
        <div className="contact-us-content">
          <h2>Contact Us</h2>
          <p>We value your feedback and inquiries. Please fill out the form below or reach us through the contact details provided!</p>

          <div className="contact-details">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <p>+27 878 088 928</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <p>support@peacefulhotel.com</p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <p>1937 Peaceful Lane, Pretoria, 012</p>
            </div>
            <div className="social-media-contact">
              <h4>Follow Us:</h4>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-button">Send Message</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;
