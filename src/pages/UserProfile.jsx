import React, { useState, useEffect } from "react";
import { Camera, ArrowLeft, ChevronRight, User, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu"; // Importa el Menú lateral

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    nombre: "Tharaka",
    genero: "Masculino",
    email: "tharaka@gmail.com",
    cargo: "Auxiliar administrativo",
  });

  const [overtimeData, setOvertimeData] = useState({
    totalHoras: 45,
    horasAprobadas: 30,
    horasPendientes: 15
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("userProfileImage", imageUrl);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#D7D2CB] to-gray-300 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-36 flex items-center justify-center">
          <ArrowLeft className="absolute top-6 left-6 text-white cursor-pointer" size={32} />
          <Link to="/editar-perfil" className="absolute top-6 right-6 text-lg font-semibold text-white hover:underline">
            Editar perfil
          </Link>
        </div>

        <div className="relative -mt-16 flex justify-center mb-8">
          <label className="relative cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <User size={72} className="text-gray-500" />
              )}
            </div>
            <div className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-md">
              <Camera size={20} className="text-blue-500" />
            </div>
          </label>
        </div>

    <div className="flex">
      {/* Menú lateral */}
      <Menu />


      {/* Contenido principal */}
      <div className="flex-1 min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex justify-center items-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-36 flex items-center justify-center">
            <ArrowLeft className="absolute top-6 left-6 text-white cursor-pointer" size={32} />
            <Link to="/editar-perfil" className="absolute top-6 right-6 text-lg font-semibold text-white hover:underline">
              Editar perfil
            </Link>
          </div>

          <div className="relative -mt-16 flex justify-center mb-8">
            <label className="relative cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <User size={72} className="text-gray-500" />
                )}
              </div>
              <div className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-md">
                <Camera size={20} className="text-blue-500" />
              </div>
            </label>
          </div>

          <div className="px-8 pb-8">
            <h3 className="bg-gray-200 text-gray-600 text-base font-semibold py-2.5 px-4 rounded-lg">
              INFORMACIÓN BÁSICA
            </h3>

            <div className="mt-4 space-y-4">
              {[
                { label: "Nombre", value: userData.nombre },
                { label: "Género", value: userData.genero },
                { label: "Correo electrónico", value: userData.email },
                { label: "Cargo", value: userData.cargo },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3.5 border-b">
                  <span className="text-base text-gray-500">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-base text-gray-800 font-medium">{item.value}</span>
                    <ChevronRight size={22} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="bg-gray-200 text-gray-600 text-base font-semibold py-2.5 px-4 rounded-lg mt-8">
              REGISTRO DE HORAS EXTRAS
            </h3>

            <div className="mt-4 grid grid-cols-3 gap-5">
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

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/configuracion")}
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3.5 px-8 rounded-lg shadow-md transition text-base"
              >
                Configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
