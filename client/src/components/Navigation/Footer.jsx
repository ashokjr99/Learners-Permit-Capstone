import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);

  // Holds the link to the about and contact pages.
  return (
    <div
      style={{
        backgroundColor: "#E5E2E3",
        width: "100vw",
        position: "fixed",
        bottom: "0",
      }}
    >
      <div
        style={{
          color: "#213547",
          display: "flex",
          justifyContent: "center",
          gap: "2em",
          marginLeft: localStorage.getItem("MyToken") ? "15em" : 0,
          padding: "1em",
        }}
      >
        <Link to="/about">About</Link>
        <Link to="/contact_us">Contact</Link>
      </div>
    </div>
  );
};

export default Footer;
