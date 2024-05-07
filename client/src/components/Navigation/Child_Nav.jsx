import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Child_Nav = (props) => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "#244855";

  // The Child Nav is strictly for when a child is logged in. The buttons change between parent and child accounts.
  return (
    <div
      className="w3-card-2 w3-sidebar w3-bar-block w3-display-left roboto-regular gradient-vertical-child"
      style={{ width: "15em" }}
    >
      <img
        className="w3-bar-item"
        src={HeaderImage}
        style={{ height: "8em", left: "1em", filter: "drop-shadow(2px 4px 6px black)" }}
      />
      <Link to="/dashboard">
        <button
          style={{
            background:
              location.pathname.includes("/dashboard") && backgroundColor,
            className: "roboto-regular",
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

      <button
        onClick={() => {
          console.log(props.setModalIsOpen);
          props.setModalIsOpen(true);
        }}
        className="enterStats"
      >
        Submit Drive
      </button>
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

export default Child_Nav;
