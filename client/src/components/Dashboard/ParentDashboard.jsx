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
          columnCount: "2",
          marginLeft: "15em",
        }}
      >
        <h1>Welcome to DriveTime</h1>
        <h3 style={{ marginBottom: "10%" }}>Your Child's Stats at a Glance</h3>
        <Child_Card> </Child_Card>
      </div>
    </>
  );
};

export default Parent_Dashboard;
