import React from "react";

const SummaryHeader = ({ hours, drives, approved }) => {
  //? rendering the total drives and total hours

  return (
    <div>
      <h1>Summaries</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "30%" }}>
        <h2>Drives: {drives}</h2>
        <h2>Hours: {hours}</h2>
        <h2>
          Approved: {parseInt(approved)}/{drives}
        </h2>
      </div>
    </div>
  );
};

export default SummaryHeader;
