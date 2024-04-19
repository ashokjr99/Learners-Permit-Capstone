import React from "react";

const SummaryHeader = ({ hours, drives }) => {
  //? rendering the total drives and total hours

  return (
    <div>
      <h1>Totals</h1>
      <h2>Drives: {drives}</h2>
      <h2>Hours: {hours}</h2>
    </div>
  );
};

export default SummaryHeader;
