import React from 'react';
import { ExternalLink, Instagram } from 'lucide-react';
import '../styles/Join.css'

function Join() {
  return (
    <section id="join">
      <div className="join-container">
        <div className="join-header">
          <h2 className="section-title">Join ALPFA NJIT</h2>
          <p className="join-subtitle">
            Get involved and become part of our community! Choose the way that works best for you.
          </p>
        </div>
        
        <div className="join-options">
          <a 
            href="https://njit.campuslabs.com/engage/organization/alpfa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="join-card"
          >
            <div className="join-icon highlander-hub">
              <ExternalLink size={32} />
            </div>
            <h3 className="join-card-title">Highlander Hub</h3>
            <p className="join-card-description">
              Join our official organization on NJIT's Highlander Hub platform
            </p>
            <span className="join-link-text">Join on Highlander Hub →</span>
          </a>

          <a 
            href="https://discord.gg/F5jCEepGEN" 
            target="_blank" 
            rel="noopener noreferrer"
            className="join-card"
          >
            <div className="join-icon discord">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="join-card-title">Discord</h3>
            <p className="join-card-description">
              Connect with members, get updates, and join our community discussions
            </p>
            <span className="join-link-text">Join Discord Server →</span>
          </a>

          <a 
            href="https://instagram.com/alpfa_njit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="join-card"
          >
            <div className="join-icon instagram">
              <Instagram size={32} />
            </div>
            <h3 className="join-card-title">Instagram</h3>
            <p className="join-card-description">
              Follow us for event updates, photos, and stay connected with ALPFAmilia
            </p>
            <span className="join-link-text">Follow on Instagram →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Join;