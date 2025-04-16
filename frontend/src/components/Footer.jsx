import React from 'react';
import '../assets/css/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaHome, FaInfoCircle, FaShoppingBag } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            A marketplace empowering local artisans by helping them sell their handcrafted goods online.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/"><FaHome className="icon" /> Home</a>
          <a href="/about"><FaInfoCircle className="icon" /> About Us</a>
          <a href="/products"><FaShoppingBag className="icon" /> Products</a>
        </div>

        {/* Social Media and Developers side by side */}
        <div className="footer-section footer-flex">
          {/* Social Media */}
          <div className="sub-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com"><FaFacebookF /></a>
              <a href="https://instagram.com"><FaInstagram /></a>
              <a href="https://twitter.com"><FaTwitter /></a>
            </div>
          </div>

          {/* Developers */}
          <div className="sub-section">
            <h3>Developed by</h3>
            <p>Shravan Doijad</p>
            <p>Mayuresh Desai</p>
            <p>Janhavi Chavan</p>
            <p>Priyanka Patil</p>
            <p>Anish Amanagi</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Artisan Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;