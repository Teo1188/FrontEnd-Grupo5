import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Palette, 
  Language, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark bg-[#121E2F]' : 'light bg-white';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0070AD] to-[#00A3E1] flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-[#0070AD]">Configuraciones</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Palette className="mr-3 text-[#0070AD]" />
                <span className="font-semibold text-gray-800">Tema</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setTheme('light')} 
                  className={`p-2 rounded-full ${theme === 'light' ? 'bg-[#0070AD] text-white' : 'hover:bg-gray-200'}`}
                >
                  <Sun />
                </button>
                <button 
                  onClick={() => setTheme('dark')} 
                  className={`p-2 rounded-full ${theme === 'dark' ? 'bg-[#0070AD] text-white' : 'hover:bg-gray-200'}`}
                >
                  <Moon />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Language className="mr-3 text-[#0070AD]" />
                <span className="font-semibold text-gray-800">Idioma</span>
              </div>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border rounded-lg px-3 py-1"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;