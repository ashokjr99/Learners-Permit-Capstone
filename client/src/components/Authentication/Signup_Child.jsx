import React from "react";
import { useState } from "react";

const Signup_Child = ({ userId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [targetHours, setTargetHours] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  console.log(userId);

  const handleChange = (state, value) => {
    switch (state) {
      case "first":
        setFirstName(value);
        break;
      case "last":
        setLastName(value);
        break;
      case "targetHours":
        setTargetHours(value);
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
            targetHours: targetHours,
            email: email,
            password: password,
          }),
        })
      ).json();
      console.log(response);
      alert("User Created Successfully");
      setSignupSuccess(true);

      setFirstName("");
      setLastName("");
      setTargetHours(0);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        style={{ marginLeft: "15%", display: "flex", justifyContent: "center" }}
      >
        {/* <div className="w3-panel w3-card-4"> */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <h2>Sign Up Your Child</h2>
          <label>First Name</label>
          <input
            onChange={(e) => handleChange("first", e.target.value)}
            value={firstName}
          />
          <label>Last Name</label>
          <input
            onChange={(e) => handleChange("last", e.target.value)}
            value={lastName}
          />
          <label>Target hours for your child</label>
          <input
            onChange={(e) =>
              handleChange("targetHours", parseFloat(e.target.value))
            }
            type="number"
            value={targetHours}
          />
          <label>Email</label>
          <input
            onChange={(e) => handleChange("email", e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            onChange={(e) => handleChange("password", e.target.value)}
            type="password"
            value={password}
          />
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
      {/* </div> */}
    </>
  );
};

export default Signup_Child;
