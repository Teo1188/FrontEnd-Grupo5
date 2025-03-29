import React, { useState } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";  // IMPORTAR HEADER
import { FaBell } from "react-icons/fa";

const ExtraHour = () => {
  const [registros, setRegistros] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombre: "",
    fecha: "",
    actividad: "",
    horas: "",
    tipoHoraExtra: "",
    estado: "Pendiente",
  });

  const agregarRegistro = () => {
    if (
      nuevoRegistro.nombre &&
      nuevoRegistro.fecha &&
      nuevoRegistro.actividad &&
      nuevoRegistro.horas &&
      nuevoRegistro.tipoHoraExtra
    ) {
      setRegistros([...registros, nuevoRegistro]);
      setNuevoRegistro({
        nombre: "",
        fecha: "",
        actividad: "",
        horas: "",
        tipoHoraExtra: "",
        estado: "Pendiente",
      });
    }
  };

  return (
    <div className="flex h-screen">
      {/* MENU LATERAL */}
      <Menu />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col flex-grow bg-gray-100">
        {/* HEADER PEGADO ARRIBA */}
        <Header />

        {/* Contenido principal */}
      <div className="flex flex-col flex-grow bg-gray-100 transition-all duration-300 p-6">
        <h2 className="text-2xl font-bold mb-2">Registro de Horas Extras</h2>
        <p className="mb-4">Aquí puedes registrar y gestionar tus horas extras.</p>


          {/* FORMULARIO */}
          <div className="mb-4 grid grid-cols-6 gap-2">
            <input
              type="text"
              placeholder="Nombre"
              className="p-2 border rounded col-span-2"
              value={nuevoRegistro.nombre}
              onChange={(e) =>
                setNuevoRegistro({ ...nuevoRegistro, nombre: e.target.value })
              }
            />
            <input
              type="date"
              className="p-2 border rounded col-span-1"
              value={nuevoRegistro.fecha}
              onChange={(e) =>
                setNuevoRegistro({ ...nuevoRegistro, fecha: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cargo"
              className="p-2 border rounded col-span-2"
              value={nuevoRegistro.actividad}
              onChange={(e) =>
                setNuevoRegistro({
                  ...nuevoRegistro,
                  actividad: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Horas"
              className="p-2 border rounded col-span-1"
              value={nuevoRegistro.horas}
              onChange={(e) =>
                setNuevoRegistro({ ...nuevoRegistro, horas: e.target.value })
              }
            />
            <select
              className="p-2 border rounded col-span-2"
              value={nuevoRegistro.tipoHoraExtra}
              onChange={(e) =>
                setNuevoRegistro({
                  ...nuevoRegistro,
                  tipoHoraExtra: e.target.value,
                })
              }
            >
              <option value="">Tipo de horas extras</option>
              <option value="Diurnas">Diurnas</option>
              <option value="Nocturnas">Nocturnas</option>
              <option value="Festivas">Festivas</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded col-span-1"
              onClick={agregarRegistro}
            >
              Agregar
            </button>
          </div>

          {/* TABLA DE REGISTROS */}
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Empleado</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Actividad</th>
                <th className="p-3 text-left">Horas</th>
                <th className="p-3 text-left">Tipo de Hora Extra</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3">{registro.nombre}</td>
                  <td className="p-3">{registro.fecha}</td>
                  <td className="p-3">{registro.actividad}</td>
                  <td className="p-3">{registro.horas}</td>
                  <td className="p-3">{registro.tipoHoraExtra}</td>
                  <td className="p-3 flex space-x-2">
                    {registro.estado === "Pendiente" ? (
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
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
      </div>
    </div>
  );
};

export default ExtraHour;
