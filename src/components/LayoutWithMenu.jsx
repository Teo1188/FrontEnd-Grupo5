import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu"; // Si tienes un menú lateral u otros elementos

const LayoutWithMenu = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  // Ejemplo de cómo podrías cargar notificaciones (esto es solo un ejemplo)
  useEffect(() => {
    // Aquí deberías cargar las notificaciones de alguna fuente de datos
    const sampleNotifications = [
      "Nueva hora extra pendiente de aprobación",
      "Solicitud de cambio de turno recibida",
    ];
    setNotificaciones(sampleNotifications);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Aquí va el Navbar con las notificaciones pasadas como prop */}
      <Navbar notificaciones={notificaciones} />

      <div className="flex flex-1">
        {/* Si tienes un menú lateral, debería ir aquí */}
        <Menu />
        
        <main className="flex-1 p-6">
          {children} {/* Los componentes de las rutas aparecerán aquí */}
        </main>
      </div>
    </div>
  );
};

export default LayoutWithMenu;
