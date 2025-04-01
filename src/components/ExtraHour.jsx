import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { FaSearch } from "react-icons/fa";

const ExtraHoursPanel = () => {
  const { theme, isDark } = useTheme(); 
  const { t } = useLanguage();
  const [registros, setRegistros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombre: "",
    fecha: "",
    actividad: "",
    horasDiurnas: "",
    horasNocturnas: "",
    tipoHoraExtra: "",
  });
  
  const [overtimeData, setOvertimeData] = useState({
    totalHoras: 0,
    horasAprobadas: 0,
    horasPendientes: 0
  });

  
  useEffect(() => {
    const calcularTotales = () => {
      let total = 0;
      let aprobadas = 0;
      let pendientes = 0;

      registros.forEach(registro => {
        const horasD = Number(registro.horasDiurnas) || 0;
        const horasN = Number(registro.horasNocturnas) || 0;
        const totalRegistro = horasD + horasN;

        total += totalRegistro;
        
        if (registro.estado === "Aprobado") {
          aprobadas += totalRegistro;
        } else if (registro.estado === "Pendiente") {
          pendientes += totalRegistro;
        }
      });

      setOvertimeData({
        totalHoras: total,
        horasAprobadas: aprobadas,
        horasPendientes: pendientes
      });
    };

    calcularTotales();
  }, [registros]);

 
  useEffect(() => {
    if (searchTerm) {
      setFilteredRegistros(
        registros.filter((registro) =>
          registro.nombre.toLowerCase().includes(searchTerm) ||
          registro.fecha.toLowerCase().includes(searchTerm) ||
          registro.actividad.toLowerCase().includes(searchTerm) ||
          registro.tipoHoraExtra.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setFilteredRegistros(registros);
    }
  }, [registros, searchTerm]);

  const agregarRegistro = () => {
    if (nuevoRegistro.nombre && nuevoRegistro.fecha && nuevoRegistro.actividad && 
        (nuevoRegistro.horasDiurnas || nuevoRegistro.horasNocturnas) && nuevoRegistro.tipoHoraExtra) {
      
      const horasD = Number(nuevoRegistro.horasDiurnas) || 0;
      const horasN = Number(nuevoRegistro.horasNocturnas) || 0;
      
      const nuevoItem = { 
        ...nuevoRegistro,
        horasDiurnas: horasD,
        horasNocturnas: horasN,
        id: Date.now(), 
        estado: "Pendiente" 
      };
      
      setRegistros([...registros, nuevoItem]);
      
      setNuevoRegistro({
        nombre: "",
        fecha: "",
        actividad: "",
        horasDiurnas: "",
        horasNocturnas: "",
        tipoHoraExtra: "",
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const mainBgColor = isDark ? "bg-gray-900" : "bg-gray-100";
  const panelBgColor = isDark ? "bg-gray-800/80" : "bg-white";

  return (
    <div className={`min-h-screen w-full ${mainBgColor} text-${isDark ? "white" : "gray-800"} transition-colors duration-200`}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Resumen de Horas Extras */}
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

        {/* Formulario de registro */}
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

            {/* Tipo de día */}
            <select
              className={`p-2 border rounded transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.tipoHoraExtra}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, tipoHoraExtra: e.target.value})}
            >
              <option value="">Tipo de día</option>
              <option value="Normal">Normal</option>
              <option value="Festivo">Festivo</option>
            </select>

            <input
              type="number"
              placeholder="Diurnas"
              className={`p-2 border rounded transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.horasDiurnas}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, horasDiurnas: e.target.value})}
              min="0"
            />
            <input
              type="number"
              placeholder="Nocturnas"
              className={`p-2 border rounded transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={nuevoRegistro.horasNocturnas}
              onChange={(e) => setNuevoRegistro({...nuevoRegistro, horasNocturnas: e.target.value})}
              min="0"
            />

            <button
              className={`flex justify-center text-white p-2 rounded col-span-1 transition-colors duration-200 ${
                isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={agregarRegistro}
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Buscador de registros */}
        <div className="mb-6 flex items-center">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, fecha, actividad o tipo"
              className={`pl-10 p-2 border rounded-full w-full transition-colors duration-200 ${
                isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
              }`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Historial de Horas Extras */}
        <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${panelBgColor}`}>
          <h2 className="text-xl font-bold mb-4">Historial de Horas Extras</h2>
          
          {filteredRegistros.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`text-left transition-colors duration-200 ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Actividad</th>
                    <th className="p-3">Diurnas</th>
                    <th className="p-3">Nocturnas</th>
                    <th className="p-3">Tipo de día</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistros.map((registro) => (
                    <tr key={registro.id} className={`border-t transition-colors duration-200 ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    }`}>
                      <td className="p-3">{registro.nombre}</td>
                      <td className="p-3">{registro.fecha}</td>
                      <td className="p-3">{registro.actividad}</td>
                      <td className="p-3 text-center">{registro.horasDiurnas}</td>
                      <td className="p-3 text-center">{registro.horasNocturnas}</td>
                      <td className="p-3 text-center">{registro.tipoHoraExtra}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          registro.estado === "Pendiente" 
                            ? isDark ? "bg-yellow-800/50 text-yellow-200" : "bg-yellow-100 text-yellow-800" 
                            : isDark ? "bg-green-800/50 text-green-200" : "bg-green-100 text-green-800"
                        }`}>
                          {registro.estado}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        {registro.estado === "Pendiente" ? (
                          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg">
                            Mandar
                          </button>
                        ) : (
                          <span className="bg-green-500 text-white px-4 py-2 rounded-lg">
                            Enviado
                          </span>
                        )}
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                          Descargar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={`transition-colors duration-200 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              {searchTerm ? "No se encontraron resultados para la búsqueda" : "No hay registros de horas extras aún"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtraHoursPanel;