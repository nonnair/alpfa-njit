import '../styles/Events.css'

function Events() {
  return (
    <section id="events">
      <div className="events-container">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="events-description">
          Stay updated with ALPFA NJIT events and activities. Check out our calendar below to see what's coming up!
        </p>
        
        <div className="calendar-container">
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=alpfanjit%40gmail.com&ctz=America%2FNew_York"
            className="google-calendar"
            frameBorder="0"
            scrolling="no"
            title="ALPFA NJIT Events Calendar"
          ></iframe>
        </div>

        <div className="events-contact">
          <div className="contact-card">
            <h3>Have Questions About Our Events?</h3>
            <p>Feel free to reach out to us for any inquiries about upcoming events, event details, or how to get involved.</p>
            <a href="mailto:alpfanjit@gmail.com" className="email-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              alpfanjit@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Events;