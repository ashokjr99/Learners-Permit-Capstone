import React from 'react'

import "./Dashboard.css"

const Dashboard = () => {
  return (
    <div>
       <div className="w3-sidebar w3-light-grey w3-bar-block" style={{width:"20%"}}>
           <h3 className="w3-bar-item">Menu</h3>
           <button>Summary</button>
           <button>button 2</button>
           <button>button 3</button>
           <button>Settings</button>
           {/* <a href="#" className="w3-bar-item w3-button">Link 1</a>
           <a href="#" className="w3-bar-item w3-button">Link 2</a>
           <a href="#" className="w3-bar-item w3-button">Link 3</a> */}
       </div>

       <div style={{marginLeft:"20%"}}>

           <div className="w3-container w3-teal">
               <h1>Drivetime</h1>
           </div>

           <div className="w3-panel w3-card-4 margin-l-p margin-r-p"  >
               <div className="w3-container">
                   <h2>Welcome!</h2>
                   <p>The sidebar with is set with "style="width:25%".</p>
                   <p>The left margin of the page content is set to the same value.</p>
               </div>
           </div>

       </div>
   </div>

  )
}

export default Dashboard




// import React from 'react'

// const Home = ( props ) => {
//   return (
//     <div>
//       <h1>Indiana Learners Permit Tracking App.</h1>
//       <h3> Welcome {{propsuser}}</h3>

//       <div>
//         Place holder for day vs night pie chart
//       </div>

//       <input type="button" onClick={logMethod()} >Log latest drive</input>
//       <input type="button" onClick={getStats()} >Show history of previous drives</input>
//       <input type="button" onClick={logInsp()} >Log inpections/gas milage</input>
//       <input type="button" onClick={AutoMaintainceTips()} >Show automotive maintaince tips</input>
      
//       <input type="button" onClick={logout()} >Logout</input>
      

//       </div>
//   )
// }


// <button style={{ margin: "1em" }} type="button" onClick={cancel}></button>

// export default Home


// 125px , 175px
// flexbox/grid
