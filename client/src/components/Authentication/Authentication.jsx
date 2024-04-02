import { useState } from "react";

import Login from "./Login";
import Signup_Child from "./Signup_Child";

const Auth = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSignup = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first: firstName,
            last: lastName,
            email: email,
            password: password,
          }),
        })
      ).json();
      console.log(response);
      props.updateToken(response.Token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
      ).json();
      console.log(response.user);
      props.updateToken(response.token);
      props.setUserId(response.user.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Signup_Child handleSignup={handleSignup} handleChange={handleChange} />
      <Login handleLogin={handleLogin} handleChange={handleChange} />
    </>
  );
};

export default Auth;
