import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import './DesignerPortfolio.css'; // Import the CSS file

const DesignerPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false); // State to track if the ID was copied

  const location = useLocation(); // Use location hook to get passed state
  const { selectedPortfolio } = location.state || {}; // Extract selectedPortfolio

  useEffect(() => {
    if (selectedPortfolio) {
      fetchProjects(selectedPortfolio.id); // Fetch projects for the selected portfolio
    }
  }, [selectedPortfolio]);

  const fetchProjects = async (portfolioId) => {
    try {
      const response = await axios.get(`http://localhost:8081/projects/${portfolioId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setProjects(response.data); // Set projects for the portfolio
    } catch (error) {
      setError(error.response?.data || error.message); // Set error if something goes wrong
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => console.error("Error copying to clipboard:", err));
  };

  if (loading) return <p>Loading projects...</p>;

  // Display error if any
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="designer-portfolio-container">
      {selectedPortfolio && (
        <>
          <h2 className="portfolio-heading">Portfolio of {selectedPortfolio.designer.name}</h2>
          <p className="portfolio-info"><strong>Skills:</strong> {selectedPortfolio.skills}</p>
          <p className="portfolio-info"><strong>Experience:</strong> {selectedPortfolio.experience} years</p>
          
          {/* Copy Designer ID Button */}
          <div className="copy-button-container">
            <button className="copy-button" onClick={() => copyToClipboard(selectedPortfolio.designer.id)}>
              {copied ? "Copied!" : "Copy Designer ID"}
            </button>
          </div>

          <h4 className="projects-heading">Projects</h4>
          {projects.length > 0 ? (
            <div className="projects-list">
              {projects.map((project, index) => (
                <div key={index} className="project-item">
                  <p className="project-title"><strong>{project.name}</strong> ({project.specialization})</p>
                  {project.imageUrl && (
                    <img className="project-image" src={project.imageUrl} alt={project.name} width="150" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No projects added yet for this portfolio.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DesignerPortfolio;
