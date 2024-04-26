import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/recovery/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            token: searchParams.get("token"),
            userId: searchParams.get("userid"),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Assuming server sends a message upon successful reset
      } else {
        const errorData = await response.json();
        setMessage(errorData.error); // Display error message from the server
      }

      navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
