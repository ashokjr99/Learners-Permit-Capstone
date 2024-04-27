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
        <h1 style={{ paddingBottom: "10em" }}>Welcome to DriveTime</h1>
        <Child_Card />
      </div>
    </>
  );
};

export default Parent_Dashboard;
