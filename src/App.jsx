import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    alert('Instrucciones de recuperación enviadas');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <div className="bg-blue-800 text-white px-4 py-2 rounded-md inline-block mb-4">AMADEUS</div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Recuperación de Contraseña</h2>
          <p className="text-gray-600">
            Ingresa tu correo electrónico. Te enviaremos instrucciones para restablecer tu contraseña.
          </p>
        </div>
        
        <form onSubmit={handlePasswordRecovery}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="correo@ejemplo.com"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition duration-300 mb-4"
          >
            Enviar Instrucciones
          </button>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-blue-600 hover:underline"
            >
              Volver al Inicio de Sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="w-full max-w-4xl flex rounded-xl overflow-hidden shadow-2xl">
        <div className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 flex flex-col justify-center">
          <div className="mb-6">
            <div className="bg-white text-blue-800 px-4 py-2 rounded-md inline-block mb-4">AMADEUS</div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Bienvenido al Sistema de Registro de Horas</h2>
          <p className="text-lg">
            Gestiona tu tiempo de trabajo de manera eficiente. Registra tus horas extra, supervisa tus solicitudes y optimiza tu productividad.
          </p>
        </div>

        <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">Acceso al Sistema</h3>
          <p className="mb-6 text-gray-600">Ingresa tus credenciales para continuar</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="correo@ejemplo.com"
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                />
                <span>Recordarme</span>
              </div>
              <Link 
                to="/password-recovery" 
                className="text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return <div>Dashboard Content</div>;
};

const ExtraHour = () => {
  return <div>Extra Hours Content</div>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrahours" element={<ExtraHour />} />
      </Routes>
    </Router>
  );
};

export default App;