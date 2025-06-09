import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; 
import { Link } from "react-router-dom";
import "./MyClient.css"; // Import the CSS file

const MyClient = () => {
  const { userId: designerId } = useAuth();
  const [clients, setClients] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    if (!designerId) return;

    const fetchClients = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/project-requests/my-clients/${designerId}`);
        setClients(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [designerId]);

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      try {
        const counts = {};
        for (let client of clients) {
          const response = await axios.get(`http://localhost:8081/api/messages/unread/${designerId}/from/${client.user?.id}`,{
            withCredentials:true
          });
          counts[client.user?.id] = response.data;
        }
        setUnreadCounts(counts);
      } catch (error) {
        console.error("Error fetching unread message counts:", error);
      }
    };

    if (clients.length > 0) {
      fetchUnreadCounts();
    }
  }, [clients]);

  return (
    <div className="my-client-container">
      <h2 className="my-client-header">My Clients</h2>
      {clients.length === 0 ? (
        <p className="no-clients">No approved clients yet.</p>
      ) : (
        <ul className="client-list">
          {clients.map((project) => (
            <li key={project.id} className="client-item">
              <div className="client-info">
                <strong>Client:</strong> {project.user?.name || "Unknown"} <br />
                <strong>Email:</strong> {project.user?.email || "Unknown"} <br/>
                <strong>Project:</strong> {project.name}
              </div>
              <div className="message-status">
                {unreadCounts[project.user?.id] > 0 ? (
                  <span className="unread-messages">Unread Messages: {unreadCounts[project.user?.id]}</span>
                ) : (
                  <span className="no-unread">No unread messages</span>
                )}
              </div>
              <Link to={`/chat/${designerId}/${project.user?.id}`}>
                <button className="chat-button">Chat</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyClient;
