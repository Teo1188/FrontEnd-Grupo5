import React, { useState } from 'react';
import { 
  User, Clock, Calendar, FileText, Edit, Save, MapPin, Briefcase, Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OvertimeRegistrationProfile = () => {
  const [user, setUser] = useState({
    name: 'María Rodríguez',
    department: 'Recursos Humanos',
    email: 'maria.rodriguez@amadeus.com',  
    personalDescription: 'Profesional dedicada y comprometida con un fuerte sentido de responsabilidad y trabajo en equipo.',
    totalHorasExtra: 45,
    horasAprobadas: 30,
    horasPendientes: 15,
    profileImage: null
  });

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(editedUser);
    setEditMode(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6">
        {/* Columna izquierda - Perfil */}
        <div className="bg-white shadow-2xl rounded-xl p-6 md:col-span-1 border-t-4 border-blue-500 flex flex-col">
          <div className="flex flex-col items-center flex-grow">
            {/* Contenedor azul que envuelve foto, nombre, cargo y correo */}
            <div className="bg-blue-500 rounded-xl p-6 mb-4 w-full">
              <div className="relative mb-4 flex flex-col items-center">
                {/* Círculo de la foto con borde blanco de 3px */}
                <div className="w-32 h-32 rounded-full border-[3px] border-white overflow-hidden shadow-lg mb-4 bg-white">
                  {editedUser.profileImage ? (
                    <img 
                      src={editedUser.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full text-gray-400" />
                  )}
                </div>
                
                {editMode && (
                  <label className="absolute top-0 right-0 bg-white text-blue-500 p-2 rounded-full cursor-pointer shadow-md">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                    <Edit className="w-4 h-4" />
                  </label>
                )}

                <h2 className="text-xl font-bold text-white mb-3">{user.name}</h2>
                
                {/* Cargo y correo dentro del cuadro azul */}
                <div className="w-full text-white space-y-2">
                  <div className="flex items-center justify-center">
                    <Briefcase className="mr-2 w-4 h-4" />
                    <span>{user.department}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="mr-2 w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {!editMode ? (
              <>
                <p className="text-gray-600 text-center italic px-2 mb-4">"{user.personalDescription}"</p>
                
                <button 
                  onClick={() => setEditMode(!editMode)}
                  className="w-full mt-auto text-white bg-blue-500 hover:bg-blue-600 p-3 rounded flex items-center justify-center"
                >
                  <Edit className="mr-2 w-4 h-4" />
                  {editMode ? 'Cancelar' : 'Editar Perfil'}
                </button>
              </>
            ) : (
              <div className="w-full space-y-3 flex flex-col flex-grow">
                <input 
                  type="text" 
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Nombre Completo"
                />
                <textarea 
                  value={editedUser.personalDescription}
                  onChange={(e) => setEditedUser({...editedUser, personalDescription: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Descripción Personal"
                  rows="4"
                />
                <input 
                  type="text" 
                  value={editedUser.department}
                  onChange={(e) => setEditedUser({...editedUser, department: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Departamento"
                />
                <input 
                  type="email" 
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Correo Electrónico"
                />
                
                <button 
                  onClick={handleSave}
                  className="w-full mt-auto bg-green-500 text-white p-3 rounded flex items-center justify-center hover:bg-green-600"
                >
                  <Save className="mr-2" /> Guardar Cambios
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha - Registro de Horas Extra */}
        <div className="bg-white shadow-2xl rounded-xl p-6 md:col-span-2 border-t-4 border-green-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Registro de Horas Extra</h2>
            {/* Botón de configuración que navega a /settings */}
            <button 
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
              aria-label="Configuración"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {!editMode && (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform">
                  <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Total Horas Extra</h3>
                  <p className="text-2xl font-bold text-blue-800">{user.totalHorasExtra}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform">
                  <Calendar className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Horas Aprobadas</h3>
                  <p className="text-2xl font-bold text-green-800">{user.horasAprobadas}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform">
                  <FileText className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Horas Pendientes</h3>
                  <p className="text-2xl font-bold text-yellow-800">{user.horasPendientes}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalles de Horas Extra</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                      <tr>
                        <th className="p-3 text-left">Fecha</th>
                        <th className="p-3 text-left">Horas</th>
                        <th className="p-3 text-left">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="p-3">15/03/2024</td>
                        <td className="p-3">3.5</td>
                        <td className="p-3">
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                            Aprobado
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-blue-50 transition">
                        <td className="p-3">22/03/2024</td>
                        <td className="p-3">2</td>
                        <td className="p-3">
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm">
                            Pendiente
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OvertimeRegistrationProfile;