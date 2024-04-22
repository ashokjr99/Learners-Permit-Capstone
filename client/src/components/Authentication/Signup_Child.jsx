import React from "react";
import { useState } from "react";

const Signup_Child = ({ userId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(userId);

  const handleChange = (state, value) => {
    switch (state) {
      case "first":
        setFirstName(value);
        break;
      case "last":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("Something went wrong");
    }
  };

  const handleChildSignup = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/signup_child", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("MyToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parentId: userId,
            first: firstName,
            last: lastName,
            email: email,
            password: password,
          }),
        })
      ).json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="w3-container"
        style={{ marginLeft: "35%", marginRight: "14%", marginBottom: "25%" }}
      >
        <div className="w3-panel w3-card-4">
          <form style={{ display: "flex", flexDirection: "column" }}>
            <h2>Sign Up!</h2>
            <label>First Name</label>
            <input onChange={(e) => handleChange("first", e.target.value)} />
            <label>Last Name</label>
            <input onChange={(e) => handleChange("last", e.target.value)} />
            <label>Email</label>
            <input onChange={(e) => handleChange("email", e.target.value)} />
            <label>Password</label>
            <input onChange={(e) => handleChange("password", e.target.value)} />
            <button
              style={{
                margin: "auto",
              }}
              type="button"
              onClick={handleChildSignup}
            >
              Sign Up!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup_Child;
