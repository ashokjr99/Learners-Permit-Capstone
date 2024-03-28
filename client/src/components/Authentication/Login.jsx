import React from 'react'

const Login = ({ handleChange, handleLogin }) => {
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h2>Login</h2>
        <label>Email</label>
        <input onChange={(e) => handleChange("email", e.target.value)} />
        <label>Password</label>
        <input onChange={(e) => handleChange("password", e.target.value)} />
        <button style={{ margin: "1em" }} type="button" onClick={handleLogin}>
          Log In!
        </button>
      </form>
      {console.log("I am a login")}
    </div>
  );
};

export default Login