import React from "react";
import "./Dashboard.css";

import TargetHoursProgress from "./TargetHoursProgess";

const Dashboard = () => {
  return (
    <>
      <div
        style={{ marginLeft: "20%", display: "flex", flexDirection: "column" }}
      >
        <h1>Welcome to DriveTime</h1>
        <div style={{ marginTop: "10%" }}>
          <TargetHoursProgress></TargetHoursProgress>
        </div>
        <div style={{ marginTop: "-10%" }}>
          <h3>Here is where you are in your journey!</h3>
          <p>Current Hours & Target Goal</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
