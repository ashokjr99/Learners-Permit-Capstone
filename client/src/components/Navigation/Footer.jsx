import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);
  let text = "#C1C8E4";

  return (
    <div style={{ display: "flex", gap: "1em", justifyContent: "center"}}>
      <Link to="/home" style={{color:text}}>Home</Link>
      <Link to="/about" style={{color:text}}>About</Link>
      <Link to="/contact_us" style={{color:text}}>Contact</Link>
    </div>
  );
};

export default Footer;
