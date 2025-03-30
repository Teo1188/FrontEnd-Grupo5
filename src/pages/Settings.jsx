import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Objeto de traducciones
const translations = {
  es: {
    settings: "Configuraciones",
    preferences: "PREFERENCIAS",
    language: "Idioma",
    darkMode: "Modo oscuro",
    notifications: "Recibir notificaciones",
    reset: "Restablecer configuraciones",
    resetButton: "Restablecer",
    activateDarkMode: "Activar modo oscuro",
    activateLightMode: "Activar modo claro",
    activateNotifications: "Activar notificaciones",
    deactivateNotifications: "Desactivar notificaciones"
  },
  en: {
    settings: "Settings",
    preferences: "PREFERENCES",
    language: "Language",
    darkMode: "Dark mode",
    notifications: "Receive notifications",
    reset: "Reset settings",
    resetButton: "Reset",
    activateDarkMode: "Activate dark mode",
    activateLightMode: "Activate light mode",
    activateNotifications: "Activate notifications",
    deactivateNotifications: "Deactivate notifications"
  }
};

const Settings = () => {
  const navigate = useNavigate();
  
  // Inicializar el tema desde localStorage o usar 'light' como valor predeterminado
  const [theme, setTheme] = useState(() => {
    // Obtener el tema guardado o usar 'light' como valor predeterminado
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') === 'true');

  // Función para obtener texto según el idioma seleccionado
  const t = (key) => {
    return translations[language][key] || key;
  };

  // Efecto para aplicar el tema al cargar el componente y cuando cambie
  useEffect(() => {
    // Aplicar la clase 'dark' al documento según el tema seleccionado
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Función para alternar entre temas
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Actualizar notificaciones en localStorage cuando cambia el estado
  useEffect(() => {
    localStorage.setItem('notifications', notifications.toString());
  }, [notifications]);

  // Función para manejar el cambio de notificaciones
  const toggleNotifications = () => {
    setNotifications(prevState => !prevState);
  };

  const resetSettings = () => {
    // Establecer valores predeterminados
    setTheme('light');
    setLanguage('es');
    setNotifications(false);
    
    // Eliminar la clase dark
    document.documentElement.classList.remove('dark');
    
    // Actualizar localStorage con valores predeterminados
    localStorage.setItem('theme', 'light');
    localStorage.setItem('language', 'es');
    localStorage.setItem('notifications', 'false');
  };

  return (
    <div className={`min-h-screen flex justify-center items-center p-6 transition-colors duration-200 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-[#D7D2CB] to-gray-300'}`}>
      <div className={`shadow-2xl rounded-3xl w-full max-w-lg p-6 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-2 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <ArrowLeft className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`} />
          </button>
          <h1 className={`ml-4 text-2xl font-bold transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {t('settings')}
          </h1>
        </div>

        <div>
          <h3 className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200 ${
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            {t('preferences')}
          </h3>
          <div className="mt-4 space-y-3">

            {/* Idioma */}
            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span className={`transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t('language')}
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`font-medium border-none focus:outline-none transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-800 bg-transparent'
                }`}
              >
                <option value="es" className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
                  Español
                </option>
                <option value="en" className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
                  English
                </option>
              </select>
            </div>

            {/* Modo Oscuro */}
            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span className={`transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t('darkMode')}
              </span>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={theme === 'dark' ? t('activateLightMode') : t('activateDarkMode')}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            {/* Notificaciones */}
            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span className={`transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t('notifications')}
              </span>
              <button
                onClick={toggleNotifications}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={notifications ? t('deactivateNotifications') : t('activateNotifications')}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${notifications ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            {/* Restablecer Configuraciones */}
            <div className={`flex justify-between items-center py-3 border-b transition-colors duration-200 ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <span className={`transition-colors duration-200 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t('reset')}
              </span>
              <button
                onClick={resetSettings}
                className={`hover:underline transition-colors duration-200 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}
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