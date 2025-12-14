import '../styles/About.css';
import { useState } from 'react';

function About() {
  const [imageErrors, setImageErrors] = useState({
    professional: false,
    social: false,
    community: false
  });

  const handleImageError = (type) => {
    setImageErrors(prev => ({ ...prev, [type]: true }));
  };

  return (
    <section id="about">
        <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <div className="founded-badge">Founded November 2024</div>
            <h2 className="section-title">About ALPFA NJIT</h2>
            <p className="section-description">
              Founded in November 2024, ALPFA NJIT was created to empower Latino and allied students at NJIT with opportunities for professional development, mentorship, leadership, and community. As a new chapter, we are building a strong foundation rooted in collaboration, ambition, and cultural pride.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="feature-icon">
                    {!imageErrors.professional ? (
                      <img 
                        src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=400&h=400&fit=crop&q=80" 
                        alt="Professional Development" 
                        className="feature-image"
                        onError={() => handleImageError('professional')}
                      />
                    ) : (
                      <span className="feature-emoji">💼</span>
                    )}
                  </div>
                  <h3 className="feature-title">Professional Development</h3>
                </div>
                <div className="card-back">
                  <p className="feature-description">
                    We host career workshops, resume reviews, interview prep, and networking sessions with professionals and NJIT alumni to help members build their skills and connections.
                  </p>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="feature-icon">
                    {!imageErrors.social ? (
                      <img 
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" 
                        alt="Social Events" 
                        className="feature-image"
                        onError={() => handleImageError('social')}
                      />
                    ) : (
                      <span className="feature-emoji">🎉</span>
                    )}
                  </div>
                  <h3 className="feature-title">Social Events</h3>
                </div>
                <div className="card-back">
                  <p className="feature-description">
                    We organize bonding events to create a strong sense of "ALPFAmilia" and support one another throughout the school year.
                  </p>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="feature-icon">
                    {!imageErrors.community ? (
                      <img 
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop" 
                        alt="Community Outreach" 
                        className="feature-image"
                        onError={() => handleImageError('community')}
                      />
                    ) : (
                      <span className="feature-emoji">🤝</span>
                    )}
                  </div>
                  <h3 className="feature-title">Community Outreach</h3>
                </div>
                <div className="card-back">
                  <p className="feature-description">
                    As our chapter grows, we aim to engage with local schools and communities, inspiring Latino students to pursue higher education and leadership in STEM and business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default About;