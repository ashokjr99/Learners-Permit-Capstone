import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";

const Child_Nav = () => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
    <div
      className="w3-sidebar w3-light-grey w3-bar-block"
      style={{ width: "20%" }}
    >
      <img src={HeaderImage} style={{ height: "8em", left: "1em" }} />
      <Link to="/dashboard">
        <button
          style={{
            background:
              location.pathname.includes("/dashboard") && backgroundColor,
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
          View Drives
        </button>
      </Link>
      <Link to="/enter_stats">
        <button
          style={{
            background:
              location.pathname.includes("/enter_stats") && backgroundColor,
          }}
        >
          Enter Drive
        </button>
      </Link>
    </div>
  );
};

export default Child_Nav;
