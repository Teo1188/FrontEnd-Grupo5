import React, { useState } from "react";

const ExtraHoursPanel = () => {
  const [registros, setRegistros] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombre: "",
    fecha: "",
    actividad: "",
    horasDiurnas: "",
    horasNocturnas: "",
    tipoHoraExtra: "", // Se asegura de que este campo exista
  });

  const agregarRegistro = () => {
    if (
      nuevoRegistro.nombre &&
      nuevoRegistro.fecha &&
      nuevoRegistro.actividad &&
      (nuevoRegistro.horasDiurnas || nuevoRegistro.horasNocturnas) &&
      nuevoRegistro.tipoHoraExtra // Validar que el tipo de día sea obligatorio
    ) {
      setRegistros([
        ...registros,
        { ...nuevoRegistro, id: Date.now(), estado: "Pendiente" },
      ]);
      setNuevoRegistro({
        nombre: "",
        fecha: "",
        actividad: "",
        horasDiurnas: "",
        horasNocturnas: "",
        tipoHoraExtra: "", // Reiniciar correctamente
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Registrar Horas Extras</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 border rounded"
            value={nuevoRegistro.nombre}
            onChange={(e) =>
              setNuevoRegistro({ ...nuevoRegistro, nombre: e.target.value })
            }
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={nuevoRegistro.fecha}
            onChange={(e) =>
              setNuevoRegistro({ ...nuevoRegistro, fecha: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Actividad"
            className="p-2 border rounded"
            value={nuevoRegistro.actividad}
            onChange={(e) =>
              setNuevoRegistro({ ...nuevoRegistro, actividad: e.target.value })
            }
          />

          {/* Tipo de día */}
          <select
            className="p-2 border rounded"
            value={nuevoRegistro.tipoHoraExtra}
            onChange={(e) =>
              setNuevoRegistro({
                ...nuevoRegistro,
                tipoHoraExtra: e.target.value,
              })
            }
          >
            <option value="">Tipo de día</option>
            <option value="Normal " >Normal</option>
            <option value="Festivo">Festivo</option>
          </select>

          <input
            type="number"
            placeholder="Diurnas"
            className="p-2 border rounded"
            value={nuevoRegistro.horasDiurnas}
            onChange={(e) =>
              setNuevoRegistro({ ...nuevoRegistro, horasDiurnas: e.target.value })
            }
            min="0"
          />
          <input
            type="number"
            placeholder="Nocturnas"
            className="p-2 border rounded"
            value={nuevoRegistro.horasNocturnas}
            onChange={(e) =>
              setNuevoRegistro({ ...nuevoRegistro, horasNocturnas: e.target.value })
            }
            min="0"
          />
        </div>

        {/* Botón centrado */}
        <div className="flex justify-center">
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={agregarRegistro}
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Historial de Horas Extras</h2>

        {registros.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 w-1/6">Nombre</th>
                  <th className="p-3 w-1/6">Fecha</th>
                  <th className="p-3 w-1/6">Actividad</th>
                  <th className="p-3 w-1/12 text-center">Diurnas</th>
                  <th className="p-3 w-1/12 text-center">Nocturnas</th>
                  <th className="p-3 w-1/6 text-center">Tipo de día</th>
                  <th className="p-3 w-1/6 text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro) => (
                  <tr key={registro.id} className="border-t">
                    <td className="p-3">{registro.nombre}</td>
                    <td className="p-3">{registro.fecha}</td>
                    <td className="p-3">{registro.actividad}</td>
                    <td className="p-3 text-center">{Number(registro.horasDiurnas) || 0}</td>
                    <td className="p-3 text-center">{Number(registro.horasNocturnas) || 0}</td>
                    <td className="p-3 text-center">{registro.tipoHoraExtra}</td> {/* Ahora se mostrará correctamente */}
                    <td className="p-3 flex items-center gap-4">
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
          <p className="text-gray-500">No hay registros de horas extras aún</p>
        )}
      </div>
    </div>
  );
};

export default ExtraHoursPanel;
