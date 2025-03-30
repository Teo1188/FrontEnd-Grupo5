import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const ExtraHoursPanel = () => {
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
      
      // Actualizar el resumen de horas extras
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

  return (
    <div className="space-y-6 w-full p-6">
      {/* Resumen de horas extras */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Resumen de Horas Extras</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-blue-50 p-5 rounded-lg text-center">
            <Clock className="mx-auto mb-3 text-blue-500" size={40} />
            <h4 className="text-base text-gray-600">Total horas extra trabajadas</h4>
            <p className="text-2xl font-bold text-blue-600">{overtimeData.totalHoras}</p>
          </div>
          <div className="bg-green-50 p-5 rounded-lg text-center">
            <Clock className="mx-auto mb-3 text-green-500" size={40} />
            <h4 className="text-base text-gray-600">Horas aprobadas por administrador</h4>
            <p className="text-2xl font-bold text-green-600">{overtimeData.horasAprobadas}</p>
          </div>
          <div className="bg-yellow-50 p-5 rounded-lg text-center">
            <Clock className="mx-auto mb-3 text-yellow-500" size={40} />
            <h4 className="text-base text-gray-600">Horas pendientes por aprobar</h4>
            <p className="text-2xl font-bold text-yellow-600">{overtimeData.horasPendientes}</p>
          </div>
        </div>
      </div>

      {/* Formulario de registro de horas extras */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Registrar Horas Extras</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 border rounded col-span-2"
            value={nuevoRegistro.nombre}
            onChange={(e) => setNuevoRegistro({...nuevoRegistro, nombre: e.target.value})}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={nuevoRegistro.fecha}
            onChange={(e) => setNuevoRegistro({...nuevoRegistro, fecha: e.target.value})}
          />
          <input
            type="text"
            placeholder="Actividad"
            className="p-2 border rounded col-span-2"
            value={nuevoRegistro.actividad}
            onChange={(e) => setNuevoRegistro({...nuevoRegistro, actividad: e.target.value})}
          />
          <input
            type="number"
            placeholder="Horas"
            className="p-2 border rounded"
            value={nuevoRegistro.horas}
            onChange={(e) => setNuevoRegistro({...nuevoRegistro, horas: e.target.value})}
          />
          <select
            className="p-2 border rounded col-span-2"
            value={nuevoRegistro.tipoHoraExtra}
            onChange={(e) => setNuevoRegistro({...nuevoRegistro, tipoHoraExtra: e.target.value})}
          >
            <option value="">Tipo de hora extra</option>
            <option value="Diurna">Diurna</option>
            <option value="Nocturna">Nocturna</option>
            <option value="Festiva">Festiva</option>
          </select>
          <button
            className="bg-blue-600 text-white p-2 rounded col-span-1 hover:bg-blue-700"
            onClick={agregarRegistro}
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Historial de horas extras */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Historial de Horas Extras</h2>
        
        {registros.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
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
                  <tr key={registro.id} className="border-t">
                    <td className="p-3">{registro.nombre}</td>
                    <td className="p-3">{registro.fecha}</td>
                    <td className="p-3">{registro.actividad}</td>
                    <td className="p-3">{registro.horas}</td>
                    <td className="p-3">{registro.tipoHoraExtra}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        registro.estado === "Pendiente" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
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
          <p className="text-gray-500">No hay registros de horas extras aún</p>
        )}
      </div>
    </div>
  );
};

export default ExtraHoursPanel;