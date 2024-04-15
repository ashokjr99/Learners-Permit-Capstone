import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderImage from "../assets/DriveTime.png";

const Child_Nav = ( props ) => {
    let location = useLocation();
    console.log(location);
    let backgroundColor = "darkblue";

  
    return (
        <div>
        <div className="w3-sidebar w3-bar-block w3-card-4" style={{width:"20%", backgroundColor: "#242424"}}>
     
            <img className="w3-bar-item" src={HeaderImage} style={{ height: "8em", left: "1em" }}/>
            <input type="text" placeholder="Search.."/>
            <Link to="/home">
              <button
                style={{
                  background: location.pathname.includes("/home") && backgroundColor,
                }}
              >
                Home
              </button>
            </Link>
            <Link to="/about">
              <button
                style={{
                  background: location.pathname.includes("/about") && backgroundColor,
                }}
              >
                About
              </button>
            </Link>
            <Link to="/stats">
              <button
                style={{
                  background: location.pathname.includes("/stats") && backgroundColor,
                }}
              >
                View Stats
              </button>
            </Link>
            <Link to="/enter_stats">
            <button
                style={{
                  background: location.pathname.includes("/enter_stats") && backgroundColor,
                }}
              >
              Enter Stats
            </button>  
            </Link>
                

            <button className="w3-display-bottomleft" onClick={props.clearToken} >Logout</button>
            
        </div>
    
        <div style={{marginLeft:"20%"}}>
    
            {/* <div className="w3-container w3-teal">
                <h1>Drivetime</h1>
            </div> */}
    
            {/* <div className="w3-panel w3-card-4 margin-l-p margin-r-p"  >
                <div className="w3-container">
                    <h2>Welcome!</h2>

                </div>
            </div>
     */}
        </div>
    </div>
      );  
 
  };

export default Child_Nav