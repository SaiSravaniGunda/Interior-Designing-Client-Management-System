import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Space with InterioFlow</h1>
          <p>
            Connect with top designers, discover premium products, and bring your dream interiors to life.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn primary">Get Started</Link>
            <Link to="/portfolios" className="btn secondary">Explore Designs</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose InterioFlow?</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Top Designers</h3>
            <p>Browse professional portfolios and collaborate with the best designers.</p>
          </div>
          <div className="feature">
            <h3>Seamless Project Management</h3>
            <p>Track your projects, chat with designers, and manage everything effortlessly.</p>
          </div>
          <div className="feature">
            <h3>Exclusive Vendor Marketplace</h3>
            <p>Find and purchase high-quality furniture and decor from trusted vendors.</p>
          </div>
        </div>
      </section>

      {/* Designer & Vendor Showcase */}
      <section className="showcase">
        <div className="showcase-item">
          <h3>For Designers</h3>
          <p>Showcase your portfolio and connect with potential clients effortlessly.</p>
          <Link to="/register" className="btn showcase-btn">Join as Designer</Link>
        </div>
        <div className="showcase-item">
          <h3>For Vendors</h3>
          <p>Sell your furniture and decor products to a dedicated audience.</p>
          <Link to="/register" className="btn showcase-btn">Join as Vendor</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>"InterioFlow helped me find the perfect designer for my home!"</p>
            <h4>- Emily R.</h4>
          </div>
          <div className="testimonial">
            <p>"As a vendor, I’ve reached more customers than ever before!"</p>
            <h4>- Michael T.</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Start Your Interior Journey Today!</h2>
        <p>Join InterioFlow and bring your dream interiors to life.</p>
        <Link to="/register" className="btn primary">Sign Up Now</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 InterioFlow. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
