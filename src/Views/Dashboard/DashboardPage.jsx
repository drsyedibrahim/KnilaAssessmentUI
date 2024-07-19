import React, { useContext }  from 'react';
import { Outlet } from "react-router-dom"
import Navbar from '../../Components/NavBar/NavBar'
import AppBar from '../../Components/Header/AppBar'
import './DashboardPage.css'
// import { Link } from 'react-router-dom';

const Dashboard = ({ setToken }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <AppBar token={setToken} />
      </header>
      <div className="dashboard-container">
        <aside className="sidebar">
          <Navbar />
        </aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;