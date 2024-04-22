import React from "react";
import HeroImage from "../assets/rainbow-drive-time 2.png";
import Footer from "../Navigation/Footer";

const Home = () => {
  return (
    <>
      <div>
        <h1>Welcome to</h1>
        <img src={HeroImage} style={{ backgroundColor: "" }} />
      </div>
      <div>
        <p style={{marginBottom: "5em"}}>
          Parents please create your account here. Once you are signed up and
          logged in, you can create your child's account.
        </p>
        <p>
          Once a Child's Account is created, they can use the login button below to reach their landing page.
        </p>
      </div>
    </>
  );
};

export default Home;
