import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Nav,
  Child_Nav,
  Login,
  Signup_Child,
  Signup_Parent,
  Dashboard,
  Parent_Dashboard,
  Home,
  Enter_Stats,
  Check_Stats,
  Parent_Check_Stats,
  About,
  Contact,
  Footer,
  Auth,
} from "./components/";

import "./App.css";

function App() {
  const [sessionToken, setSessionToken] = useState(false);
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("MyToken")) {
      setSessionToken(localStorage.getItem("MyToken"));
    }
    if (localStorage.getItem("User Type")) {
      setUserType(localStorage.getItem("User Type"));
    }
  }, []);

  // Sets the Token for the user session in the localstorage of the website.
  const updateToken = (token, userType) => {
    console.log("Token Updated", token);
    console.log("User Type", userType);
    localStorage.setItem("MyToken", token);
    localStorage.setItem("User Type", userType);
    setSessionToken(token);
    setUserType(userType);
  };

  // Clears the Token in the local storage so a new user can sign on.
  const clearToken = () => {
    console.log("Token Cleared");
    // localStorage.removeItem("MyToken");
    // localStorage.removeItem("")
    localStorage.clear();
    setSessionToken("");
    setUserType("");
    navigate("/");
  };

  return (
    <>
      {!sessionToken && !userType && (
        <>
          <Home />
          <Auth
            updateToken={updateToken}
            userId={userId}
            userType={userType}
            setUserId={setUserId}
            setUserType={setUserType}
          />

          <footer>
            <Footer />
          </footer>
        </>
      )}
      {sessionToken && userType === "parent" && (
        <>
          <div>
            <Nav clearToken={clearToken} />
          </div>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Navigate to="/Parent_Dashboard" />} />
              <Route path="/Parent_Dashboard" element={<Parent_Dashboard />} />

              <Route path="/login" element={<Login />} />
              <Route
                path="/signup_child"
                element={<Signup_Child userId={userId} />}
              />

              <Route path="/enter_stats" element={<Enter_Stats />} />

              <Route path="/stats" element={<Parent_Check_Stats />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />
            </Routes>
          </header>

          <footer>
            <Footer />
          </footer>
        </>
      )}
      {sessionToken && userType === "child" && (
        <>
         <div>
            <Child_Nav userId={userId} clearToken={clearToken} />
          </div>
          
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/login" element={<Login />} />

              <Route
                path="/enter_stats"
                element={<Enter_Stats userId={userId} />}
              />

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
    </>
  );
}

export default App;
