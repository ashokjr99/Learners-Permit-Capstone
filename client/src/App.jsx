import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Nav,
  Login,
  Signup_Child,
  Signup_Parent,
  Dashboard,
  Enter_Stats,
  Check_Stats,
  About,
  Contact,
  Footer,
} from "./components/";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Dashboard />
      {/* <div>
        <Nav />
      </div>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup_Parent />} />
          <Route path="/signup_child" element={<Signup_Child />} />
          <Route path="/enter_stats" element={<Enter_Stats />} />
          <Route path="/stats" element={<Check_Stats />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact_us" element={<Contact />} />
        </Routes>
      </header>
      <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
