import React from 'react';
import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import ExecutiveBoard from './components/ExecutiveBoard.jsx';
import Resources from './components/Resources.jsx';  // Changed from .js to .jsx
import Footer from './components/Footer.jsx';
import Join from './components/Join.jsx';

function App() {
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
