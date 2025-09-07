import React, { useState } from 'react';
import '../css/AdminPage.css';
import ListOfStudentsComponent from './ListOfStudentsComponent';

const AdminPage = ({ children }) => {
  const [activeTab, setActiveTab] = useState('');

  const renderMainContent = () => {
    if (activeTab === 'students') {
      return <ListOfStudentsComponent />;
    }
    return children ? children : (
      <div className="adminpage-placeholder">
      </div>
    );
  };

  return (
    <div className="adminpage-container">
      <div className="adminpage-sidebar">
        <div className="adminpage-profile">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" className="adminpage-profile-img" />
          <div className="adminpage-profile-info">
            <div className="adminpage-profile-name">Admin User</div>
            <div className="adminpage-profile-role">School Admin</div>
          </div>
        </div>
        <nav className="adminpage-nav">
          <ul>
            <li onClick={() => setActiveTab('students')}>
              <span className="adminpage-nav-icon">👨‍🎓</span><span>Students</span>
            </li>
            <li><span className="adminpage-nav-icon">👩‍🏫</span><span>Teachers</span></li>
            <li><span className="adminpage-nav-icon">🧑‍💼</span><span>Admin</span></li>
            <li><span className="adminpage-nav-icon">⚙️</span><span>Settings</span></li>
            <li><span className="adminpage-nav-icon">📊</span><span>Reports</span></li>
            <li><span className="adminpage-nav-icon">📅</span><span>Events</span></li>
            <li><span className="adminpage-nav-icon">🔒</span><span>Logout</span></li>
          </ul>
        </nav>
        <div className="adminpage-sidebar-footer">
          <span>© 2025 Koko School</span>
        </div>
      </div>
      <div className="adminpage-main">
        {renderMainContent()}
      </div>
    </div>
  );
};

export default AdminPage;