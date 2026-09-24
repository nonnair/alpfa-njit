import React, { useEffect } from 'react';
import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import ExecutiveBoard from './components/ExecutiveBoard.jsx';
import Footer from './components/Footer.jsx';
import Join from './components/Join.jsx';
import Privacy from './components/Privacy.jsx';
import Support from './components/Support.jsx';

function App() {
  useEffect(() => {
    // Smooth scroll with offset for fixed navbar
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = 90;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Current page
  const path = window.location.pathname.replace(/\/+$/, '');

  const isPrivacyPage = path.endsWith('/privacy');
  const isSupportPage = path.endsWith('/support');

  // Privacy page
  if (isPrivacyPage) {
    return (
      <div className="app">
        <Navigation />
        <Privacy />
        <Footer />
      </div>
    );
  }

  // Support page
  if (isSupportPage) {
    return (
      <div className="app">
        <Navigation />
        <Support />
        <Footer />
      </div>
    );
  }

  // Main website
  return (
    <div className="app">
      <Navigation />

      <main>
        <Home />
        <About />
        <Events />
        <Join />
        <ExecutiveBoard />
      </main>

      <Footer />
    </div>
  );
}

export default App;