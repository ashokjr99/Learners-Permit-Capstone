import React from "react";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    // <div>
    //    <div className="w3-sidebar w3-light-grey w3-bar-block" style={{width:"20%"}}>
    //        <h3 className="w3-bar-item">Menu</h3>
    //        <input type="text" placeholder="Search.."/>
    //        <button>Summary</button>
    //        <button>button 2</button>
    //        <button>button 3</button>
    //        <button>Settings</button>
    //        {/* <a href="#" className="w3-bar-item w3-button">Link 1</a>
    //        <a href="#" className="w3-bar-item w3-button">Link 2</a>
    //        <a href="#" className="w3-bar-item w3-button">Link 3</a> */}
    //    </div>

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
};

export default Dashboard;