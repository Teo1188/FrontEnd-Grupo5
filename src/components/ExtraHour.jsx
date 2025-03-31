import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ExtraHoursPanel = () => {
  const { theme, isDark } = useTheme(); 
  const { t } = useLanguage();
  const [registros, setRegistros] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombre: "",
    fecha: "",
    actividad: "",
    horas: "",
    tipoHoraExtra: "",
  });
  
  const [overtimeData, setOvertimeData] = useState({
    totalHoras: 45,
    horasAprobadas: 30,
    horasPendientes: 15
  });

  const agregarRegistro = () => {
    if (nuevoRegistro.nombre && nuevoRegistro.fecha && nuevoRegistro.actividad && nuevoRegistro.horas) {
      const nuevoItem = { 
        ...nuevoRegistro, 
        id: Date.now(), 
        estado: "Pendiente" 
      };
      
      setRegistros([...registros, nuevoItem]);
  
      setOvertimeData(prev => ({
        ...prev,
        totalHoras: prev.totalHoras + Number(nuevoRegistro.horas),
        horasPendientes: prev.horasPendientes + Number(nuevoRegistro.horas)
      }));
      
      setNuevoRegistro({
        nombre: "",
        fecha: "",
        actividad: "",
        horas: "",
        tipoHoraExtra: "",
      });
    }
  };


  const mainBgColor = isDark ? "bg-gray-900" : "bg-gray-100";
  const panelBgColor = isDark ? "bg-gray-800/80" : "bg-white";

  return (
    <div className={`min-h-screen w-full ${mainBgColor} text-${isDark ? "white" : "gray-800"} transition-colors duration-200`}>
      <div className="container mx-auto p-6 space-y-6">
        <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${panelBgColor}`}>
          <h3 className="text-xl font-bold mb-4">Resumen de Horas Extras</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`p-5 rounded-lg text-center transition-colors duration-200 ${
              isDark ? "bg-blue-900/30" : "bg-blue-50"
            }`}>
              <Clock className="mx-auto mb-3 text-blue-500" size={40} />
              <h4 className={`text-base transition-colors duration-200 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>Total horas extra trabajadas</h4>
              <p className="text-2xl font-bold text-blue-600">{overtimeData.totalHoras}</p>
            </div>
            <div className={`p-5 rounded-lg text-center transition-colors duration-200 ${
              isDark ? "bg-green-900/30" : "bg-green-50"
            }`}>
              <Clock className="mx-auto mb-3 text-green-500" size={40} />
              <h4 className={`text-base transition-colors duration-200 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>Horas aprobadas por administrador</h4>
              <p className="text-2xl font-bold text-green-600">{overtimeData.horasAprobadas}</p>
            </div>
            <div className={`p-5 rounded-lg text-center transition-colors duration-200 ${
              isDark ? "bg-yellow-900/30" : "bg-yellow-50"
            }`}>
              <Clock className="mx-auto mb-3 text-yellow-500" size={40} />
              <h4 className={`text-base transition-colors duration-200 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>Horas pendientes por aprobar</h4>
              <p className="text-2xl font-bold text-yellow-600">{overtimeData.horasPendientes}</p>
            </div>
          </div>
        </div>

        {/* Formulario de registro de horas extras */}
        <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${panelBgColor}`}>
          <h2 className="text-xl font-bold mb-4">Registrar Horas Extras</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              className={`p-2 border rounded col-span-2 transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.nombre}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, nombre: e.target.value})}
            />
            <input
              type="date"
              className={`p-2 border rounded transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.fecha}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, fecha: e.target.value})}
            />
            <input
              type="text"
              placeholder="Actividad"
              className={`p-2 border rounded col-span-2 transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.actividad}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, actividad: e.target.value})}
            />
            <input
              type="number"
              placeholder="Horas"
              className={`p-2 border rounded transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.horas}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, horas: e.target.value})}
            />
            <select
              className={`p-2 border rounded col-span-2 transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.tipoHoraExtra}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, tipoHoraExtra: e.target.value})}
            >
              <option value="">Tipo de hora extra</option>
              <option value="Diurna">Diurna</option>
              <option value="Nocturna">Nocturna</option>
              <option value="Festiva">Festiva</option>
            </select>
            <button
              className={`text-white p-2 rounded col-span-1 transition-colors duration-200 ${
                isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={agregarRegistro}
            >
              Agregar
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${panelBgColor}`}>
          <h2 className="text-xl font-bold mb-4">Historial de Horas Extras</h2>
          
          {registros.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`text-left transition-colors duration-200 ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Actividad</th>
                    <th className="p-3">Horas</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((registro) => (
                    <tr key={registro.id} className={`border-t transition-colors duration-200 ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    }`}>
                      <td className="p-3">{registro.nombre}</td>
                      <td className="p-3">{registro.fecha}</td>
                      <td className="p-3">{registro.actividad}</td>
                      <td className="p-3">{registro.horas}</td>
                      <td className="p-3">{registro.tipoHoraExtra}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          registro.estado === "Pendiente" 
                            ? isDark ? "bg-yellow-800/50 text-yellow-200" : "bg-yellow-100 text-yellow-800" 
                            : isDark ? "bg-green-800/50 text-green-200" : "bg-green-100 text-green-800"
                        }`}>
                          {registro.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={`transition-colors duration-200 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>No hay registros de horas extras aún</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtraHoursPanel;