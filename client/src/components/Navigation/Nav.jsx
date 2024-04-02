import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";


const Nav = () => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
    <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
      <img
        src={HeaderImage}
        style={{ height: "8em", position: "fixed", left: "1em" }}
      />
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
      <Link to="/stats">
        <button
          style={{
            background: location.pathname.includes("/stats") && backgroundColor,
          }}
        >
          View Stats
        </button>
      </Link>
      <Link to="/signup_child">
        <button
          style={{
            background: location.pathname.includes("/signup_child") && backgroundColor,
          }}
        >
          Create Child Account
        </button>
      </Link>
    </div>
  );
};

export default Nav;
