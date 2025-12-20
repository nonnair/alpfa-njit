import '../styles/Home.css';
function Home() {
  return (
    <section id="home">
      {/* Your exact HTML from hero-section, stats-bar, and features-section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            ALPFA New Jersey<br />
            Institute of Technology.
          </h1>
          <a href="#artists" className="hero-cta">Join the ALPFAmilia</a>
        </div>
        <div className="hero-image">
          <img src="img/DSC01955.jpg" alt="eboard-photo" />
        </div>
      </div>
    </section>
  );
}

export default Home;