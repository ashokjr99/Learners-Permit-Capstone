import React from "react";
import "./Dashboard.css";

import TargetHoursProgress from "./TargetHoursProgess";

const Dashboard = () => {
  return (
    <>
      <div className="w3-container" style={{ marginLeft: "15%" }}>
        <h1>Welcome to DriveTime</h1>

        <TargetHoursProgress />
      </div>
    </>
  );
};

export default Dashboard;
