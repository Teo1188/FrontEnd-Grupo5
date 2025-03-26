import React, { useState, useEffect } from 'react';
import { 
  User, Clock, Calendar, FileText, Settings, Edit, Camera, Save, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: 'María Rodríguez',
    department: 'Recursos Humanos',
    email: 'maria.rodriguez@amadeus.com',
    totalHorasExtra: 45,
    horasAprobadas: 30,
    horasPendientes: 15,
    profileImage: null
  });
  
  const [editedUser, setEditedUser] = useState({ ...user });
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

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
    localStorage.setItem('userProfile', JSON.stringify(editedUser));
    setUser(editedUser);
    setActiveSection('overview');
  };

  return (
    <div className={`min-h-screen p-6 flex justify-center items-center bg-gradient-to-r ${darkMode ? 'from-gray-900 to-black' : 'from-blue-600 to-blue-800'}`}>      
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 relative transform transition-all duration-500 hover:scale-105">
        {activeSection === 'overview' ? (
          <>
            <div className="flex items-center mb-6">
              <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mr-4 border-4 border-blue-500">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-blue-500" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.department}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-blue-100 p-4 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-700">Total</h3>
                <p className="text-xl font-bold text-blue-700">{user.totalHorasExtra}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl shadow-lg">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-700">Aprobadas</h3>
                <p className="text-xl font-bold text-green-700">{user.horasAprobadas}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-700">Pendientes</h3>
                <p className="text-xl font-bold text-yellow-700">{user.horasPendientes}</p>
              </div>
            </div>

            <button onClick={() => setActiveSection('edit')} className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
              <Edit className="mr-2" /> Editar Perfil
            </button>
            <button onClick={() => navigate('/settings')} className="block mt-4 w-full text-center text-blue-600 hover:underline">
              <Settings className="inline w-5 h-5 mr-2" />Configuración
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center mb-6">
              <ArrowLeft className="mr-4 cursor-pointer" onClick={() => setActiveSection('overview')} />
              <h2 className="text-2xl font-bold">Editar Perfil</h2>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                {editedUser.profileImage ? (
                  <img src={editedUser.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-blue-500" />
                )}
                <label htmlFor="profileUpload" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
                  <Camera className="w-5 h-5" />
                  <input type="file" id="profileUpload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <input type="text" name="name" value={editedUser.name} onChange={(e) => setEditedUser({...editedUser, name: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Nombre Completo" />
              <input type="text" name="department" value={editedUser.department} onChange={(e) => setEditedUser({...editedUser, department: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Departamento" />
              <input type="email" name="email" value={editedUser.email} onChange={(e) => setEditedUser({...editedUser, email: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Correo Electrónico" />
              <button onClick={handleSave} className="w-full bg-green-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                <Save className="mr-2" /> Guardar Cambios
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;