import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    genero: "",
    email: "",
    ubicacion: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(formData));
    alert("Perfil actualizado con éxito");
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#D7D2CB] to-gray-300 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6">
        
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-16 flex items-center rounded-t-3xl px-6">
          <Link to="/" className="text-white">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-lg font-semibold text-white mx-auto">Editar perfil</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600">Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600">Cargo</label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
          >
            Guardar Cambios
          </button>
        </form>

      </div>
    </div>
  );
};

export default EditProfile;
