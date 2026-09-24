import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/Navigation.css';

const sections = [
  ['home', 'Home'],
  ['about', 'About'],
  ['events', 'Events'],
  ['executive-board-section', 'Executive Board'],
  ['join', 'Join Us'],
];

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  const page = path.endsWith('/privacy') ? 'privacy' : path.endsWith('/support') ? 'support' : null;
  
  useEffect(() => {
    const handleScroll = () => {
      const current = sections
        .map(([id]) => document.getElementById(id))
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop)
        .filter(element => element.getBoundingClientRect().top <= 130)
        .at(-1);
      setActiveSection(current?.id || 'home');
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo-section">
          <a className="logo" href={`${base}#home`} aria-label="ALPFA NJIT home">
             <img src={`${base}img/ALPFANJITLOGO.png`} alt="ALPFA NJIT Logo" className="logo-image" />
          </a>
        </div>
        
        <ul id="navigation-links" className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          {sections.map(([id, label]) => (
            <li key={id}>
              <a href={page ? `${base}#${id}` : `#${id}`}
                aria-current={!page && activeSection === id ? 'location' : undefined}
                onClick={() => setMobileMenuOpen(false)}>{label}</a>
            </li>
          ))}
          {['privacy', 'support'].map(id => (
            <li key={id}>
              <a href={`${base}${id}/`} aria-current={page === id ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}>
                {id === 'privacy' ? 'Privacy' : 'Support'}
              </a>
            </li>
          ))}
        </ul>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="navigation-links"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
