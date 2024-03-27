import Signup from "./Signup_Parent";
import Login from "./Login";

import { useState } from "react";

const Auth = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")

  const handleChange = (state, value) => {
    switch (state) {
      case "first":
        setFirstName(value);
        break;
      case "last":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
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
            FirstName: firstName,
            LastName: lastName,
            email: email,
            Password: password,
          }),
        })
      ).json();
      props.updateToken(response.Token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/signin", {
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

      props.updateToken(response.Token);
      props.setUserId(response.User._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Signup handleSignup={handleSignup} handleChange={handleChange} />
      <Login handleLogin={handleLogin} handleChange={handleChange} />
    </>
  );
};

export default Auth;