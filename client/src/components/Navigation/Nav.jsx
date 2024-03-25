import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/Rainbow_Vice.png"

const Nav = () => {
  let location = useLocation();
  console.log(location);
  let backgroundColor = "darkblue";

  return (
    <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
      <img src={HeaderImage} style={{height: "8em", position: "fixed", left:"1em"}} />
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
      <Link to="/signup">
        <button
          style={{
            background: location.pathname.includes("/signup") && backgroundColor,
          }}
        >
          Signup
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
