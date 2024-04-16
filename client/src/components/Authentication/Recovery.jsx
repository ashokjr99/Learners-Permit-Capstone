import React from 'react'

import Collapsible from 'react-collapsible';

const Recovery = (handleChange, HandleRecovery) => {
    return (
      <div className='parent-signup' style={{ padding: "2em" }}>
        <button>
          <Collapsible trigger={'Forgot Password'} triggerWhenOpen={'Close'}>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <h2>Forgot Password</h2>
              <label>Email</label>
              <input onChange={(e) => handleChange("email", e.target.value)} />
              <button style={{ margin: "1em", width: "9em" }} type="button" onClick={HandleRecovery}>
                Send Recovery Email
              </button>
            </form>
          </Collapsible>
        </button>
      </div>
    );
  };
  

export default Recovery





