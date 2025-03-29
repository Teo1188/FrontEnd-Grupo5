import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Bell, Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') === 'true');
  const [backgroundPlay, setBackgroundPlay] = useState(localStorage.getItem('backgroundPlay') === 'true');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('notifications', notifications);
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('backgroundPlay', backgroundPlay);
  }, [backgroundPlay]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#D7D2CB] to-gray-300 p-6 dark:bg-gray-900">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-6 dark:bg-gray-800 dark:text-white">
  
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft className="text-blue-700 dark:text-white" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-blue-700 dark:text-white">Configuraciones</h1>
        </div>

        <div>
          <h3 className="bg-gray-200 text-gray-600 text-sm font-semibold py-2 px-3 rounded-lg dark:bg-gray-700 dark:text-gray-300">PREFERENCIAS</h3>
          <div className="mt-4 space-y-3">

            <div className="flex justify-between items-center py-3 border-b dark:border-gray-600">
              <span className="text-gray-500 dark:text-gray-300">Idioma</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-gray-800 font-medium border-none bg-transparent focus:outline-none dark:bg-gray-800 dark:text-white"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex justify-between items-center py-3 border-b dark:border-gray-600">
              <span className="text-gray-500 dark:text-gray-300">Modo oscuro</span>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            <div className="flex justify-between items-center py-3 border-b dark:border-gray-600">
              <span className="text-gray-500 dark:text-gray-300">Recibir notificaciones</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform ${notifications ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            <div className="flex justify-between items-center py-3 border-b dark:border-gray-600">
              <span className="text-gray-500 dark:text-gray-300">Reproducir en segundo plano</span>
              <button
                onClick={() => setBackgroundPlay(!backgroundPlay)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${backgroundPlay ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform ${backgroundPlay ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;