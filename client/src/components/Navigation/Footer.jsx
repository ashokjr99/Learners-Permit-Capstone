import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
    <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
      <Link to="/home">
          Home
      </Link>
      <Link to="/about">
        About
      </Link>
      <Link to="/contact_us">
        Contact
      </Link>
    </div>
  );
};

export default Footer;
