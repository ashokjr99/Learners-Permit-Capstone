import React from "react";

const Contact = ({ goHome }) => {
  return (
    <div
      className="w3-panel w3-card-4 margin-l-p margin-r-p"
      style={{ marginLeft: "25%" }}
    >
      <div className="w3-container">
        <button onClick={() => goHome()}>🏠</button>
        <h2>Contact</h2>
      </div>
    </div>
  );
};

export default Contact;
