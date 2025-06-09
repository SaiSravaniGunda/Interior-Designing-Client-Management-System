import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("USER"); // Default role should be USER
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedRole) => {
    // Convert role to uppercase to match Enum values in the backend
    const formattedRole = selectedRole.toUpperCase(); 
    setRole(formattedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8081/auth/register",
        {
          ...formData,
          role, // Sending uppercase role (USER, DESIGNER, VENDOR)
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User registered:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="register-container">
      <h2 className="text-center">Register</h2>

      {/* Role Selection */}
      <div className="role-selection">
        <button
          className={`role-btn ${role === "USER" ? "active" : ""}`}
          onClick={() => handleRoleChange("USER")}
        >
          Sign up as User
        </button>
        <button
          className={`role-btn ${role === "DESIGNER" ? "active" : ""}`}
          onClick={() => handleRoleChange("DESIGNER")}
        >
          Sign up as Designer
        </button>
        <button
          className={`role-btn ${role === "VENDOR" ? "active" : ""}`}
          onClick={() => handleRoleChange("VENDOR")}
        >
          Sign up as Vendor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
