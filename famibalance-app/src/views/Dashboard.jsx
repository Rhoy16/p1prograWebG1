const Dashboard = () => {
  return (
    <div className="p-8">
      
      
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-900">Resumen Financiero</h1>
        <p className="text-gray-500 mt-2">Bienvenido a tu panel de control familiar.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-bold text-gray-500 uppercase">Ingresos del Mes</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">S/. 4,500.00</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-bold text-gray-500 uppercase">Gastos del Mes</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">S/. 2,150.00</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-sm font-bold text-gray-500 uppercase">Balance Total</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">S/. 2,350.00</p>
        </div>

      </section>


      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-64 flex items-center justify-center">
        <p className="text-gray-400 italic">Aquí insertaremos el gráfico de Chart.js pronto...</p>
      </section>

    </div>
  );
};

export default Dashboard;