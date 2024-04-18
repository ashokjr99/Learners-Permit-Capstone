import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";

const Nav = () => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
<<<<<<< HEAD
    <div className="w3-sidebar w3-light-grey w3-bar-block" style={{width:"20%"}}>
      <img
        src={HeaderImage}
        style={{ height: "8em", left: "1em" }}
      />
      <Link to="/Parent_Dashboard">
        <button
          style={{
            background: location.pathname.includes("/Parent_Dashboard") && backgroundColor,
=======
    <div
      className="w3-sidebar w3-light-grey w3-bar-block"
      style={{ width: "20%" }}
    >
      <img src={HeaderImage} style={{ height: "8em", left: "1em" }} />
      <Link to="/ParentDashboard">
        <button
          style={{
            background:
              location.pathname.includes("/ParentDashboard") && backgroundColor,
>>>>>>> 45e5f006c7fc2b50303a1a17f3d3cdbedf854e3f
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
    </div>
  );
};

export default Nav;
