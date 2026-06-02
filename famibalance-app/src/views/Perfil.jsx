import { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  // simulamos los datos del usuario que ya inicio sesion
  const [nombre, setNombre] = useState('Juan Pérez');
  const [correo, setCorreo] = useState('juan@familia.com');
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const guardarCambios = (e) => {
    e.preventDefault();
    setEditando(false);
    setMensaje('Perfil actualizado correctamente');
    
    // limpiamos el mensaje despues de 3 segundos
    setTimeout(() => setMensaje(''), 3000);
  };

  const manejarCambioFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMensaje('Foto de perfil actualizada');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">Mi Perfil</h1>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          ← Volver al Dashboard
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        
        {mensaje && (
          <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg mb-6 text-sm text-center">
            {mensaje}
          </div>
        )}

        {/* seccion de la foto de perfil */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-3xl font-bold mb-4">
            {nombre.charAt(0)}
          </div>
          
          <label className="cursor-pointer text-sm text-indigo-600 font-semibold hover:text-indigo-800">
            Cambiar foto
            <input type="file" className="hidden" accept="image/*" onChange={manejarCambioFoto} />
          </label>
        </div>

        <form onSubmit={guardarCambios}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={!editando}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={!editando}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <div className="flex gap-4">
            {!editando ? (
              <button 
                type="button" 
                onClick={() => setEditando(true)}
                className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition"
              >
                Editar Datos
              </button>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={() => setEditando(false)}
                  className="w-1/2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Guardar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;