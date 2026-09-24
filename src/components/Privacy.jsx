import '../styles/Privacy.css';

function Privacy() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 23, 2026</p>

        <p>
          ALPFA NJIT respects your privacy. This Privacy Policy explains how the
          ALPFA NJIT mobile application handles information when you use the app.
        </p>

        <section>
          <h2>Information We Collect</h2>

          <h3>Photos</h3>
          <p>
            The app allows you to take a photo using your device camera or
            select a photo from your photo library. Photos are only accessed
            when you choose to use these features.
          </p>

          <p>
            When you choose to upload a photo, the selected photo is sent
            through ALPFA NJIT's backend service and stored in an ALPFA NJIT
            Google Drive folder for organization use.
          </p>

          <h3>Location</h3>
          <p>
            Location access is optional. If you choose to add a location to a
            photo, the app asks for permission before accessing your device's
            location. The location may be used to create a location label that
            is added to the photo.
          </p>

          <p>
            The app does not continuously track your location. You can use the
            photo upload feature without adding a location.
          </p>

          <h3>Events and Directions</h3>
          <p>
            The app displays ALPFA NJIT event information, including event
            locations when available. If you select "Get Directions," the event
            destination may be passed to your device's maps application so that
            the maps application can provide directions.
          </p>

          <p>
            ALPFA NJIT does not continuously track your location for the
            directions feature. Location and routing performed by an external
            maps application are subject to that application's own privacy
            practices.
          </p>

          <h3>Notifications</h3>
          <p>
            The app may request permission to send notifications or event
            reminders. Notifications are optional and can be disabled through
            your device settings.
          </p>
        </section>

        <section>
          <h2>Accounts</h2>
          <p>
            You do not need to create an account or provide a username or
            password to use the ALPFA NJIT app.
          </p>
        </section>

        <section>
          <h2>How We Use Information</h2>
          <p>
            Information accessed through app features is used to provide the
            features you request, including photo capture and upload, optional
            photo location labels, event information, directions, and event
            reminders.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            The app uses services provided by third parties to support certain
            features. These may include Google services for ALPFA NJIT event
            information and photo storage, backend infrastructure used to
            securely process app requests, and your device's maps application
            when you request directions.
          </p>

          <p>
            These third-party services may process information according to
            their own privacy policies.
          </p>
        </section>

        <section>
          <h2>Your Choices</h2>
          <p>
            Camera, photo library, location, and notification permissions are
            controlled by your device. You may deny or revoke these permissions
            through your device settings.
          </p>

          <p>
            Denying an optional permission may prevent the related feature from
            working, but other parts of the app may remain available.
          </p>
        </section>

        <section>
          <h2>Data Requests</h2>
          <p>
            If you have questions about information you submitted through the
            app, including an uploaded photo, contact ALPFA NJIT using the email
            address below.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            The ALPFA NJIT app is intended for the ALPFA NJIT community and is
            not designed specifically for children under 13.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy as the app changes. Updates will
            be posted on this page with a revised "Last updated" date.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or the ALPFA NJIT
            app, contact us at:
          </p>

          <a href="mailto:alpfanjit@gmail.com">
            alpfanjit@gmail.com
          </a>
        </section>
      </div>
    </main>
  );
}

export default Privacy;