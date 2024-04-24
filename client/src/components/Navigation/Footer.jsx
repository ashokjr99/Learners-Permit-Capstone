import { backdropClasses } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);

  return (
    <div
      // className="w3-panel w3-card-4 margin-l-p margin-r-p w3-display-bottommiddle"
      style={{
        backgroundColor: "grey",
        width: "100vw",
        // position: "absolute",
        // bottom: "0",
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
