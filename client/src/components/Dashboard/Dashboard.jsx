import React from "react";
import "./Dashboard.css";

import TargetHoursProgress from "./TargetHoursProgess";

const Dashboard = () => {
  return (
    <>
      <div
        style={{ marginLeft: "15em", display: "flex", flexDirection: "column" }}
      >
        <h1>Welcome to DriveTime</h1>
        <div style={{ paddingTop: "10em", color: "#E5E2E3" }}>
          <h3>Here is where you are in your journey!</h3>
          <p>Current Hours & Target Goal</p>
        </div>
        <div>
          <TargetHoursProgress></TargetHoursProgress>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
