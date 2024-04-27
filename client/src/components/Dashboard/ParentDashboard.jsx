import React from "react";
import Child_Card from "../Stats/Child_Card";

const Parent_Dashboard = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "25%",
        }}
      >
        <h1 style={{ position: "fixed", top: "1em" }}>Welcome to DriveTime</h1>
        <h3>Your Child's Stats at a Glance</h3>
        <Child_Card />
      </div>
    </>
  );
};

export default Parent_Dashboard;
