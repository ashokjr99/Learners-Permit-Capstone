import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";

const Nav = (props) => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "#569AA6";

  return (
    <div
      className="w3-card-2 w3-sidebar w3-bar-block w3-display-left roboto-regular"
      style={{ width: "15em", backgroundColor: "#E5E2E3" }}
    >
      <img
        className="w3-bar-item"
        src={HeaderImage}
        style={{ height: "8em", left: "1em" }}
      />
      <Link to="/Parent_Dashboard">
        <button
          style={{
            background:
              location.pathname.includes("/Parent_Dashboard") &&
              backgroundColor,
          }}
        >
          Home
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
      <Link to="/signup_child">
        <button
          style={{
            background:
              location.pathname.includes("/signup_child") && backgroundColor,
          }}
        >
          Create Child Account
        </button>
      </Link>
      <Link to="/settings">
        <button
          style={{
            background:
              location.pathname.includes("/settings") && backgroundColor,
          }}
        >
          Settings
        </button>
      </Link>

      <button
        className="w3-display-bottomleft"
        onClick={props.clearToken}
        style={{ marginBottom: "2em", marginLeft: "3.00em" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Nav;
