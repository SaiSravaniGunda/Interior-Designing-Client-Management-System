import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import './CreatePortfolio.css';

const API_URL = "http://localhost:8081";

const CreatePortfolio = () => {
    const { userId } = useAuth(); // Get userId from AuthContext
    const [portfolio, setPortfolio] = useState(null);
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: "", specialization: "", imageUrl: "" });
    const [loading, setLoading] = useState(true);
    const [hasPortfolio, setHasPortfolio] = useState(false);

    // Check if Portfolio exists
    useEffect(() => {
        if (userId) {
            checkPortfolioExists();
        }
    }, [userId]);

    const checkPortfolioExists = async () => {
        try {
            const response = await axios.get(`${API_URL}/portfolios/isPortfolio/${userId}`, { withCredentials: true });
            setHasPortfolio(response.data); // true or false
            if (response.data) {
                fetchPortfolio(); // Fetch portfolio and projects if it exists
            }
        } catch (error) {
            console.error("Error checking portfolio:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const response = await axios.get(`${API_URL}/portfolios/${userId}`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            // console.log(response.data);
            setPortfolio(response.data);
            // Fetch the projects for the specific portfolio
            fetchProjects(response.data.id);
        } catch (error) {
            console.error("No portfolio found:", error.response?.data || error.message);
        }
    };

    const fetchProjects = async (portfolioId) => {
        try {
            const response = await axios.get(`${API_URL}/projects/${portfolioId}`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            // console.log(response.data);
            setProjects(response.data); // Set the fetched projects
        } catch (error) {
            console.error("Error fetching projects:", error.response?.data || error.message);
        }
    };

    const handleCreatePortfolio = async () => {
        if (!userId) {
            console.error("User ID not found.");
            return;
        }

        try {
            const portfolioData = {
                id: userId,
                skills,
                experience
            };

            const response = await axios.post(
                `${API_URL}/portfolios/create`,
                portfolioData,
                { withCredentials: true }
            );
            setPortfolio(response.data);
            setHasPortfolio(true); // Mark portfolio as created
            fetchProjects(response.data.id); // Fetch projects after creating portfolio
        } catch (error) {
            console.error("Error creating portfolio:", error.response?.data || error.message);
        }
    };

    const handleAddProject = async () => {
        if (!portfolio) return;

        try {
            const response = await axios.post(
                `${API_URL}/projects/add?portfolioId=${portfolio.id}`,
                newProject,
                { withCredentials: true }
            );
            setProjects([...projects, response.data]);
            setNewProject({ name: "", specialization: "", imageUrl: "" });
        } catch (error) {
            console.error("Error adding project:", error.response?.data || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="portfolio-container">
            {hasPortfolio ? (
                <div className="portfolio-section">
                    <h2 className="portfolio-heading">My Portfolio</h2>
                    <p><strong>Skills:</strong> {portfolio?.skills}</p>
                    <p><strong>Experience:</strong> {portfolio?.experience} years</p>

                    <div className="project-section">
                        <h3  className="portfolio-heading">Add Project</h3>
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Specialization"
                            value={newProject.specialization}
                            onChange={(e) => setNewProject({ ...newProject, specialization: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newProject.imageUrl}
                            onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                        />
                        <button onClick={handleAddProject}>Add Project</button>
                    </div>

                    <div className="projects-list">
                        <h3>Projects</h3>
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div key={index} className="project-item">
                                    <p><strong>{project.name}</strong> ({project.specialization})</p>
                                    {project.imageUrl && (
                                        <img src={project.imageUrl} alt={project.name} width="150" />
                                    )}
                                </div>
                            ))
                        ) : <p>No projects added yet.</p>}
                    </div>
                </div>
            ) : (
                <div className="create-portfolio-section">
                    <h2 className="portfolio-heading">Create Portfolio</h2>
                    <input
                        type="text"
                        placeholder="Skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Experience (years)"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                    <button onClick={handleCreatePortfolio}>Create Portfolio</button>
                </div>
            )}
        </div>
    );
};

export default CreatePortfolio;
