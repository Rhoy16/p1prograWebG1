import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { movimientosIniciales } from "../mocks/datosFinancieros"; // Importamos el Mock

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // 1. Guardamos los datos en el ESTADO de React para poder modificarlos después
  const [movimientos, setMovimientos] = useState(movimientosIniciales);
  const [nuevoMonto, setNuevoMonto] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("Comida");
  const [nuevoTipo, setNuevoTipo] = useState("gasto");
  const registrarTransaccion = (e) => {
    e.preventDefault(); 

    if (!nuevoMonto || isNaN(nuevoMonto)) return; 

    const nuevoMovimiento = {
      id: Date.now(), 
      fecha: new Date().toLocaleDateString('es-PE'), 
      categoria: nuevaCategoria,
      monto: parseFloat(nuevoMonto),
      tipo: nuevoTipo
    };

    
    setMovimientos([nuevoMovimiento, ...movimientos]); 

    
    setNuevoMonto("");
  };
  // 2. MATEMÁTICAS AUTOMÁTICAS (Calculamos los totales dinámicamente)
  const ingresosTotales = movimientos
    .filter(mov => mov.tipo === "ingreso")
    .reduce((suma, mov) => suma + mov.monto, 0);

  const gastosTotales = movimientos
    .filter(mov => mov.tipo === "gasto")
    .reduce((suma, mov) => suma + mov.monto, 0);

  const balanceTotal = ingresosTotales - gastosTotales;

  // 3. PREPARAMOS EL GRÁFICO AUTOMÁTICAMENTE
  // Filtramos solo los gastos para el gráfico de torta
  const soloGastos = movimientos.filter(mov => mov.tipo === "gasto");
  
  // Agrupamos los gastos por categoría dinámicamente
  const gastosPorCategoria = {
    Comida: soloGastos.filter(m => m.categoria === "Comida").reduce((s, m) => s + m.monto, 0),
    Transporte: soloGastos.filter(m => m.categoria === "Transporte").reduce((s, m) => s + m.monto, 0),
    Estudios: soloGastos.filter(m => m.categoria === "Estudios").reduce((s, m) => s + m.monto, 0),
    Servicios: soloGastos.filter(m => m.categoria === "Servicios").reduce((s, m) => s + m.monto, 0),
  };

  const dataGrafico = {
    labels: Object.keys(gastosPorCategoria),
    datasets: [
      {
        label: "Gastos (S/.)",
        data: Object.values(gastosPorCategoria), // Los datos ya no son fijos, vienen de la matemática
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Encabezado */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-900">Resumen Financiero</h1>
        <p className="text-gray-500 mt-2">Bienvenido a tu panel de control familiar.</p>
      </header>
      {/* Formulario de Registro Rápido (RF-06) */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <form onSubmit={registrarTransaccion} className="flex flex-col md:flex-row gap-4 items-end">
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select 
              value={nuevoTipo}
              onChange={(e) => setNuevoTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="gasto">Gasto (-)</option>
              <option value="ingreso">Ingreso (+)</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select 
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Comida">Comida</option>
              <option value="Transporte">Transporte</option>
              <option value="Estudios">Estudios</option>
              <option value="Servicios">Servicios</option>
              <option value="Sueldo">Sueldo / Honorarios</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto (S/.)</label>
            <input 
              type="number" 
              step="0.01"
              value={nuevoMonto}
              onChange={(e) => setNuevoMonto(e.target.value)}
              placeholder="Ej. 50.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition h-[42px]"
          >
            Agregar
          </button>
        </form>
      </section>
      {/* Cards Dinámicas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">Ingresos del Mes</h2>
          {/* Imprimimos la variable calculada */}
          <p className="text-3xl font-bold text-green-600 mt-2">S/. {ingresosTotales.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">Gastos del Mes</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">S/. {gastosTotales.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">Balance Total</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">S/. {balanceTotal.toFixed(2)}</p>
        </div>
      </section>

      {/* GRAFICO + TABLA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GRAFICO DINÁMICO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Gastos por Categoría</h2>
          <div className="w-72 mx-auto">
            <Pie data={dataGrafico} />
          </div>
        </div>

        {/* MOVIMIENTOS DINÁMICOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Movimientos Recientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-gray-500">Fecha</th>
                  <th className="py-3 text-gray-500">Categoría</th>
                  <th className="py-3 text-gray-500">Monto</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((movimiento) => (
                  <tr key={movimiento.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">{movimiento.fecha}</td>
                    <td className="py-3">{movimiento.categoria}</td>
                    {/* Cambiamos el color dependiendo si es ingreso o gasto */}
                    <td className={`py-3 font-semibold ${movimiento.tipo === 'ingreso' ? 'text-green-500' : 'text-red-500'}`}>
                      {movimiento.tipo === 'ingreso' ? '+' : '-'} S/. {movimiento.monto.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Dashboard;