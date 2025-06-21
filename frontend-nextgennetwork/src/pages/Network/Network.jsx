import './Network.css';

function Network() {
  const invitations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      headline: 'Product Manager at TechCorp',
      mutualConnections: 12,
      avatar: `https://picsum.photos/64/64?random=1`
    },
    {
      id: 2,
      name: 'Michael Chen',
      headline: 'Software Engineer at StartupXYZ',
      mutualConnections: 8,
      avatar: `https://picsum.photos/64/64?random=2`
    }
  ];

  const suggestions = [
    {
      id: 1,
      name: 'Emily Davis',
      headline: 'Marketing Director at BrandCo',
      mutualConnections: 15,
      avatar: `https://picsum.photos/80/80?random=3`
    },
    {
      id: 2,
      name: 'David Wilson',
      headline: 'UX Designer at DesignStudio',
      mutualConnections: 6,
      avatar: `https://picsum.photos/80/80?random=4`
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      headline: 'Data Scientist at AI Solutions',
      mutualConnections: 22,
      avatar: `https://picsum.photos/80/80?random=5`
    },
    {
      id: 4,
      name: 'James Brown',
      headline: 'Sales Manager at SalesPro',
      mutualConnections: 9,
      avatar: `https://picsum.photos/80/80?random=6`
    }
  ];

  return (
    <div className="network-container">
      <div className="network-content">
        <aside className="network-sidebar">
          <div className="network-card">
            <h3>Manage my network</h3>
            <div className="network-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <div className="stat-info">
                  <span className="stat-label">Connections</span>
                  <span className="stat-value">847</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📧</span>
                <div className="stat-info">
                  <span className="stat-label">Invitations</span>
                  <span className="stat-value">{invitations.length}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👁️</span>
                <div className="stat-info">
                  <span className="stat-label">Profile views</span>
                  <span className="stat-value">38</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="network-main">
          {invitations.length > 0 && (
            <div className="network-section">
              <div className="section-header">
                <h2>Invitations ({invitations.length})</h2>
                <button className="see-all-btn">See all</button>
              </div>
              <div className="invitations-list">
                {invitations.map(invitation => (
                  <div className="invitation-card" key={invitation.id}>
                    <img src={invitation.avatar} alt={invitation.name} className="invitation-avatar" />
                    <div className="invitation-info">
                      <h4>{invitation.name}</h4>
                      <p>{invitation.headline}</p>
                      <span className="mutual-connections">{invitation.mutualConnections} mutual connections</span>
                    </div>
                    <div className="invitation-actions">
                      <button className="accept-btn">Accept</button>
                      <button className="ignore-btn">Ignore</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="network-section">
            <div className="section-header">
              <h2>People you may know</h2>
              <button className="see-all-btn">See all</button>
            </div>
            <div className="suggestions-grid">
              {suggestions.map(person => (
                <div className="suggestion-card" key={person.id}>
                  <img src={person.avatar} alt={person.name} className="suggestion-avatar" />
                  <div className="suggestion-info">
                    <h4>{person.name}</h4>
                    <p>{person.headline}</p>
                    <span className="mutual-connections">{person.mutualConnections} mutual connections</span>
                  </div>
                  <button className="connect-btn">Connect</button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Network;