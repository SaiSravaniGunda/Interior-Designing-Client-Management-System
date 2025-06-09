import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./MyDesigners.css"; // Import the CSS file

const MyDesigners = () => {
  const { userId: clientId } = useAuth();
  const [designers, setDesigners] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (!clientId) return;

    const fetchDesigners = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/project-requests/my-designers/${clientId}`);
        setDesigners(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };

    fetchDesigners();
  }, [clientId]);

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      try {
        const counts = {};
        for (let project of designers) {
          const response = await axios.get(`http://localhost:8081/api/messages/unread/${clientId}/from/${project.designer?.id}`, {
            withCredentials: true,
          });
          counts[project.designer?.id] = response.data;
        }
        setUnreadCounts(counts);
      } catch (error) {
        console.error("Error fetching unread message counts:", error);
      }
    };

    if (designers.length > 0) {
      fetchUnreadCounts();
    }
  }, [designers]);

  return (
    <div className="my-designers-container">
      <h2 className="my-designers-header">My Designers</h2>
      {designers.length === 0 ? (
        <p className="no-designers">No approved designers yet.</p>
      ) : (
        <ul className="designer-list">
          {designers.map((project) => (
            <li key={project.id} className="designer-item">
              <div className="designer-info">
                <strong>Designer:</strong> {project.designer?.name || "Unknown"} <br />
                <strong className="designer-email">Email:</strong> {project.designer?.email || "Unknown"} <br />
                <strong>Project:</strong> {project.name}
              </div>
              <div className="message-status">
                {unreadCounts[project.designer?.id] > 0 ? (
                  <span className="unread-messages">Unread Messages: {unreadCounts[project.designer?.id]}</span>
                ) : (
                  <span className="no-unread">No unread messages</span>
                )}
              </div>
              <Link to={`/chat/${clientId}/${project.designer?.id}`}>
                <button className="chat-button">Chat</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDesigners;
