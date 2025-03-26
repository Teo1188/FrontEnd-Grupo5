import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Clock, LogIn, Users } from 'lucide-react'; // Importamos el icono Users

const schema = yup.object({
  email: yup.string().email("Debe ser un email válido").required("El email es requerido."),
  password: yup.string().required("La contraseña es requerida."),
}).required();

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="w-full max-w-4xl flex rounded-xl overflow-hidden shadow-2xl">
        
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 flex flex-col justify-center items-center">
          <div className="mb-6">
            <div className="bg-white text-blue-800 px-4 py-2 rounded-md inline-block mb-4 font-bold text-lg">
              AMADEUS
            </div>
          </div>
          
          {/* Icono de Usuarios en Blanco */}
          <div className="flex items-center justify-center mb-4">
            <Users size={150} strokeWidth={2} className="text-white" />
          </div>
        </div>

        {/* Sección Derecha */}
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">Acceso al sistema</h3>
          <p className="mb-6 text-gray-600">Ingresa tus credenciales para continuar</p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input 
                type="email" 
                {...register("email")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none 
                  ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input 
                type="password" 
                {...register("password")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none 
                  ${errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span>Recordarme</span>
              </div>
              <Link 
                to="/password-recovery" 
                className="text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
