import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Chat.css"; // Import styles

const Chat = () => {
  const { senderId, recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  // Fetch chat history and unread messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch full chat history
        const historyResponse = await axios.get(
          `http://localhost:8081/api/messages/history/${senderId}/with/${recipientId}`,
          { withCredentials: true }
        );

        // Fetch unread messages
        const unreadResponse = await axios.get(
          `http://localhost:8081/api/messages/unread-messages/${senderId}/from/${recipientId}`,
          { withCredentials: true }
        );

        // Merge and sort messages by timestamp
        const allMessages = [...historyResponse.data, ...unreadResponse.data].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setMessages(allMessages);

        // Mark unread messages as read
        if (unreadResponse.data.length > 0) {
          await axios.post(
            `http://localhost:8081/api/messages/mark-read/${senderId}/from/${recipientId}`,
            {},
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [senderId, recipientId]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !file) return;

    try {
      const formData = new FormData();
      formData.append("senderId", senderId);
      formData.append("recipientId", recipientId);
      formData.append("content", newMessage);
      if (file) formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8081/api/messages/send",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">Chat</h2>
      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender.id == senderId ? "sent" : "received"}`}
          >
            <p>{msg.content}</p>
            {msg.fileUrl && (
             <a href={`http://localhost:8081/api/files/${msg.fileUrl.split("/").pop()}`} download>
             Download Attachment
           </a>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <label htmlFor="fileInput" className="file-label">
        📎
        </label>
        <input type="file"  id="fileInput" style={{ display: "none" }}  onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
