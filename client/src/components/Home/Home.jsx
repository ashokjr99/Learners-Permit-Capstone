import React from "react";
import HeroImage from "../assets/rainbow-drive-time 3.png";

const Home = () => {
  return (
    <>
      <div>
        <h1>Welcome To</h1>
        <div
        style={{
          width: "100%", // Set the width of the container to 100% of its parent
          backgroundColor: "#242424", // Background color for the container
          display: "inline-block", // Ensure the container only takes up the necessary width
          //borderRadius: "100px",
          overflow: "hidden", // Hide any overflowing content (e.g., rounded corners)
        }}
        >
        <img
          src={HeroImage}
          style={{
          }}
        />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: "5em" }}>
          Parents please create your account here. Once you are signed up and
          logged in, you can create your child's account.
        </p>
        <p>
          Once a Child's Account is created, they can use the login button below
          to reach their landing page.
        </p>
      </div>
    </>
  );
};

export default Home;
