import React from 'react';
import '../styles/Footer.css'
function Footer() {
  const copyEmail = () => {
    navigator.clipboard.writeText("contact@alpfanjit.edu");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-logo">ALPFA</div>
              <span className="logo-text">NJIT</span>
            </div>
            <p className="footer-text">
              Empowering students to reach their full potential in accounting, finance, and business.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#executive-board">Executive Board</a></li>
              <li><a href="#resources">Resources</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#portal">Member Portal</a></li>
              <li><a href="#documents">Documents</a></li>
              <li><a href="#calendar">Event Calendar</a></li>
              <li><a href="#membership">Membership Info</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-text">contact@alpfanjit.edu</p>
            <p className="footer-text">Student Union Room 203</p>
            <p className="footer-text">Newark, NJ 07102</p>
            <button 
              onClick={copyEmail}
              className="footer-copy-btn"
            >
              Copy Email
            </button>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 ALPFA NJIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;