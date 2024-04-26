import React from 'react'
import Child_Card from '../Stats/Child_Card';

const Parent_Dashboard = () => {
  return (

    <>
    <div className="w3-container" style={{marginLeft:"25%"}}>
         <h1>Welcome to DriveTime</h1>
         <Child_Card/>
     </div>
  </>
  );
}

export default Parent_Dashboard