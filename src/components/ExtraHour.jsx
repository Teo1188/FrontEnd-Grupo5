import React, { useState } from 'react';

const ExtraHoursPanel = () => {
  const [registros, setRegistros] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombre: "",
    fecha: "",
    actividad: "",
    horas: "",
    tipoHoraExtra: "",
  });

  const agregarRegistro = () => {
    if (nuevoRegistro.nombre && nuevoRegistro.fecha && nuevoRegistro.actividad && nuevoRegistro.horas) {
      setRegistros([...registros, { ...nuevoRegistro, id: Date.now(), estado: "Pendiente" }]);
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
    <div className="space-y-6">
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