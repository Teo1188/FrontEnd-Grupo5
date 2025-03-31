import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') === 'true');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setIsLoading(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      setIsLoading(false);
    }, 500); // Simula la carga
  };

  const toggleNotifications = () => {
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(!notifications);
      localStorage.setItem('notifications', !notifications);
      setIsLoading(false);
    }, 500); // Simula la carga
  };

  const resetSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTheme('light');
      setNotifications(true);
      localStorage.setItem('theme', 'light');
      localStorage.setItem('notifications', true);
      setIsLoading(false);
    }, 500); // Simula la carga
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#D7D2CB] to-gray-300 p-6 dark:bg-gray-900">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 dark:bg-gray-800 dark:text-white transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
        
        {/* Cabecera */}
        <div className="flex items-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft className="text-blue-700 dark:text-white" />
          </button>
          <h1 className="ml-4 text-3xl font-bold text-blue-700 dark:text-white">Configuraciones</h1>
        </div>

        {/* Contenido */}
        <div>
          <h3 className="bg-gray-200 text-gray-600 text-sm font-semibold py-2 px-3 rounded-lg dark:bg-gray-700 dark:text-gray-300">PREFERENCIAS</h3>
          <div className="mt-6 space-y-6">

            {/* Modo Oscuro */}
            <div className="flex justify-between items-center py-4 border-b dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300">Modo oscuro</span>
              <button
                onClick={toggleTheme}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            {/* Notificaciones */}
            <div className="flex justify-between items-center py-4 border-b dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300">Recibir notificaciones</span>
              <button
                onClick={toggleNotifications}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform ${notifications ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>

          {/* Restablecer configuración */}
          <div className="mt-8 text-center">
            <button
              onClick={resetSettings}
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition transform hover:scale-105 duration-300"
            >
              Restablecer configuración
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de carga */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-50 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Settings;
