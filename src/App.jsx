import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ExtraHoursProvider } from "./context/ExtraHoursContext"; // Importa el contexto
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExtraHoursPanel from "./components/ExtraHoursPanel";
import AdminPanel from "./pages/AdminPanel";
import UserProfile from "./pages/UserProfile"; // Asegúrate de que esta sea la ruta correcta
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import PasswordRecovery from "./pages/PasswordRecovery";
import LayoutWithMenu from "./components/LayoutWithMenu"; // Importa el Layout con menú

const App = () => {
  return (
    <ExtraHoursProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/dashboard" element={<LayoutWithMenu><Dashboard /></LayoutWithMenu>} />
          <Route path="/Settings" element={<LayoutWithMenu><Settings /></LayoutWithMenu>} />
          <Route path="/extrahour" element={<LayoutWithMenu><ExtraHoursPanel /></LayoutWithMenu>} />
          <Route path="/admin-panel" element={<LayoutWithMenu><AdminPanel /></LayoutWithMenu>} />
          <Route path="/profile" element={<LayoutWithMenu><UserProfile /></LayoutWithMenu>} />
          <Route path="/editar-perfil" element={<LayoutWithMenu><EditProfile /></LayoutWithMenu>} />
           
          {/* Redirección en caso de rutas desconocidas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ExtraHoursProvider>
  );
};

export default App;
