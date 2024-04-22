import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";



const Child_Nav = ( props ) => {
    let location = useLocation();
    console.log(location);
    let backgroundColor = "#244855";

  return (
    <div
      className="w3-card-2 w3-sidebar w3-bar-block w3-display-left"
      style={{ width: "15em", backgroundColor: "#90AEAD" }}
    >
      <img  className="w3-bar-item" src={HeaderImage} style={{ height: "8em", left: "1em" }} />
      <input type="text" placeholder="Search.." />
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
      {/* <Link to="/about">
          <button
            style={{
              background: location.pathname.includes("/about") && backgroundColor,
            }}
          >
            About
          </button>
        </Link> */}

        <Link to="/stats">
          <button
            style={{
              background: location.pathname.includes("/stats") && backgroundColor,
            }}
          >
            View Stats
          </button>
        </Link>
        <Link to="/enter_stats">
          <button
            style={{
              background: location.pathname.includes("/enter_stats") && backgroundColor,
            }}
            onClick={() => {
              console.log(props.setModalIsOpen);
              props.setModalIsOpen(true);
            }}
            >
            Submit Drive
          </button>
        </Link>
        <button className="w3-display-bottomleft" onClick={props.clearToken}
          style={{ marginBottom: "2em", marginLeft:"3.00em"}}>
             Logout
        </button>
      </div>
    );
  };



export default Child_Nav;
