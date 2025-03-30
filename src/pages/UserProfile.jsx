import React, { useState, useEffect } from "react";
import { Camera, ArrowLeft, ChevronRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    nombre: "Tharaka",
    genero: "Masculino",
    email: "tharaka@gmail.com",
    cargo: "Auxiliar administrativo",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    
    // Cargar imagen de perfil guardada
    const storedImage = localStorage.getItem("userProfileImage");
    if (storedImage) {
      setProfileImage(storedImage);
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
    <div className="flex min-h-screen bg-gradient-to-b from-[#D7D2CB] to-gray-300">
      {/* Menú lateral */}
      <Menu />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Encabezado con gradiente azul */}
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-36 flex items-center justify-center">
            <ArrowLeft 
              className="absolute top-6 left-6 text-white cursor-pointer" 
              size={32} 
              onClick={() => navigate(-1)}
            />
            <Link to="/editar-perfil" className="absolute top-6 right-6 text-lg font-semibold text-white hover:underline">
              Editar perfil
            </Link>
          </div>

          {/* Foto de perfil */}
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

          {/* Información del usuario */}
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

            {/* Botón de configuración */}
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