import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewPortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get("http://localhost:8081/portfolios/explore");
        setPortfolios(response.data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Explore Portfolios</h2>
      <div className="row">
        {portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div key={portfolio.id} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{portfolio.title}</h5>
                  <p className="card-text">{portfolio.description}</p>
                  <Link to={`/portfolio/${portfolio.designer.designerId}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No portfolios found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPortfolios;
