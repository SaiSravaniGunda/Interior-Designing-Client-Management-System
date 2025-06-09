import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaUserTie, FaFileAlt, FaTasks, FaComments,FaShoppingCart } from "react-icons/fa";
import './ClientDashboard.css';

const ClientDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Client Dashboard</h2>
        <ul>
         
          <li>
            <Link to="/new-project-request"><FaFileAlt className="icon" /> New Project Request</Link>
          </li>
          <li>
            <Link to="/my-projects"><FaTasks className="icon" /> Project Progress</Link>
          </li>
          <li>
            <Link to="/my-designers"><FaComments className="icon" /> My Designers</Link>
          </li>
          <li>
            <Link to="/my-orders"><FaShoppingCart className="icon" /> My Orders</Link>
          </li>
        </ul>
      </div>

      {/* Main Content with Cool UI */}
      <div className="main-content" style={{ backgroundColor: "#fffc8" }}>
        <h3 className="dashboard-welcome" style={{color:"black"}}>Welcome to Your Dashboard</h3>
        <p className="dashboard-description">
          Easily manage your projects and collaborate with designers. Follow these steps:
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card " style={{ backgroundColor: '#d0bfff' }}>
            <FaUserTie className="card-icon" />
            <h4>Explore Designers</h4>
            <p>Browse skilled designers and choose the right one for your project.</p>
          </div>

          <div className="dashboard-card  " style={{ backgroundColor: '#a5d8ff' }}>
            <FaFileAlt className="card-icon" />
            <h4>New Project Request</h4>
            <p>Submit a request to your selected designer with project details.</p>
          </div>

          <div className="dashboard-card " style={{ backgroundColor: '#ffec99' }}>
            <FaTasks className="card-icon" />
            <h4>Project Progress</h4>
            <p>Track your project status (approved, rejected, or in progress).</p>
          </div>

          <div className="dashboard-card" style={{ backgroundColor: '#b2f2bb' }}>
            <FaComments className="card-icon " />
            <h4>My Designers</h4>
            <p>Communicate with designers who have approved your requests.</p>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#ffc9c9' }}>
            <FaShoppingCart className="card-icon orders" />
            <h4>My Orders</h4>
            <p>View your orders, along with the delivery status and payment status of each product you ordered. </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
