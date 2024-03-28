import React from 'react'

const Signup_Child = ({ handleChange, handleSignup }) => {
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h2>Signup</h2>
        <label>FirstName</label>
        <input onChange={(e) => handleChange("first", e.target.value)} />
        <label>LastName</label>
        <input onChange={(e) => handleChange("last", e.target.value)} />
        <label>Email</label>
        <input onChange={(e) => handleChange("email", e.target.value)} />
        <label>Password</label>
        <input onChange={(e) => handleChange("password", e.target.value)} />
        <button style={{ margin: "1em" }} type="button" onClick={handleSignup}>
          Sign Up!
        </button>
      </form>
      {console.log("I am an Signup")}
    </div>
  );
};

export default Signup_Child