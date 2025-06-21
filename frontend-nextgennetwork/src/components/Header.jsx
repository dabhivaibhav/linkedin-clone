import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };
  
  const handleViewProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-search">
          <div className="logo">NGN</div>
          <div className="search-box">
            <span className="nav-icon">🔍</span>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item" onClick={() => navigate('/home')}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/network')}>
            <span className="nav-icon">👥</span>
            <span>Network</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/jobs')}>
            <span className="nav-icon">💼</span>
            <span>Jobs</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/messaging')}>
            <span className="nav-icon">💬</span>
            <span>Messaging</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/notifications')}>
            <span className="nav-icon">🔔</span>
            <span>Notifications</span>
          </div>
          <div className="nav-item profile-dropdown" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <div className="profile-image">
              <img src={`https://picsum.photos/24/24?random=${Math.floor(Math.random() * 1000)}`} alt="Profile" />
            </div>
            <span>Me</span>
            {showProfileDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleViewProfile}>
                  View Profile
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;