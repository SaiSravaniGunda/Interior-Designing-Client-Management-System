import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PortfolioDetail = () => {
  const { designerId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/portfolios/${designerId}`);
        setPortfolio(response.data);
        setProjects(response.data.projects || []);
      } catch (error) {
        setError("Portfolio not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [designerId]);

  if (loading) return <p>Loading portfolio...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>{portfolio.title}</h2>
      <p>{portfolio.description}</p>
      <h3>Projects</h3>
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="col-md-4">
              <div className="card mb-3">
                <img src={`/${project.image}`} className="card-img-top" alt={project.name} />
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">Specialization: {project.specialization}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioDetail;
