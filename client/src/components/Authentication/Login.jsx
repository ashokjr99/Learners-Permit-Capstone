import React from "react";

import Collapsible from 'react-collapsible'


const Login = ({ handleChange, handleLogin }) => {

  return (
    <div className="login" style={{padding: "2em"}}>
      <button>
      <Collapsible trigger={'Login'} triggerWhenOpen={'Close'}>     
        <div className="content">
          <form style={{ display: "flex", flexDirection: "column" }}>
            <h2>Login</h2>
            <label>Email</label>
            <input onChange={(e) => handleChange("email", e.target.value)} />
            <label>Password</label>
            <input onChange={(e) => handleChange("password", e.target.value)} />
            <button
              style={{ margin: "1em" }}
              type="button"
              onClick={handleLogin}
            >
              Log In!
            </button>
          </form>
        </div>
      </Collapsible>
      </button>
    </div>
  );
};

export default Login;
