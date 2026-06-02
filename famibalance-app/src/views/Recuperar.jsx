import { useState } from 'react';
import { Link } from 'react-router-dom';

const Recuperar = () => {
  const [correo, setCorreo] = useState('');
  const [enviado, setEnviado] = useState(false); // controla si mostramos el mensaje de exito
  const [cargando, setCargando] = useState(false); // controla el estado del boton

  const manejarRecuperacion = (e) => {
    e.preventDefault();
    setCargando(true);

    // simulamos la demora de red y el envio del correo con token (RF-03)
    setTimeout(() => {
      setCargando(false);
      setEnviado(true); // cambiamos la pantalla al mensaje de exito
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-900">FamiBalance</h1>
          <p className="text-sm text-gray-500 mt-2">Recupera el acceso a tu cuenta</p>
        </div>

        {/* renderizado condicional: si ya se envio, mostramos el exito. si no, el formulario */}
        {enviado ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg mb-6 text-sm">
              ¡Listo! Hemos enviado un enlace con un <b>token temporal</b> a <b>{correo}</b> para que puedas restablecer tu contraseña. Revisa tu bandeja de entrada.
            </div>
            <Link to="/" className="w-full inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={manejarRecuperacion}>
            <p className="text-sm text-gray-600 mb-6">
              Ingresa el correo electrónico asociado a tu cuenta y te enviaremos instrucciones.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="juan@familia.com"
                required
                disabled={cargando}
              />
            </div>

            <button 
              type="submit" 
              disabled={cargando}
              className={`w-full text-white font-bold py-2 px-4 rounded-lg transition ${cargando ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {cargando ? 'Enviando correo...' : 'Enviar enlace de recuperación'}
            </button>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800 font-bold">
                ← Cancelar y volver
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Recuperar;