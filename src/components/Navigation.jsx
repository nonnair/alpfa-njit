
import '../styles/Navigation.css';


function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-section">
          <div className="logo">A</div>
          <span className="logo-text">ALPFA NJIT</span>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#executive-board">Executive Board</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><button className="btn-primary">Join Us</button></li>
        </ul>
        <button className="mobile-menu-btn">☰</button>
      </div>
    </nav>
  );
}

export default Navigation;