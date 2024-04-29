import React from "react";
import HeroImage from "../assets/rainbow-drive-time 3.png";

const Home = () => {
  return (
    <>
      <div>
        <div
          style={{
            width: "50%", // Set the width of the container to 100% of its parent
            backgroundColor: "#000000", // Background color for the container
            display: "inline-block", // Ensure the container only takes up the necessary width
            borderRadius: "100px",
            marginBottom: "1em",
            marginTop: "2em",
          }}
        >
          <img src={HeroImage} style={{ padding: "1em" }} />
        </div>
      </div>
      <div>
        <h3 style={{ fontWeight: "700" }}>Welcome to DriveTime!</h3>
        <h4>The best way to track your drives when learning to drive!</h4>
        <p>
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
