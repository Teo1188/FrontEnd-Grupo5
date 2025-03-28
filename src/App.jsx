import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";

import Header from "./components/Header"; 

const App = () => {
  return (
    <Router>
  <div className="min-h-screen flex flex-col bg-gray-50">
    {window.location.pathname !== "/profile" && <Header />}
    <main className="flex-grow p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/configuracion" element={<Settings />} />
        <Route path="*" element={<Navigate to="/profile" replace />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
      </Routes>
    </main>
  </div>
</Router>

  )
}

export default App;