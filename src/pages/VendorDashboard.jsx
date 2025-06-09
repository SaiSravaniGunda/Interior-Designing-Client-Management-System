import React from "react";
import { Link } from "react-router-dom";
import {
  FaStore,
  FaPlusSquare,
  FaBoxes,
  FaEdit,
  FaClipboardList,
} from "react-icons/fa";
// import "./VendorDashboard.css";

const VendorDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Vendor Dashboard</h2>
        <ul>
          <li>
            <Link to="/vendor/add-product"><FaPlusSquare className="icon" /> Add Product</Link>
          </li>
          <li>
            <Link to="/vendor/view-products"><FaBoxes className="icon" /> View Products</Link>
          </li>
          <li>
            <Link to="/vendor/view-orders"><FaClipboardList className="icon" /> View Orders</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ backgroundColor: "#fffce8" }}>
        <h3 className="dashboard-welcome" style={{ color: "black" }}>Welcome to Your Vendor Panel</h3>
        <p className="dashboard-description">
          Manage your shop, products, and orders with ease:
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card" style={{ backgroundColor: '#ffd6a5' }}>
            <FaStore className="card-icon" />
            <h4>Create Your Shop</h4>
            <p>Set up your shop and showcase your offerings to designers and clients.</p>
          </div>

          <div className="dashboard-card" style={{ backgroundColor: '#caffbf' }}>
            <FaPlusSquare className="card-icon" />
            <h4>Add Products</h4>
            <p>Add new interior products with descriptions and pricing to your shop.</p>
          </div>

          <div className="dashboard-card" style={{ backgroundColor: '#9bf6ff' }}>
            <FaBoxes className="card-icon" />
            <h4>View/Edit Products</h4>
            <p>Review all your listed products and make changes as needed.</p>
          </div>

          <div className="dashboard-card" style={{ backgroundColor: '#bdb2ff' }}>
            <FaClipboardList className="card-icon" />
            <h4>Manage Orders</h4>
            <p>Check incoming orders, update their status, and handle delivery details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
