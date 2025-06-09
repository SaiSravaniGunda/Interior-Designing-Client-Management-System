import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Spinner, Alert, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./PendingProjects.css";

const PendingProjects = () => {
    const { userId } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError("Designer ID is missing");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:8081/project-requests?designerId=${userId}`, {
            withCredentials: true
        })
            .then(response => {
                setProjects(response.data || []);
                setError(null);
            })
            .catch(error => {
                setError(error.response?.data?.message || "Error fetching projects");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    const handleApprove = (projectId) => {
        axios.put(`http://localhost:8081/project-requests/approve/${projectId}`, {}, {
            withCredentials: true
        })
            .then(() => {
                setProjects(prevProjects =>
                    prevProjects.map(proj =>
                        proj.id === projectId ? { ...proj, status: "Approved" } : proj
                    )
                );
            })
            .catch(error => {
                setError(error.response?.data?.message || "Error approving project");
            });
    };

    const handleReject = (projectId) => {
        axios.put(`http://localhost:8081/project-requests/reject/${projectId}`, {}, {
            withCredentials: true
        })
            .then(() => {
                setProjects(prevProjects =>
                    prevProjects.map(proj =>
                        proj.id === projectId ? { ...proj, status: "Rejected" } : proj
                    )
                );
            })
            .catch(error => {
                setError(error.response?.data?.message || "Error rejecting project");
            });
    };

    return (
        <Container className="pending-projects-container">
            <h2 className="heading">Pending Project Requests</h2>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && projects.length === 0 && (
                <Alert variant="info" className="text-center">No pending projects found.</Alert>
            )}

            {!loading && projects.length > 0 && (
                <Row>
                    {projects.map((project) => (
                        <Col md={6} lg={4} key={project.id} className="mb-4">
                            <Card className="project-card">
                                <Card.Body>
                                    <Card.Title className="project-title">{project.name}</Card.Title>
                                    <Card.Text className="project-info">
                                        <div><strong>Specialization:</strong> {project.specialization}</div>
                                        <div><strong>Budget:</strong> ₹{project.budget}</div>
                                        <div><strong>Theme:</strong> {project.theme}</div>
                                        <div><strong>Status:</strong> 
                                            <span className={`status-badge ${project.status.toLowerCase()}`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </Card.Text>

                                    {project.status === "Pending" && (
                                        <div className="button-group">
                                            <Button variant="success" size="sm" onClick={() => handleApprove(project.id)}>
                                                ✅ Approve
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleReject(project.id)}>
                                                ❌ Reject
                                            </Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default PendingProjects;
