import '../styles/About.css';
function About() {
  return (
    <section id="about">
        <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why ALPFA?</h2>
            <p className="section-description">
              ALPFA NJIT is a student-led organization dedicated to empowering future leaders in accounting, finance, and business through professional development, networking, and community service.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Professional Network</h3>
              <p className="feature-description">
                Connect with peers, alumni, and industry professionals...
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Engaging Events</h3>
              <p className="feature-description">
                Participate in workshops, speaker series, competitions...
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Leadership Development</h3>
              <p className="feature-description">
                Gain hands-on leadership experience through committee roles...
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default About;