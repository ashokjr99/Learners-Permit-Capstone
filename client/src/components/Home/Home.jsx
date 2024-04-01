import React from 'react'

const Home = ( props ) => {
  return (
    <div>
      <h1>Indiana Learners Permit Tracking App.</h1>
      <h3> Welcome {{propsuser}}</h3>

      <div>
        Place holder for day vs night pie chart
      </div>

      <input type="button" onClick={logMethod()} >Log latest drive</input>
      <input type="button" onClick={getStats()} >Show history of previous drives</input>
      <input type="button" onClick={logInsp()} >Log inpections/gas milage</input>
      <input type="button" onClick={AutoMaintainceTips()} >Show automotive maintaince tips</input>
      
      <input type="button" onClick={logout()} >Logout</input>
      

      </div>
  )
}


<button style={{ margin: "1em" }} type="button" onClick={cancel}></button>

export default Home