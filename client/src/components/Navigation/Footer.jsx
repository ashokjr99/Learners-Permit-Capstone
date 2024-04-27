import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);

  return (
    <div
      style={{
        backgroundColor: "#90AEAD",
        width: "150vw",
        position: "fixed",
        bottom: "0",
      }}
    >
      <div
        style={{
          color: "#213547",
          display: "flex",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <Link to="/about">About</Link>
        <Link to="/contact_us">Contact</Link>
      </div>
    </div>
  );
};

export default Footer;
