import { useEffect, useMemo, useState } from 'react';
import '../styles/PointsWidget.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function PointsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ ucid: '', name: '' });
  const [statusMessage, setStatusMessage] = useState('Enter your UCID and name to register or verify your standing.');
  const [statusType, setStatusType] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

  const loadLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard?limit=10`);
      if (!response.ok) {
        throw new Error('Unable to load leaderboard');
      }

      const data = await response.json();
      setMembers(data);
    } catch {
      setStatusType('error');
      setStatusMessage('Points service is currently offline. Please try again shortly.');
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const sortedMembers = useMemo(
    () => [...members].sort((a, b) => b.points - a.points || b.eventsAttended - a.eventsAttended),
    [members]
  );

  const topLeader = sortedMembers[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanedUcid = formData.ucid.trim().toLowerCase();
    const cleanedName = formData.name.trim();

    if (!cleanedUcid || !cleanedName) {
      setStatusType('error');
      setStatusMessage('Please add both UCID and name.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/members/verify-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ucid: cleanedUcid, name: cleanedName }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setStatusType('error');
        setStatusMessage(payload.detail || 'Something went wrong. Please try again.');
        return;
      }

      setStatusType('success');
      setStatusMessage(`✅ Nice work! ${payload.message}`);
      setFormData({ ucid: '', name: '' });
      await loadLeaderboard();
    } catch {
      setStatusType('error');
      setStatusMessage('Points service is currently offline. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLabel = isOpen ? 'Close points widget' : 'Open points widget';

  return (
    <aside className={`points-widget ${isOpen ? 'open' : 'closed'}`}>
      <button className="points-widget-toggle" onClick={() => setIsOpen(!isOpen)} aria-label={toggleLabel}>
        {isOpen ? '→' : '←'}
      </button>

      <div className="points-widget-content">
        <h3>Points Tracker</h3>
        {topLeader ? (
          <div className="leader-card">
            <p className="leader-label">Top Leader</p>
            <p className="leader-name">{topLeader.name}</p>
            <p className="leader-points">{topLeader.points} pts</p>
          </div>
        ) : null}

        <form className="points-form" onSubmit={handleSubmit}>
          <label htmlFor="member-ucid">UCID</label>
          <input
            id="member-ucid"
            type="text"
            value={formData.ucid}
            onChange={(event) => setFormData((prev) => ({ ...prev, ucid: event.target.value }))}
            placeholder="ex: aa123"
          />

          <label htmlFor="member-name">Full Name</label>
          <input
            id="member-name"
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Your full name"
          />

          <button type="submit" disabled={isLoading}>{isLoading ? 'Checking...' : 'Register / Verify'}</button>
        </form>

        <p className={`points-status ${statusType}`}>{statusMessage}</p>

        <ul className="mini-board">
          {sortedMembers.slice(0, 3).map((member, index) => (
            <li key={member.ucid}>
              <span>#{index + 1}</span>
              <span>{member.name}</span>
              <span>{member.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default PointsWidget;