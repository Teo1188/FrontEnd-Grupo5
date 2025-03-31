import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const ExtraHoursContext = createContext();

// Hook para usar el contexto
export const useExtraHours = () => useContext(ExtraHoursContext);

// Componente proveedor que envuelve a toda la aplicación
export const ExtraHoursProvider = ({ children }) => {
  // Obtener los registros del localStorage o usar un array vacío como fallback
  const [registros, setRegistros] = useState(() => {
    const storedRegistros = localStorage.getItem("registros");
    return storedRegistros ? JSON.parse(storedRegistros) : [];
  });

  // Usuario de ejemplo (ajusta según tu sistema de autenticación)
  const [usuario, setUsuario] = useState({ nombre: "Michell Londoño" });

  // Función para agregar un nuevo registro
  const agregarRegistro = (registro) => {
    const nuevoRegistro = { ...registro, id: new Date().getTime(), estado: "Pendiente" };
    const nuevosRegistros = [...registros, nuevoRegistro];
    setRegistros(nuevosRegistros);
    localStorage.setItem("registros", JSON.stringify(nuevosRegistros)); // Guardar en localStorage
  };

  // Función para actualizar el estado de un registro (Aprobado o Rechazado)
  const actualizarEstado = (id, estado) => {
    const registrosActualizados = registros.map((registro) =>
      registro.id === id ? { ...registro, estado } : registro
    );
    setRegistros(registrosActualizados);
    localStorage.setItem("registros", JSON.stringify(registrosActualizados)); // Guardar en localStorage
  };

  // Función para eliminar un registro
  const eliminarRegistro = (id) => {
    const registrosFiltrados = registros.filter((registro) => registro.id !== id);
    setRegistros(registrosFiltrados);
    localStorage.setItem("registros", JSON.stringify(registrosFiltrados)); // Guardar en localStorage
  };

  return (
    <ExtraHoursContext.Provider value={{ registros, agregarRegistro, actualizarEstado, eliminarRegistro, usuario }}>
      {children}
    </ExtraHoursContext.Provider>
  );
};
