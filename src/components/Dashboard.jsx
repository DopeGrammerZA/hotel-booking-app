import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-sections">
        <section className="dashboard-summary">
          <h2>Summary Stats</h2>
          <div className="stats">
            <div className="stat-item">
              <h3>Total Users</h3>
              <p>1,234</p>
            </div>
            <div className="stat-item">
              <h3>Rooms Booked</h3>
              <p>567</p>
            </div>
            <div className="stat-item">
              <h3>Revenue</h3>
              <p>$12,345</p>
            </div>
          </div>
        </section>

        <section className="dashboard-recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>User John Doe booked Room 101</li>
            <li>User Jane Smith updated profile</li>
            <li>Room 203 was checked out</li>
          </ul>
        </section>

        <section className="dashboard-user-info">
          <h2>User Info</h2>
          <p>Welcome, [Username]</p>
          <p>Email: user@example.com</p>
        </section>

        <section className="dashboard-quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/rooms">Manage Rooms</a></li>
            <li><a href="/users">Manage Users</a></li>
            <li><a href="/reports">View Reports</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
