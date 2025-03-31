import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ExtraHour from './components/ExtraHour';
import Menu from './components/Menu';
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
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/extrahour" element={<ExtraHour />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/editar-perfil" element={<EditProfile />} />
          <Route path="/configuracion" element={<Settings />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;