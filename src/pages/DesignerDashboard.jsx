import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./DesignerDashboard.css";

const DesignerDashboard = () => {
  const { userId: designerId } = useAuth();
  const [projectRequests, setProjectRequests] = useState(0);
  const [approvedProjectsCount, setApprovedProjectsCount] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [inProgressProjects, setInProgressProjects] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    if (!designerId) return;

    // Fetch Project Requests Count
    axios
      .get(`http://localhost:8081/project-requests/count?designerId=${designerId}`, {
        withCredentials: true,
      })
      .then((response) => setProjectRequests(response.data))
      .catch((error) => console.error("Error fetching project requests:", error));

    // Fetch Approved Projects Count
    axios
      .get(`http://localhost:8081/approved-projects/designer/${designerId}/count`, {
        withCredentials: true,
      })
      .then((response) => setApprovedProjectsCount(response.data))
      .catch((error) => console.error("Error fetching approved projects count:", error));

    // Fetch Completed Projects Count
    axios
      .get(`http://localhost:8081/approved-projects/designer/${designerId}/completed-count`, {
        withCredentials: true,
      })
      .then((response) => setCompletedProjects(response.data))
      .catch((error) => console.error("Error fetching completed projects count:", error));

    // Fetch Approved Projects to Calculate Earnings
    axios
      .get(`http://localhost:8081/approved-projects/designer/${designerId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const approvedProjects = response.data;
        console.log(approvedProjects);
        const earnings = approvedProjects.reduce(
          (sum, p) => (p.status === "COMPLETION" ? sum + (p.projectRequest.budget || 0) : sum),
          0
        );
        setTotalEarnings(earnings);
      })
      .catch((error) => console.error("Error fetching approved projects:", error));
  }, [designerId]);

  // Calculate In-Progress Projects Count
  useEffect(() => {
    setInProgressProjects(approvedProjectsCount - completedProjects);
  }, [approvedProjectsCount, completedProjects]);

  const data = {
    labels: ["Completed Projects", "In Progress", "Project Requests", "Approved Projects"],
    datasets: [
      {
        label: "Project Statistics",
        data: [completedProjects, inProgressProjects, projectRequests, approvedProjectsCount],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#8E44AD"],
      },
    ],
  };

  return (
    <div className={`dashboard-container ${projectRequests === 0 ? "empty-dashboard" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li>
            <Link to="/designer/project-requests">📋 Project Requests</Link>
          </li>
          <li>
            <Link to="/designer/project-progress">🚀 Project Progress</Link>
          </li>
          <li>
            <Link to="/designer/my-clients">👥 My Clients</Link>
          </li>
          <li>
            <Link to="/designer/completed-projects">✅ Completed Projects</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {projectRequests === 0 ? (
          <div className="empty-state">
            <p>No Project Requests Yet!!!</p>
            <p>😔 No worries, I’ve got your back! 🚀</p>
            <h4>Boost your portfolio and get project requests from clients! </h4>
          </div>
        ) : (
          <>
            <h2>Welcome to Your Dashboard</h2>
            <div className="stats-container">
              <div className="stat-box completed">
                <h3 className="heads">✅ Completed Projects</h3>
                <p>{completedProjects}</p>
              </div>
              <div className="stat-box in-progress">
                <h3 className="heads">🚀 In Progress</h3>
                <p>{inProgressProjects}</p>
              </div>
              <div className="stat-box earnings">
                <h3 className="heads">💰 Total Earnings</h3>
                <p >₹{totalEarnings}</p>
              </div>
              <div className="stat-box approved">
                <h3 className="heads">📌 Approved Projects</h3>
                <p>{approvedProjectsCount}</p>
              </div>
            </div>
            <div className="chart-container">
              <Bar data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DesignerDashboard;
