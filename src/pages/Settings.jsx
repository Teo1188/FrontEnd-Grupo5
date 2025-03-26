import React, { useState, useEffect } from 'react';
import { Moon, Sun, Palette, Language, ArrowLeft } from 'lucide-react';
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

        <div className="space-y-6">
          <section className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Palette className={`mr-3 ${theme === 'dark' ? 'text-[#00A3E1]' : 'text-[#0070AD]'}`} />
                <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  Tema
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setTheme('light')} 
                  className={`p-2 rounded-full transition ${theme === 'light' ? 'bg-[#0070AD] text-white' : theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                  aria-label="Tema claro"
                >
                  <Sun size={20} />
                </button>
                <button 
                  onClick={() => setTheme('dark')} 
                  className={`p-2 rounded-full transition ${theme === 'dark' ? 'bg-[#00A3E1] text-white' : theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                  aria-label="Tema oscuro"
                >
                  <Moon size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Sección de Idioma */}
          <section className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Language className={`mr-3 ${theme === 'dark' ? 'text-[#00A3E1]' : 'text-[#0070AD]'}`} />
                <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  Idioma
                </span>
              </div>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className={`border rounded-lg px-3 py-1 transition ${theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'}`}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;