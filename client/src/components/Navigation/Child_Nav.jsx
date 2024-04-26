import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";
import Modal from "react-modal";
import Enter_Stats from "../Stats/Enter_Stats";
Modal.setAppElement("#root");

const Child_Nav = (props) => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "#244855";
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className="w3-card-2 w3-sidebar w3-bar-block w3-display-left roboto-regular"
      style={{ width: "15em", backgroundColor: "#90AEAD" }}
    >
      <img
        className="w3-bar-item"
        src={HeaderImage}
        style={{ height: "8em", left: "1em" }}
      />
      <input type="text" placeholder="Search.." />
      <Link to="/dashboard">
        <button
          style={{
            background:
              location.pathname.includes("/dashboard") && backgroundColor,
              className: "roboto-regular"
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
        // style={{
        //   backgroundColor,
        // }}
        onClick={() => {
          console.log(props.setModalIsOpen);
          props.setModalIsOpen(true);
        }}
        className="enterStats"
      >
        Submit Drive
      </button>

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