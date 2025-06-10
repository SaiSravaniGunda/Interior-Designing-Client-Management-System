import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Form, Spinner, Alert } from "react-bootstrap";
import "./ProjectProgress.css"; // Import the custom CSS file

const ProjectProgress = () => {
    const { userId: designerId } = useAuth(); 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const statuses = [
        "INITIAL_DISCUSSION",
        "DESIGN_PHASE",
        "MATERIAL_PROCUREMENT",
        "EXECUTION",
        "COMPLETION"
    ];

    useEffect(() => {
        if (!designerId) return;

        axios.get(`http://localhost:8081/approved-projects/designer/${designerId}`, { withCredentials: true })
            .then(response => {
                
                setProjects(response.data);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
                toast.error("Failed to load projects.");
            })
            .finally(() => setLoading(false));
    }, [designerId]);

    const updateStatus = async (projectId, newStatus) => {
        setUpdating(true);
        try {
            await axios.put(
                `http://localhost:8081/approved-projects/${projectId}/status`,
                {}, // Empty request body
                { params: { status: newStatus }, withCredentials: true }
            );
            toast.success("Project status updated!");
            setProjects(prevProjects =>
                prevProjects.map(proj => 
                    proj.id === projectId ? { ...proj, status: newStatus } : proj
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update project status.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;

    // Filter out COMPLETION projects
const activeProjects = projects.filter(project => project.status !== "COMPLETION");

return (
  <div className="project-progress-wrapper">
    <h2 className="title">Project Progress</h2>
    <ToastContainer />

    {activeProjects.length === 0 ? (
      <Alert className="no-projects" variant="info">No projects assigned yet.</Alert>
    ) : (
      <Table striped bordered hover responsive className="project-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Project Name</th>
            <th>Current Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {activeProjects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.projectRequest?.name || "Unnamed Project"}</td>
              <td>{project.status}</td>
              <td>
                <Form.Select
                  disabled={updating}
                  value={project.status || statuses[0]}
                  onChange={(e) => updateStatus(project.id, e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);

};

export default ProjectProgress;
