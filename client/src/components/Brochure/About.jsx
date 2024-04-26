import React from "react";

const About = ({ goHome }) => {
  return (
    <div
      className="w3-panel w3-card-4 margin-l-p margin-r-p"
      style={{ marginLeft: "25%" }}
    >
      <div className="w3-container">
        <button onClick={() => goHome()}>🏠</button>
        <h1>About Us</h1>
        <p>
          DriveTime was founded by Rob VanArsdall and a group of four software
          developers - Ashok Sharma Jr., Travis Marrocco, Erik Engel, and
          Mohammed Marks.
        </p>
        <p>
          The intended purpose of this application is to allow student permit
          drivers to log and track their driving, in the measurement of hours,
          so that they can meet their requirements to eventually earn their
          license. At the moment, DriveTime is free and welcome to anyone.
        </p>
      </div>
    </div>
  );
};

export default About;
