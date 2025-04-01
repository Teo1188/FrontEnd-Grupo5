import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 
import { useLanguage } from '../context/LanguageContext'; 

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setThemeMode, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage(); 
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') === 'true');

  useEffect(() => {
    localStorage.setItem('notifications', notifications.toString());
  }, [notifications]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
  };

  const toggleNotifications = () => {
    setNotifications(prevState => !prevState);
  };

  const resetSettings = () => {
    setThemeMode('light');
    setLanguage('es');
    setNotifications(false);

    localStorage.setItem('language', 'es');
    localStorage.setItem('notifications', 'false');
  };

  // Aplicando el modo oscuro a todo el documento
  useEffect(() => {
    // Cambiar el color de fondo del body
    document.body.className = isDark ? 'bg-gray-900' : 'bg-white';
    
    // Seleccionar el elemento main y actualizar su clase
    const mainElement = document.querySelector('main');
    if (mainElement) {
      // Mantener las clases existentes pero reemplazar la clase de fondo
      const classes = mainElement.className.replace(/bg-\w+-\d+/g, '');
      mainElement.className = `${classes} ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`.trim();
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen flex justify-center items-center p-6 transition-colors duration-200 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      <div className={`shadow-2xl rounded-3xl w-full max-w-lg p-6 transition-colors duration-200 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}>
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDark ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-200 text-blue-700'
            }`}
          >
            <ArrowLeft />
          </button>
          <h1 className="ml-4 text-2xl font-bold">
            {t('settings')}
          </h1>
        </div>

        <div>
          <h3 className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200 ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            {t('preferences')}
          </h3>
          <div className="mt-4 space-y-3">

            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span>
                {t('language')}
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`font-medium border-none focus:outline-none transition-colors duration-200 ${
                  isDark 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-800 bg-white'
                }`}
              >
                <option value="es" className={isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
                  Español
                </option>
                <option value="en" className={isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
                  English
                </option>
              </select>
            </div>

            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span>
                {t('darkMode')}
              </span>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  isDark ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={isDark ? t('activateLightMode') : t('activateDarkMode')}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  isDark ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>

            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span>
                {t('notifications')}
              </span>
              <button
                onClick={toggleNotifications}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={notifications ? t('deactivateNotifications') : t('activateNotifications')}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  notifications ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>

            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span>
                {t('reset')}
              </span>
              <button
                onClick={resetSettings}
                className={`hover:underline transition-colors duration-200 ${
                  isDark ? 'text-red-400' : 'text-red-500'
                }`}
              >
                {t('resetButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;