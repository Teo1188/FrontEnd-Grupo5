import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ExtraHour from './components/ExtraHour';
import Menu from './components/Menu';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/configuracion" element={<Settings />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

// Componente de layout que incluye el menú
const LayoutWithMenu = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Menu />
      <div className="flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
};



export default App;