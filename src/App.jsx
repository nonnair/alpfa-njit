import React, { useEffect } from 'react';
import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import ExecutiveBoard from './components/ExecutiveBoard.jsx';
import Resources from './components/Resources.jsx';
import Footer from './components/Footer.jsx';
import Join from './components/Join.jsx';

function App() {
  useEffect(() => {
    // Smooth scroll with offset for fixed navbar
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = 90; // Your navbar height
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="app">
      <Navigation />
      <main>
        <Home />
        <About />
        <Events />
        <Join />
        <ExecutiveBoard />
        <Resources />
      </main>
      <Footer />
    </div>
  );
}

export default App;