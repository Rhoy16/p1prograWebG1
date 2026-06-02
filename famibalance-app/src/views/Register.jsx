import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // Estados para capturar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');

  const manejarRegistro = (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores previos

    // Validación 1: Que las contraseñas coincidan
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden. Inténtalo de nuevo.');
      return;
    }

    // Validación 2: Que la contraseña sea segura 
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // simulamos el registro
    alert(`¡Cuenta creada con éxito para ${nombre}! Por favor, inicia sesión.`);
    
    // Redirigimos al usuario a la pantalla de Login
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-900">FamiBalance</h1>
          <p className="text-sm text-gray-500 mt-2">Crea tu cuenta para empezar</p>
        </div>

        {/* Mensaje de error condicional */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={manejarRegistro}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="juan@familia.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input 
              type="password" 
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-bold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;