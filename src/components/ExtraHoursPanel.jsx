import React, { useState } from "react";
import { useExtraHours } from "../context/ExtraHoursContext";
import { FaSearch } from "react-icons/fa";

const ExtraHoursPanel = () => {
  const { registros, agregarRegistro } = useExtraHours();
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombre: "",
    fecha: "",
    actividad: "",
    horas: "",
    tipoHoraExtra: "",
  });

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegistros, setFilteredRegistros] = useState(registros);

  const handleAgregar = () => {
    if (!nuevoRegistro.nombre || !nuevoRegistro.fecha || !nuevoRegistro.actividad || !nuevoRegistro.horas || !nuevoRegistro.tipoHoraExtra) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    agregarRegistro(nuevoRegistro);
    setNuevoRegistro({
      nombre: "",
      fecha: "",
      actividad: "",
      horas: "",
      tipoHoraExtra: "",
    });
    setError(""); 
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredRegistros(
      registros.filter((registro) =>
        registro.nombre.toLowerCase().includes(value) ||
        registro.fecha.toLowerCase().includes(value) ||
        registro.actividad.toLowerCase().includes(value) ||
        registro.tipoHoraExtra.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Formulario de agregar horas extras */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Registrar Horas Extras</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          {/* Inputs para registrar las horas extras */}
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 border rounded col-span-2"
            value={nuevoRegistro.nombre}
            onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, nombre: e.target.value })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={nuevoRegistro.fecha}
            onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, fecha: e.target.value })}
          />
          <input
            type="text"
            placeholder="Actividad"
            className="p-2 border rounded col-span-2"
            value={nuevoRegistro.actividad}
            onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, actividad: e.target.value })}
          />
          <input
            type="number"
            placeholder="Horas"
            className="p-2 border rounded"
            value={nuevoRegistro.horas}
            onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, horas: e.target.value })}
          />
          <select
            className="p-2 border rounded col-span-2"
            value={nuevoRegistro.tipoHoraExtra}
            onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, tipoHoraExtra: e.target.value })}
          >
            <option value="">Tipo de hora extra</option>
            <option value="Diurna">Diurna</option>
            <option value="Nocturna">Nocturna</option>
            <option value="Festiva">Festiva</option>
          </select>
          <button
            className="bg-blue-600 text-white p-2 rounded col-span-1 hover:bg-blue-700"
            onClick={handleAgregar}
          >
            Agregar
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Buscador de registros */}
      <div className="mb-6 flex items-center">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, fecha, actividad o tipo"
            className="pl-10 p-2 border rounded-full w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Tabla de registros */}
      <h2 className="text-xl font-bold mt-6 mb-4">Historial de Horas Extras</h2>
      {filteredRegistros.length > 0 ? (
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
            {filteredRegistros.map((registro) => (
              <tr key={registro.id} className="border-t">
                <td className="p-3">{registro.nombre}</td>
                <td className="p-3">{registro.fecha}</td>
                <td className="p-3">{registro.actividad}</td>
                <td className="p-3">{registro.horas}</td>
                <td className="p-3">{registro.tipoHoraExtra}</td>
                <td className={`p-3 font-semibold ${registro.estado === "Pendiente" ? "text-yellow-600" : registro.estado === "Aprobado" ? "text-green-600" : "text-red-600"}`}>
                  {registro.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay registros de horas extras.</p>
      )}
    </div>
  );
};

export default ExtraHoursPanel;
