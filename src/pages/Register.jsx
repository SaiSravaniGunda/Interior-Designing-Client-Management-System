import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const getPasswordStrength = (password) => {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
};

const calculateStrengthLabel = (strength) => {
  const passedRules = Object.values(strength).filter(Boolean).length;

  if (passedRules === 5) return { label: "Strong", emoji: "🟢" };
  if (passedRules >= 3) return { label: "Moderate", emoji: "🟠" };
  if (passedRules > 0) return { label: "Weak", emoji: "🔴" };
  return { label: "", emoji: "" };
};

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("USER");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [strength, setStrength] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setStrength(getPasswordStrength(value));
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole.toUpperCase());
  };

  // Check if password meets all requirements (all true)
  const isPasswordStrong = Object.values(strength).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      alert("Password does not meet all the requirements. Please fix it before registering.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8081/auth/register",
        {
          ...formData,
          role,
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

  const { label, emoji } = calculateStrengthLabel(strength);

  return (
    <div className="register-container">
      <h2 className="text-center">Register</h2>

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

        {/* Password strength feedback */}
        <div className="password-hints">
          <p>Password must contain:</p>
          <ul>
            <li className={strength.length ? "valid" : "invalid"}>
              At least 8 characters
            </li>
            <li className={strength.upper ? "valid" : "invalid"}>
              At least one uppercase letter
            </li>
            <li className={strength.lower ? "valid" : "invalid"}>
              At least one lowercase letter
            </li>
            <li className={strength.number ? "valid" : "invalid"}>
              At least one number
            </li>
            <li className={strength.special ? "valid" : "invalid"}>
              At least one special character (!@#$%^&*)
            </li>
          </ul>
          {label && (
            <p className={`strength-label ${label.toLowerCase()}`}>
              Password strength: {emoji} <strong>{label}</strong>
            </p>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={!isPasswordStrong}>
          Register
        </button>

        {!isPasswordStrong && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Password must meet all requirements to register.
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
