import React, { useState, useEffect } from "react";
import { Camera, ArrowLeft, ChevronRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-48 flex items-center justify-center rounded-b-3xl">
          <ArrowLeft className="absolute top-6 left-6 text-white cursor-pointer" size={24} />
          <Link to="/editar-perfil" className="absolute top-6 right-6 text-lg font-semibold text-white hover:underline">
            Editar perfil
          </Link>
        </div>


        <div className="relative -mt-16 flex justify-center">
          <label className="relative cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 shadow-lg flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-gray-500" />
              )}
            </div>
            <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md">
              <Camera size={18} className="text-blue-500" />
            </div>
          </label>
        </div>

  
        <div className="px-8 pb-8 mt-6">
          <h3 className="bg-gray-200 text-gray-600 text-sm font-semibold py-2 px-3 rounded-lg">
            INFORMACIÓN BÁSICA
          </h3>

          <div className="mt-4 space-y-3">
            {[
              { label: "Nombre", value: userData.nombre },
              { label: "Género", value: userData.genero },
              { label: "Correo electrónico", value: userData.email },
              { label: "Cargo", value: userData.cargo},
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-500">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 font-medium">{item.value}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/configuracion")}
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            >
              Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;