import { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    alert('Instrucciones de recuperación enviadas');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <div className="bg-blue-800 text-white px-4 py-2 rounded-md inline-block mb-4">AMADEUS</div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Recuperación de Contraseña</h2>
          <p className="text-gray-600">
            Ingresa tu correo electrónico. Te enviaremos instrucciones para restablecer tu contraseña.
          </p>
        </div>
        
        <form onSubmit={handlePasswordRecovery}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="correo@ejemplo.com"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition duration-300 mb-4"
          >
            Enviar Instrucciones
          </button>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-blue-600 hover:underline"
            >
              Volver al Inicio de Sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;