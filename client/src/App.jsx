import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Nav,
  Child_Nav,
  Login,
  Signup_Child,
  ResetPassword,
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
  Settings,
} from "./components/";

import "./App.css";

// The App function holds the the variables that are used throughout the program.

function App() {
  const [sessionToken, setSessionToken] = useState(false);
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("MyToken")) {
      setSessionToken(localStorage.getItem("MyToken"));
    }
    if (localStorage.getItem("User Type")) {
      // setUserType(localStorage.getItem("User Type"));
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

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
    {/* App.jsx is broken up into three main component sections; One for before a user is logged in or the main landing page, one for when a parent is logged in, and one for when a child is logged in. */}
      {!sessionToken && !userType && (
        <>
          <div className="home-div">
            <Routes>
              <Route path="/ResetPassword/*" element={<ResetPassword />} />

              <Route path="/" element={<Home />} />

              <Route path="/about" element={<About goHome={goHome} />} />
              <Route path="/contact_us" element={<Contact goHome={goHome} />} />
            </Routes>
            <Auth
              updateToken={updateToken}
              userId={userId}
              userType={userType}
              setUserId={setUserId}
              setUserType={setUserType}
            />
          </div>
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
              <Route path="/settings" element={<Settings />} />

              <Route path="/login" element={<Login />} />
              <Route
                path="/signup_child"
                element={<Signup_Child userId={userId} />}
              />

              <Route
                path="/enter_stats"
                element={
                  <Enter_Stats
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                  />
                }
              />

              <Route path="/stats" element={<Parent_Check_Stats />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />

              <Route path="/ResetPassword" element={<ResetPassword />} />
            </Routes>
          </header>
        </>
      )}
      {sessionToken && userType === "child" && (
        <>
          <div>
            <Child_Nav
              userId={userId}
              clearToken={clearToken}
              setModalIsOpen={setModalIsOpen}
            />
          </div>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />

              <Route path="/login" element={<Login />} />


              <Route
                path="/stats"
                element={
                  <>
                    <Check_Stats />

                    <Enter_Stats
                      userId={userId}
                      modalIsOpen={modalIsOpen}
                      setModalIsOpen={setModalIsOpen}
                    />
                  </>
                }
              />

              <Route path="/about" element={<About />} />
              <Route path="/contact_us" element={<Contact />} />

              <Route path="/ResetPassword" element={<ResetPassword />} />
            </Routes>
          </header>
        </>
      )}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
