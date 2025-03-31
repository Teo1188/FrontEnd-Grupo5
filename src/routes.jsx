import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import Dashboard from "./pages/Dashboard";
import ExtraHoursPanel from "./components/ExtraHoursPanel";
import AdminPanel from "./pages/AdminPanel";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />

      {/* Rutas protegidas con menú */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/extrahour" element={<Layout><ExtraHoursPanel /></Layout>} />
      <Route path="/admin-panel" element={<Layout><AdminPanel /></Layout>} />
      <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
      <Route path="/editar-perfil" element={<Layout><EditProfile /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />

      {/* Redirección en caso de rutas desconocidas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
