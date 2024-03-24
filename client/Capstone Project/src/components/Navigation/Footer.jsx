import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
    <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
      <Link to="/home">
        <button
          style={{
            background: location.pathname.includes("/home") && backgroundColor,
          }}
        >
          Home
        </button>
      </Link>
      <Link to="/about">
        <button
          style={{
            background: location.pathname.includes("/about") && backgroundColor,
          }}
        >
          About
        </button>
      </Link>
      <Link to="/login">
        <button
          style={{
            background:
              location.pathname.includes("/login") && backgroundColor,
          }}
        >
          Login
        </button>
      </Link>
      <Link to="/contact_us">
        <button
          style={{
            background: location.pathname.includes("/contact_us") && backgroundColor,
          }}
        >
          Signup
        </button>
      </Link>
    </div>
  );
};

export default Footer;
