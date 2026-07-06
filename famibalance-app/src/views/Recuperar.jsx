import { useState } from 'react';
import { Link } from 'react-router-dom';

const Recuperar = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecovery = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay and sending recovery email with token (RF-03)
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <section className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-900">FamiBalance</h1>
          <p className="text-sm text-gray-700 mt-2">Recupera el acceso a tu cuenta</p>
        </div>

        {isSent ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg mb-6 text-sm" role="alert" aria-live="assertive">
              ¡Listo! Hemos enviado un enlace con un <b>token temporal</b> a <b>{email}</b> para que puedas restablecer tu contraseña. Revisa tu bandeja de entrada.
            </div>
            <Link to="/" className="w-full inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRecovery}>
            <p className="text-sm text-gray-600 mb-6">
              Ingresa el correo electrónico asociado a tu cuenta y te enviaremos instrucciones.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="juan@familia.com"
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold py-2 px-4 rounded-lg transition ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isLoading ? 'Enviando correo...' : 'Enviar enlace de recuperación'}
            </button>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800 font-bold">
                ← Cancelar y volver
              </Link>
            </div>
          </form>
        )}

      </section>
    </main>
  );
};

export default Recuperar;