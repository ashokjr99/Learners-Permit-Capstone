import React from "react";
import { useState } from "react";

const Signup_Child = ({userId}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

console.log(userId)

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
          <div style={{display:"flex", flex:"column", justifyContent:"center"}}>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <h2>Sign Up!</h2>
              <label>First Name</label>
              <input onChange={(e) => handleChange("first", e.target.value)} />
              <label>Last Name</label>
              <input onChange={(e) => handleChange("last", e.target.value)} />
              <label>Email</label>
              <input onChange={(e) => handleChange("email", e.target.value)} />
              <label>Password</label>
              <input
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button
                style={{ margin: "1em" }}
                type="button"
                onClick={handleChildSignup}
              >
                Sign Up!
              </button>
            </form>
          </div>
        </>
  );
};

export default Signup_Child;
