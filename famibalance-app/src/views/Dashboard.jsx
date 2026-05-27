import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

  const data = {
    labels: ["Comida", "Transporte", "Estudios", "Servicios"],
    datasets: [
      {
        label: "Gastos",
        data: [800, 400, 500, 450],
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  const movimientos = [
    {
      fecha: "20/05/2026",
      categoria: "Comida",
      monto: "S/. 45.00",
    },
    {
      fecha: "19/05/2026",
      categoria: "Transporte",
      monto: "S/. 18.00",
    },
    {
      fecha: "18/05/2026",
      categoria: "Estudios",
      monto: "S/. 120.00",
    },
    {
      fecha: "17/05/2026",
      categoria: "Servicios",
      monto: "S/. 80.00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Encabezado */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-900">
          Resumen Financiero
        </h1>

        <p className="text-gray-500 mt-2">
          Bienvenido a tu panel de control familiar.
        </p>
      </header>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Ingresos del Mes
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            S/. 4,500.00
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Gastos del Mes
          </h2>

          <p className="text-3xl font-bold text-red-600 mt-2">
            S/. 2,150.00
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Balance Total
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            S/. 2,350.00
          </p>
        </div>

      </section>

      {/* GRAFICO + TABLA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* GRAFICO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">

          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Categoría
          </h2>

          <div className="w-72 mx-auto">
            <Pie data={data} />
          </div>

        </div>

        {/* MOVIMIENTOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">

          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Movimientos Recientes
          </h2>

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
                {movimientos.map((movimiento, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3">{movimiento.fecha}</td>

                    <td className="py-3">
                      {movimiento.categoria}
                    </td>

                    <td className="py-3 font-semibold text-red-500">
                      {movimiento.monto}
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