import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Dining', path: '/dining' },
    { label: 'Spa & Wellness', path: '/spa' },
    { label: 'Meetings & Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Special Offers', path: '/offers' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const services = [
    '24/7 Room Service',
    'Airport Transfers',
    'Concierge Service',
    'Spa Treatments',
    'Fine Dining',
    'Meeting Facilities',
    'Wedding Planning',
    'Private Tours',
  ];

  const socialLinks = [
    { icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
    { icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
    { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' },
    { icon: <Youtube className="w-4 h-4" />, label: 'YouTube' },
  ];

  const awards = [
    { name: 'Forbes Travel Guide', year: '2024' },
    { name: 'Travel + Leisure', year: '2023' },
    { name: 'Condé Nast', year: '2023' },
    { name: 'AAA Five Diamond', year: '2024' },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-luxury-gray border-t border-luxury-gray-light">
      {/* Main Footer Content */}
      <div className="container-narrow py-16">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-luxury-gold flex items-center justify-center">
                  <span className="text-luxury-gold font-serif text-xl">PH</span>
                </div>
                <div>
                  <h2 className="font-serif text-xl tracking-wider">PEACEFUL HOTEL</h2>
                  <p className="text-xs text-luxury-gold tracking-widest">LUXURY COLLECTION</p>
                </div>
              </div>
            </Link>
            
            <p className="text-luxury-text-light text-sm leading-relaxed">
              Experience unparalleled luxury and impeccable service at 
              Peaceful Hotel, where every moment is crafted to perfection.
            </p>
            
            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm tracking-widest uppercase mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 border border-luxury-gray-light flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-luxury-text-light hover:text-luxury-gold transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-serif text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <div className="flex items-center gap-2 text-sm text-luxury-text-light">
                    <div className="w-1 h-1 bg-luxury-gold rounded-full"></div>
                    <span>{service}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Awards */}
            <div className="pt-6 border-t border-luxury-gray-light">
              <h4 className="font-serif text-sm mb-3">Awards & Recognition</h4>
              <div className="space-y-2">
                {awards.map((award, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-luxury-text-light">{award.name}</span>
                    <span className="text-luxury-gold">{award.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-serif text-lg mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-luxury-text-light">
                    123 Luxury Avenue<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="text-sm text-luxury-text-light hover:text-luxury-gold transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <a 
                  href="mailto:reservations@peacefulhotel.com" 
                  className="text-sm text-luxury-text-light hover:text-luxury-gold transition-colors"
                >
                  reservations@peacefulhotel.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-sm text-luxury-text-light">24/7 Reception</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-6 border-t border-luxury-gray-light">
              <h4 className="font-serif text-sm mb-4">Stay Updated</h4>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-luxury-black border border-luxury-gray-light px-4 py-3 text-sm text-luxury-text-light placeholder-luxury-text-light/50 focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-luxury-gold hover:text-luxury-gold-light transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-luxury-text-light/70">
                  Subscribe to receive exclusive offers and updates.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-luxury-gray-light"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { text: 'Secure Booking', subtext: 'SSL Encrypted' },
              { text: 'Best Price Guarantee', subtext: '24/7 Support' },
              { text: 'Free Cancellation', subtext: 'Up to 48 Hours' },
              { text: 'Luxury Certified', subtext: 'Forbes 5-Star' },
            ].map((badge, index) => (
              <div key={index} className="text-center">
                <div className="text-luxury-gold text-sm font-light mb-1">{badge.text}</div>
                <div className="text-xs text-luxury-text-light/70">{badge.subtext}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-luxury-black py-8 border-t border-luxury-gray-light">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-luxury-text-light/70">
              © {new Date().getFullYear()} Peaceful Hotel. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-luxury-text-light/70 hover:text-luxury-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-luxury-text-light/70 hover:text-luxury-gold transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-luxury-text-light/70 hover:text-luxury-gold transition-colors"
              >
                Cookie Policy
              </Link>
              <Link 
                to="/accessibility" 
                className="text-luxury-text-light/70 hover:text-luxury-gold transition-colors"
              >
                Accessibility
              </Link>
              <Link 
                to="/sitemap" 
                className="text-luxury-text-light/70 hover:text-luxury-gold transition-colors"
              >
                Sitemap
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method, index) => (
                <div 
                  key={index} 
                  className="text-xs text-luxury-text-light/50 border border-luxury-gray-light px-3 py-1"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Commitment */}
          <div className="mt-8 pt-6 border-t border-luxury-gray-light text-center">
            <div className="text-xs text-luxury-text-light/60">
              Peaceful Hotel is committed to sustainable luxury. We are certified 
              <span className="text-luxury-gold mx-2">Green Key Eco-Rating</span>
              and
              <span className="text-luxury-gold mx-2">LEED Gold Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 border border-luxury-gray-light bg-luxury-black/80 backdrop-blur-xs flex items-center justify-center text-luxury-gold hover:border-luxury-gold transition-all duration-300 z-40 group"
        aria-label="Back to top"
      >
        <svg 
          className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;