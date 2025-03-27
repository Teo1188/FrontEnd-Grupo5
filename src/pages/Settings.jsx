import React, { useState, useEffect } from 'react';
import { Moon, Sun, Palette, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.backgroundColor = theme === 'dark' ? '#121E2F' : '#ffffff';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#121E2F]' : 'bg-gradient-to-br from-[#0070AD] to-[#00A3E1]'} flex justify-center items-center`}>
      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} shadow-2xl rounded-3xl w-full max-w-lg p-8 transition-all duration-300 hover:shadow-xl`}>
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className={`mr-4 p-2 rounded-full transition ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            aria-label="Volver atrás"
          >
            <ArrowLeft className={theme === 'dark' ? 'text-white' : 'text-[#0070AD]'} />
          </button>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0070AD]'}`}>
            Configuraciones
          </h1>
        </div>

        {/* ... (resto de tu código de configuración) ... */}
      </div>
    </div>
  );
};

export default Settings;