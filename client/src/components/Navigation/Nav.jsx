import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";


const Nav = ( props ) => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
<<<<<<< HEAD
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
=======
    <div>
    <div className="w3-sidebar w3-bar-block w3-card-4" style={{width:"20%", backgroundColor: "#242424"}}>
         <img className="w3-bar-item" src={HeaderImage} style={{ height: "8em", left: "1em" }}/>
        <input type="text" placeholder="Search.."/>
      <Link to="/home2"> //change to ParentDashboard
>>>>>>> 894af5f0d09058510c222166a7c060129de33aef
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
      
      <button className="w3-display-bottomleft" onClick={props.clearToken}>Logout</button>  
      

    </div>
    </div>
  );
};

export default Nav;
