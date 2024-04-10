import React from "react";

import Collapsible from 'react-collapsible';

const Signup_Parent = ({ handleChange, handleSignup }) => {
  return (
    <div className='parent-signup' style={{padding: "2em"}}>
      <button>
      <Collapsible trigger={'Singup'} triggerWhenOpen={'Close'}>
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
        <button style={{ margin: "1em" }} type="button" onClick={handleSignup}>
          Sign Up!
        </button>
      </form>
      </Collapsible>
      </button>
    </div>
  );
};

export default Signup_Parent;
