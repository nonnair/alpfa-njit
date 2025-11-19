import React from 'react';
import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import FAQ from './components/Join.jsx';
import ExecutiveBoard from './components/ExecutiveBoard.jsx';
import Resources from './components/Resources.jsx';  // Changed from .js to .jsx
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Home />
        <About />
        <Events />
        <FAQ />
        <ExecutiveBoard />
        <Resources />
      </main>
      <Footer />
    </div>
  );
}

export default App;
