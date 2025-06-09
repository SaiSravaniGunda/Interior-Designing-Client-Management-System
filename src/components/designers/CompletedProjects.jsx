import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Spinner, Alert } from "react-bootstrap";
import "./CompletedProjects.css"; // Custom CSS

const CompletedProjects = () => {
    const { userId: designerId } = useAuth(); 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!designerId) return;

        axios.get(`http://localhost:8081/approved-projects/designer/${designerId}/completed`, { withCredentials: true })
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("Error fetching completed projects:", error);
                toast.error("Failed to load completed projects.");
            })
            .finally(() => setLoading(false));
    }, [designerId]);

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;

    return (
        <div className="completed-projects-container">
            <h2 className="title">Completed Projects</h2>
            <ToastContainer />

            {projects.length === 0 ? (
                <Alert variant="info">No completed projects available.</Alert>
            ) : (
                <Table striped bordered hover responsive className="completed-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Email</th>
                            <th>Budget</th>
                            <th>Theme</th>
                            <th>Specialization</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project.id}>
                                <td>{index + 1}</td>
                                <td>{project.projectRequest?.user?.name || "N/A"}</td>
                                <td>{project.projectRequest?.user?.email || "N/A"}</td>
                                <td>₹{project.projectRequest?.budget?.toLocaleString() || "N/A"}</td>
                                <td>{project.projectRequest?.theme || "N/A"}</td>
                                <td>{project.projectRequest?.specialization || "N/A"}</td>
                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default CompletedProjects;
