import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/userprofile" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App;