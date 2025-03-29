import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ExtraHour from "./pages/ExtraHour";
import PasswordRecovery from "./pages/PasswordRecovery";


const App = () => {
  return (
    <Router>
 
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/configuracion" element={<Settings />} />
        <Route path="*" element={<Navigate to="/profile" replace />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/extrahours" element={<ExtraHour />} />
      </Routes>
    

</Router>

  )
}

export default App;

