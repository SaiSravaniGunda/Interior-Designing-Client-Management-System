import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Spinner, Alert, ProgressBar, Card } from "react-bootstrap";
import "./ClientProjectProgress.css"; 

const ClientProjectProgress = () => {
    const { userId: clientId } = useAuth();
    const [approvedProjects, setApprovedProjects] = useState([]);
    const [rejectedProjects, setRejectedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusStages = {
        "INITIAL_DISCUSSION": 10,
        "DESIGN_PHASE": 30,
        "MATERIAL_PROCUREMENT": 50,
        "EXECUTION": 80,
        "COMPLETION": 100
    };

    useEffect(() => {
        if (!clientId) return;

        const fetchProjects = async () => {
            try {
                const [approvedRes, rejectedRes] = await Promise.all([
                    axios.get(`http://localhost:8081/approved-projects/client/${clientId}`, { withCredentials: true }),
                    axios.get(`http://localhost:8081/project-requests/rejected/client/${clientId}`, { withCredentials: true })
                ]);

                setApprovedProjects(approvedRes.data);
                setRejectedProjects(rejectedRes.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [clientId]);

    if (loading) return <Spinner animation="border" className="loader" />;

    return (
        <div className="project-progress-container">
            <h2 className="title">My Project Progress</h2>

            {/* Approved Projects */}
            {approvedProjects.length === 0 ? (
                <Alert variant="info" className="no-projects">No approved projects assigned yet.</Alert>
            ) : (
                approvedProjects.map((project) => (
                    <Card key={project.id} className="project-card">
                        <Card.Body>
                            <Card.Title className="project-title">{project.projectRequest.name}</Card.Title>
                            <Card.Text className="project-status"><strong>Status:</strong> {project.status.replace("_", " ")}</Card.Text>
                            <ProgressBar 
                                now={statusStages[project.status]} 
                                label={`${statusStages[project.status]}%`} 
                                className="custom-progress-bar"
                            />
                        </Card.Body>
                    </Card>
                ))
            )}

            {/* Rejected Projects */}
            <h3 className="title">Rejected Projects</h3>
            {rejectedProjects.length === 0 ? (
                <Alert variant="danger" className="no-projects">No rejected projects.</Alert>
            ) : (
                rejectedProjects.map((project) => (
                    <Card key={project.id} className="project-card rejected">
                        <Card.Body>
                            <Card.Title className="project-title">{project.name}</Card.Title>
                            <Card.Text className="project-status"><strong>Status:</strong> REJECTED</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default ClientProjectProgress;
