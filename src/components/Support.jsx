import '../styles/Privacy.css';

function Support() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <h1>ALPFA NJIT App Support</h1>

        <p>
          Need help with the ALPFA NJIT mobile app? This page covers common
          questions and ways to contact the ALPFA NJIT team.
        </p>

        <section>
          <h2>Contact Support</h2>
          <p>
            If you are experiencing an issue with the app or have a question,
            contact us at:
          </p>

          <a href="mailto:alpfanjit@gmail.com">
            alpfanjit@gmail.com
          </a>
        </section>

        <section>
          <h2>Photo Uploads</h2>
          <p>
            The app allows you to take a photo with your camera or select an
            existing photo from your device.
          </p>

          <p>
            If photo capture or selection is not working, make sure the app has
            permission to access your camera or photo library in your device
            settings.
          </p>
        </section>

        <section>
          <h2>Adding a Location to a Photo</h2>
          <p>
            Adding a location to a photo is optional. When you choose to add a
            location, the app will request location permission if permission
            has not already been granted.
          </p>

          <p>
            If you do not want to share your location, you can continue without
            adding a location to your photo.
          </p>
        </section>

        <section>
          <h2>Events</h2>
          <p>
            The Events section displays upcoming ALPFA NJIT events and their
            available details.
          </p>

          <p>
            If an event includes a location, you may see a "Get Directions"
            option that opens your device's maps application with the event
            destination.
          </p>
        </section>

        <section>
          <h2>Event Reminders</h2>
          <p>
            The app may allow you to receive reminders for upcoming events.
            Make sure notifications are enabled for the ALPFA NJIT app if you
            want to receive these reminders.
          </p>

          <p>
            Notification permissions can be changed at any time through your
            device settings.
          </p>
        </section>

        <section>
          <h2>App Permissions</h2>
          <p>
            Some features may require camera, photo library, location, or
            notification permissions. You control these permissions through
            your device settings.
          </p>

          <p>
            If a feature is not working, check that the permission required for
            that feature has not been disabled.
          </p>
        </section>

        <section>
          <h2>Privacy</h2>
          <p>
            For information about how the ALPFA NJIT app handles information
            and permissions, read our Privacy Policy.
          </p>

          <a href="./privacy">View Privacy Policy</a>
        </section>

        <section>
          <h2>ALPFA NJIT</h2>
          <p>
            You can also stay connected with ALPFA NJIT through our official
            Instagram.
          </p>

          <a
            href="https://www.instagram.com/alpfa_njit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @alpfa_njit on Instagram
          </a>
        </section>
      </div>
    </main>
  );
}

export default Support;