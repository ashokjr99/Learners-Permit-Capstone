import React from "react";

const StatsList = ({ results }) => {
  // prop results passed from check_stats
  return (
    <div>
      {results.map((obj) => (
        // filter through results so that they display into the tags below
        <li key={obj.id}>
          <ul>{obj.hours}</ul>
          <ul>{obj.vehicle_type}</ul>
          <ul>{obj.from}</ul>
          <ul>{obj.to}</ul>
          <ul>{obj.weather}</ul>
          <ul>{obj.day ? "Day" : "Night"}</ul>
          {/* if obj.day, then show on frontend, "day", if not... then show on frontend "night" */}
          <ul>{obj.practiced}</ul>
        </li>
      ))}
    </div>
  );
};

export default StatsList;
