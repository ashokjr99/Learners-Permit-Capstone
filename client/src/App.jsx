import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Nav,
  Login,
  Signup_Child,
  Home,
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

  // Clears the Token in the local storage so a new user can sign on.
  const clearToken = () => {
    console.log("Token Cleared");
    localStorage.removeItem("MyToken");
    setSessionToken("");
  };

  return (
    <>
      {!sessionToken ? (
        <>
        <Nav updateToken={updateToken} userId={userId} setUserId={setUserId} />
        <Home />
        <Auth updateToken={updateToken} userId={userId} setUserId={setUserId} />
        </>
      ) : (
        <>
          <div>
          <Nav />
          </div>
          <header className="App-header">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup_Child />} />


          <Route path="/enter_stats" element={<Enter_Stats />} />
          <Route path="/stats" element={<Check_Stats />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact_us" element={<Contact />} />
        </Routes>
      </header>
        </>
      )}
    </>
    // <div className="App">
    //   <div>
    //     <Nav />
    //   </div>
      // <header className="App-header">
      //   <Routes>
      //     <Route path="/" element={<Navigate to="/auth" />} />
      //     <Route path="/home" element={<Home />} />
      //     <Route path="/auth" element={<Auth />} />

      //     <Route path="/login" element={<Login />} />
      //     <Route path="/signup" element={<Signup_Child />} />

      //     <Route path="/landing_page" element={<Stats_Landing_Page />} />
      //     <Route path="/enter_stats" element={<Enter_Stats />} />
      //     <Route path="/stats" element={<Check_Stats />} />

      //     <Route path="/about" element={<About />} />
      //     <Route path="/contact_us" element={<Contact />} />
      //   </Routes>
      // </header>
    //   <footer>
    //     <Footer />
    //   </footer>
    // </div>
  );
}

export default App;