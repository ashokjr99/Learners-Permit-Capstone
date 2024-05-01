import React from "react";
import HeroImage from "../assets/rainbow-drive-time 3.png";

// The Home component consists of a background image, logo, and the copy on the main landing page.

const Home = () => {
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "100px",
            marginBottom: "1em",
            marginTop: "2em",
            gap: "4em",
          }}
        >
          <img
            src={HeroImage}
            style={{
              padding: "1em",
              filter: "drop-shadow(2px 4px 6px black)",
              maxWidth: "52em",
              minWidth: "52em",
              marginInline: "auto",
            }}
          />
        </div>
        <div
          style={{
            background: "rgba(0, 0, 0, .6)",
            color: "#E5E2E3",
            padding: "1em",
            maxWidth: "30em",
            marginInline: "auto",
          }}
        >
          <h3 style={{ fontWeight: "700" }}>Welcome to DriveTime!</h3>
          <h4>The best way to track your drives when learning to drive!</h4>
          <p>
            Parents please create your account here. Once you are signed up and
            logged in, you can create your child's account.
          </p>
          <p>
            Once a Child's Account is created, they can use the login button
            below to reach their landing page.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
