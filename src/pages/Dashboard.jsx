// src/pages/Dashboard.jsx

import React from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import ExtraHoursPanel from "../components/ExtraHoursPanel"; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      
      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 bg-gray-50">
        

        {/* Contenido principal (Horas Extras) */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ExtraHoursPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
