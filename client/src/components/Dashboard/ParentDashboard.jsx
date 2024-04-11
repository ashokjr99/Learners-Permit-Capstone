import React from 'react'

const ParentDashboard = () => {
  return (
    <div style={{ marginLeft: "20%" }}>
      <div className="w3-container w3-teal">
        <h1>Drivetime</h1>
      </div>

      <div className="w3-panel w3-card-4 margin-l-p margin-r-p">
        <div className="w3-container">
          <h2>Welcome!</h2>
          <p>The sidebar with is set with "style="width:25%".</p>
          <p>The left margin of the page content is set to the same value.</p>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard