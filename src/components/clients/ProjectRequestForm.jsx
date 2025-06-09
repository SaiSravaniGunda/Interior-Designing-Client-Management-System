import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import './ProjectRequestForm.css';

const ProjectRequestForm = () => {
  const { userId } = useAuth();
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [budget, setBudget] = useState('');
  const [theme, setTheme] = useState('');
  const [designerId, setDesignerId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericBudget = Number(budget);
    const numericDesignerId = Number(designerId);

    if (isNaN(numericBudget) || isNaN(numericDesignerId)) {
      alert('Please enter valid numbers for Budget and Designer ID');
      return;
    }

    const newProjectRequest = {
      name,
      specialization,
      budget: numericBudget,
      theme,
      designerId: numericDesignerId,
      userId,
      status: 'PENDING',
    };

    try {
      await axios.post('http://localhost:8081/project-requests/create', newProjectRequest, {
        withCredentials: true,
      });
      alert('Project request submitted!');
    } catch (err) {
      console.error('Error creating project request', err);
      alert('Failed to submit project request');
    }
  };

  return (
    <div className="project-request-container">
      <h2 className="form-title">Request a New Project</h2>
      <form onSubmit={handleSubmit} className="project-request-form">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            className="form-input"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Specialization</label>
          <input 
            type="text" 
            className="form-input"
            value={specialization} 
            onChange={(e) => setSpecialization(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Budget</label>
          <input 
            type="number"
            className="form-input"
            value={budget} 
            onChange={(e) => setBudget(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Theme</label>
          <input 
            type="text" 
            className="form-input"
            value={theme} 
            onChange={(e) => setTheme(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Designer ID</label>
          <input 
            type="number"
            className="form-input"
            value={designerId} 
            onChange={(e) => setDesignerId(e.target.value)} 
            required 
          />
          <small className="designer-id-note">
            To get the Designer ID, please explore our designers and view their portfolios. Ensure you enter the correct Designer ID.
          </small>
        </div>
        <button type="submit" className="submit-button">Submit Request</button>
      </form>
    </div>
  );
};

export default ProjectRequestForm;
