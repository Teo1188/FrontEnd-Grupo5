import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout'; // Nuevo componente Layout
import ExtraHour from './components/ExtraHour';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import PasswordRecovery from './pages/PasswordRecovery';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext'; 
import { LanguageProvider } from './context/LanguageContext'; 

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            
            {/* Rutas con layout */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<ExtraHour />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/editar-perfil" element={<EditProfile />} />
              <Route path="/configuracion" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;