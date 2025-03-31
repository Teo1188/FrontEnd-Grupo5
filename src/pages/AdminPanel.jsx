import React, { useState, useEffect } from "react";
import { useExtraHours } from "../context/ExtraHoursContext"; // Asegúrate de que el contexto esté correcto
import Navbar from "../components/Navbar"; // Ruta del Navbar
import { FaSearch } from "react-icons/fa"; // Icono de búsqueda

const AdminPanel = () => {
  const { registros, actualizarEstado } = useExtraHours();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredRegistros, setFilteredRegistros] = useState(registros);
  const [notificaciones, setNotificaciones] = useState([]);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Convierte el valor a minúsculas
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

  // Función para manejar la actualización de estado y agregar notificación
  const handleEstado = (id, estado) => {
    actualizarEstado(id, estado);
    const mensaje = estado === "Aprobado" 
      ? `Solicitud de ${id} aprobada.` 
      : `Solicitud de ${id} rechazada.`;
    setNotificaciones([...notificaciones, mensaje]); // Agregar notificación
  };

  useEffect(() => {
    // Actualizamos los registros filtrados cuando `registros` cambie
    setFilteredRegistros(registros);
  }, [registros]);

  return (
    <div>
     
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Solicitudes de Horas Extras</h2>

        {/* Buscador */}
        <div className="mb-6 flex items-center">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, fecha, actividad o tipo"
              className="pl-10 p-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Carga de datos (si no hay solicitudes aún) */}
        {filteredRegistros.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-500">No hay solicitudes pendientes.</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Nombre del Solicitante</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Actividad</th>
                <th className="p-3">Horas</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistros.map((registro) => (
                <tr key={registro.id} className="border-t">
                  <td className="p-3">{registro.nombre || registro.usuarioSolicitante || 'Desconocido'}</td>
                  <td className="p-3">{registro.fecha}</td>
                  <td className="p-3">{registro.actividad}</td>
                  <td className="p-3">{registro.horas}</td>
                  <td className="p-3">{registro.tipoHoraExtra}</td>
                  <td className={`p-3 font-semibold ${registro.estado === "Pendiente" ? "text-yellow-600" : registro.estado === "Aprobado" ? "text-green-600" : "text-red-600"}`}>
                    {registro.estado}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEstado(registro.id, 'Aprobado')}
                      disabled={registro.estado !== "Pendiente"} // Deshabilitar si el estado no es "Pendiente"
                      className={`px-4 py-2 rounded-md ${registro.estado !== "Pendiente" ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleEstado(registro.id, 'Rechazado')}
                      disabled={registro.estado !== "Pendiente"} // Deshabilitar si el estado no es "Pendiente"
                      className={`px-4 py-2 rounded-md ${registro.estado !== "Pendiente" ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"}`}
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
