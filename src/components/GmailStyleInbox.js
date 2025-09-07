import React, { useState } from 'react';
import '../css/GmailStyleInbox.css';

// Sidebar data
const sidebarItems = [
  { id: 'inbox', label: 'Inbox', icon: '📥', count: 12 },
  { id: 'sent', label: 'Sent', icon: '📤' },
  { id: 'drafts', label: 'Drafts', icon: '📝', count: 3 },
  { id: 'deleted', label: 'Deleted', icon: '🗑️' },
  { id: 'spam', label: 'Spam', icon: '🚫' },
  { id: 'archive', label: 'Archive', icon: '📦' },
];

// Email data
const emails = [
  { id: 1, from: 'John Doe', subject: 'Project Update Meeting', date: 'Feb 15', starred: true },
  { id: 2, from: 'Jane Smith', subject: 'Weekly Report', date: 'Feb 14', starred: false },
  { id: 3, from: 'Team Lead', subject: 'Feedback on Design', date: 'Feb 13', starred: false },
];

const GmailStyleInbox = () => {
  const [activeMenu, setActiveMenu] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = emails.filter(
    e =>
      e.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" role="main" aria-label="Email client interface">
      
      {/* Sidebar */}
      <nav className="sidebar" aria-label="Mailbox folders">
        <button className="compose-btn" aria-label="Compose new email">
          ➕ Compose
        </button>
        <ul>
          {sidebarItems.map(({ id, label, icon, count }) => (
            <li
              key={id}
              className={`menu-item ${activeMenu === id ? 'active' : ''}`}
              onClick={() => setActiveMenu(id)}
              role="menuitem"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveMenu(id);
                }
              }}
              aria-current={activeMenu === id ? 'page' : undefined}
            >
              <span className="icon" aria-hidden="true">{icon}</span>
              <span>{label}</span>
              {count ? <span className="count" aria-label={`${count} unread messages`}>{count}</span> : null}
            </li>
          ))}
        </ul>
      </nav>

      {/* Inbox Content */}
      <section className="content" aria-label="Email inbox">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search emails..."
            aria-label="Search emails"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <table role="table" aria-label="Inbox emails">
          <thead>
            <tr>
              <th scope="col">From</th>
              <th scope="col">Subject</th>
              <th scope="col">Date</th>
              <th scope="col" aria-label="Starred status"></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmails.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-emails">
                  No emails found.
                </td>
              </tr>
            ) : (
              filteredEmails.map(({ id, from, subject, date, starred }) => (
                <tr
                  key={id}
                  tabIndex={0}
                  aria-label={`Email from ${from} with subject ${subject} dated ${date}`}
                >
                  <td>{from}</td>
                  <td>{subject}</td>
                  <td>{date}</td>
                  <td className="star" aria-hidden="true">{starred ? '⭐' : ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GmailStyleInbox;
