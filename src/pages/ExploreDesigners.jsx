import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './ExploreDesigners.css';

const API_URL = "http://localhost:8081";

const ExploreDesigners = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch designers when the component mounts
  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const response = await axios.get(`${API_URL}/portfolios/`, { withCredentials: true });
      setDesigners(response.data); // Store designer list
    } catch (error) {
      console.error("Error fetching designers:", error.response?.data || error.message);
      setError("Failed to load designers. Please try again later."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const handleViewPortfolio = (designerData) => {
    // Navigate to the portfolio page and pass the selectedPortfolio as state
    navigate(`/portfolio/${designerData.id}`, { state: { selectedPortfolio: designerData } });
  };

  if (loading) return <p>Loading designers...</p>;

  return (
    <div className="explore-designers-container">
      <h2 className="explore-heading">Explore Designers</h2>

      {error && <p className="error-message">{error}</p>} {/* Display error if any */}

      <div className="designers-list">
        {designers.length === 0 ? (
          <p>No designers available</p>
        ) : (
          designers.map((designerData) => {
            const designer = designerData.designer;

            return (
              <div key={designer.id} className="designer-item">
                <p><strong>Designer Name:</strong> {designer.name}</p>
                <p><strong>Skills:</strong> {designerData.skills}</p>
                <p><strong>Experience:</strong> {designerData.experience} years</p>
                <button className="view-portfolio-btn" onClick={() => handleViewPortfolio(designerData)}>
                  View Portfolio
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExploreDesigners;
