import React, { useState, useEffect } from "react";
import "./settings.css";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [targetHours, setTargetHours] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user data and set initial values for profile fields and target hours
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8081/settings/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setFirstName(userData.FirstName);
        setLastName(userData.LastName);
        setEmail(userData.email);
        setTargetHours(userData.targetHours);
      } else {
        // Handle error response from the server
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          targetHours,
        }),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/settings/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Password updated successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default Settings;
