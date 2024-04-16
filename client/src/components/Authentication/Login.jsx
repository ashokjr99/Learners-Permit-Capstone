import React from "react";

import Collapsible from "react-collapsible";

const Login = ({ handleChange, handleLogin }) => {
  return (
    <div className="login" style={{ padding: "2em" }}>
      {/* <button> */}
      <Collapsible trigger={"Login"} triggerWhenOpen={"Close"}>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <h2>Login</h2>
          <label>Email</label>
          <input onChange={(e) => handleChange("email", e.target.value)} />
          <label>Password</label>
          <input onChange={(e) => handleChange("password", e.target.value)} />
          {/* //! SOMEONE PLEASE FIGURE OUT WHY WE MUST PRESS BUTTON MULTIPLE //!
          TIMES TO LOGIN/SIGNUP */}
          <button
            style={{ margin: "1em", width: "9em" }}
            type="button"
            onClick={handleLogin}
          >
            Log In!
          </button>
        </form>
      </Collapsible>
      {/* </button> */}
    </div>
  );
};

export default Login;
