import React from "react";
import { useState } from "react";

const Signup_Child = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentId, setParentId] = useState("");

console.log(props)

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
      case "parentId":
        setParentId(props.id);
        break;
      default:
        console.log("Something went wrong");
    }
  };

  const handleChildSignup = async (props) => {
    console.log(props)
    try {
      const response = await (
        await fetch("http://localhost:8081/user/signup_child", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parentId: 1,
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
      {!parentId ? (
        <>
          <div>
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
      ) : (
        <>
          <div>
            <p>Child Account Created!</p>
          </div>
        </>
      )}
    </>
  );
};

export default Signup_Child;
