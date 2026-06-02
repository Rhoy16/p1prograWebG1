import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* barra de navegacion publica */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-xl font-extrabold text-indigo-900">FamiBalance</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-semibold py-2 px-4 transition">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition shadow-sm">
            Comenzar Gratis
          </Link>
        </div>
      </nav>

      {/* seccion principal */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight max-w-4xl">
          Toma el control de las <span className="text-indigo-600">finanzas familiares</span> de forma inteligente
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl">
          Gestiona presupuestos, registra gastos con inteligencia artificial y alcanza tus metas de ahorro junto a los que más quieres. Todo en un solo lugar.
        </p>
        <div className="flex gap-4">
          <Link to="/register" className="bg-indigo-600 text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Crea tu cuenta familiar
          </Link>
        </div>
      </main>

      {/* seccion de caracteristicas */}
      <section className="bg-white py-20 px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">¿Por qué elegir FamiBalance?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Lectura Inteligente</h3>
              <p className="text-gray-600">Sube tus recibos en PDF y nuestra Inteligencia Artificial extraerá los montos y categorías automáticamente.</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Gestión Colaborativa</h3>
              <p className="text-gray-600">Invita a los miembros de tu familia, asigna roles y visualiza los gastos de todos en un solo panel consolidado.</p>
            </div>
            
            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">Metas de Ahorro</h3>
              <p className="text-gray-600">Establezcan metas conjuntas para el próximo viaje o proyecto familiar y reciban alertas sobre su progreso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* pie de pagina (footer) */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© 2026 FamiBalance. Proyecto de Programación Web - Grupo 1.</p>
        <p className="text-sm mt-2">Desarrollado con React y TailwindCSS</p>
      </footer>
    </div>
  );
};

export default Landing;