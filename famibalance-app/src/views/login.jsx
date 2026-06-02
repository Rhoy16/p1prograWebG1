import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // por ahora solo redirige, despues va la validación
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-900">FamiBalance</h1>
          <p className="text-sm text-gray-500 mt-2">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="juan@familia.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Ingresar
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-bold">
              Regístrate aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;