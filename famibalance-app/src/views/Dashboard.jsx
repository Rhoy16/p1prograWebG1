import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { movimientosIniciales } from "../mocks/datosFinancieros"; // Importamos el Mock
import { Link } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [movimientos, setMovimientos] = useState(movimientosIniciales);

 
  const [nuevoMonto, setNuevoMonto] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("Comida");
  const [nuevoTipo, setNuevoTipo] = useState("gasto");
  
 
  const [isProcesando, setIsProcesando] = useState(false);

 
  const [presupuesto, setPresupuesto] = useState(1000);
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
  // Función para simular que esta leyendo un PDF
  const simularLecturaPDF = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    // Encendemos el estado de carga
    setIsProcesando(true);

    // Simulamos una demora de red/procesamiento de 2.5 segundos
    setTimeout(() => {
      // Autocompletamos los campos del formulario con los datos "leídos"
      setNuevoTipo("gasto");
      setNuevaCategoria("Servicios");
      setNuevoMonto("150.00"); // Simulamos que leyó un recibo de luz de S/ 150
      
      // Apagamos el estado de carga
      setIsProcesando(false);
      alert("IA: Recibo analizado con éxito. Por favor, revisa y confirma los datos.");
      
      // Reseteamos el input file visualmente
      e.target.value = null; 
    }, 2500);
  };
  // 2. MATEMÁTICAS AUTOMÁTICAS (Calculamos los totales dinámicamente)
  const ingresosTotales = movimientos
    .filter(mov => mov.tipo === "ingreso")
    .reduce((suma, mov) => suma + mov.monto, 0);

  const gastosTotales = movimientos
    .filter(mov => mov.tipo === "gasto")
    .reduce((suma, mov) => suma + mov.monto, 0);

  const balanceTotal = ingresosTotales - gastosTotales;
  const porcentajePresupuesto =
  presupuesto > 0
    ? (gastosTotales / presupuesto) * 100
    : 0;

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
      {/* Encabezado con Botón de Familia */}
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">Resumen Financiero</h1>
          <p className="text-gray-500 mt-2">Bienvenido a tu panel de control familiar.</p>
        </div>
        <div className="flex gap-4">
        <Link to = "/metas" className = "hidden md:block bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm">
        Metas de Ahorro
        </Link>
        <Link 
          to="/familia" 
          className="hidden md:block bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm"
        >
          Gestionar Familia
        </Link>
        </div>


      </header>
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">
          Presupuesto Mensual
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-60"
          />

          <div className="font-semibold">
            Presupuesto Actual: S/. {presupuesto.toFixed(2)}
          </div>
        </div>
      </section>
      {
      porcentajePresupuesto >= 80 &&
      porcentajePresupuesto < 100 && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-xl mb-6">
          ⚠ Atención: Has utilizado más del 80% de tu presupuesto mensual.
        </div>
        )
      }

      {
      porcentajePresupuesto >= 100 && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-xl mb-6">
          🚨 Has excedido el presupuesto mensual.
        </div>
        )
      }
      {/* Formulario de Registro Rápido (RF-06) */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <form onSubmit={registrarTransaccion} className="flex flex-col md:flex-row gap-4 items-end">
          
          {/* NUEVO BOTÓN: Carga de PDF */}
          <div className="flex-1 w-full border-r pr-4 border-gray-200">
            <label className="block text-sm font-bold text-indigo-700 mb-1 flex items-center gap-2">
              ✨ Auto-Llenado IA (PDF)
            </label>
            <input 
              type="file" 
              accept=".pdf"
              onChange={simularLecturaPDF}
              disabled={isProcesando}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer disabled:opacity-50"
            />
          </div>

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

          {/* Botón dinámico que cambia si está cargando */}
          <button 
            type="submit" 
            disabled={isProcesando}
            className={`w-full md:w-auto text-white font-bold py-2 px-6 rounded-lg transition h-[42px] ${isProcesando ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isProcesando ? 'Procesando...' : 'Agregar'}
          </button>
        </form>
      </section>
      {/* Cards Dinámicas */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Presupuesto Usado
          </h2>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            {porcentajePresupuesto.toFixed(0)}%
          </p>
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