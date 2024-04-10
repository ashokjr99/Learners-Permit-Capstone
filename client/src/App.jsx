import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Nav,
  Child_Nav,
  Login,
  Signup_Child,


  Signup_Parent,
  Stats_Landing_Page,

  Home,
  Home2,
  Home3,
  Enter_Stats,
  Check_Stats,
  About,
  Contact,
  Footer,
  Auth,
} from "./components/";

import "./App.css";

function App() {
  const [sessionToken, setSessionToken] = useState(false);
  const [childToken, setChildToken] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("MyToken")) {
      setSessionToken(localStorage.getItem("MyToken"));
    }
  }, []);

  // Sets the Token for the user session in the localstorage of the website.
  const updateToken = (token) => {
    console.log("Token Updated", token);
    localStorage.setItem("MyToken", token);
    setSessionToken(token);
  };

  const updateChildToken = (token) => {
    console.log("Token Updated", token);
    localStorage.setItem("ChildToken", token);
    setChildToken(token);
  };

  // Clears the Token in the local storage so a new user can sign on.
  const clearToken = () => {
    console.log("Token Cleared");
    localStorage.removeItem("MyToken");
    setSessionToken("");
  };

  const clearChildToken = () => {
    console.log("Token Cleared");
    localStorage.removeItem("ChildToken");
    setChildToken("");
  };

  return (
    <>
      {!sessionToken && !childToken && (
        <>
          <Home />
          <Auth
            updateToken={updateToken}
            updateChildToken={updateChildToken}
            userId={userId}
            setUserId={setUserId}
          />
          <footer>
            <Footer />
          </footer>
        </>
      )}
      {sessionToken && !childToken && (
        <>
          <div>
            <Nav />
          </div>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Navigate to="/home2" />} />
              <Route path="/home2" element={<Home2 />} />

              <Route path="/login" element={<Login />} />
              <Route
                path="/signup_child"
                element={<Signup_Child userId={userId} />}
              />

              <Route path="/landing_page" element={<Stats_Landing_Page />} />
              <Route path="/stats" element={<Check_Stats />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />
            </Routes>
          </header>
          <div>
            <button onClick={clearToken}>Logout!</button>
          </div>
          <footer>
            <Footer />
          </footer>
        </>
      )}
      {childToken && !sessionToken && (
        <>
          <div>
            <Child_Nav userId={userId} />
          </div>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Navigate to="/home3" />} />
              <Route path="/home3" element={<Home3 />} />

              <Route path="/login" element={<Login />} />

              <Route path="/enter_stats" element={<Enter_Stats userId={userId}/>} />
              <Route path="/stats" element={<Check_Stats />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />
            </Routes>
          </header>
          <div>
            <button onClick={clearChildToken}>Logout!</button>
          </div>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </>

  );
}

export default App;
