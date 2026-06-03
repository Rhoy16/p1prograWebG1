import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboard = () => {
  const gastosPorMiembro = {
    labels: ["Juan", "María", "Pedro", "Ana"],
    datasets: [
      {
        label: "Gastos",
        data: [1200, 800, 650, 400],
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  const gastosPorCategoria = {
    labels: ["Comida", "Transporte", "Servicios", "Educación"],
    datasets: [
      {
        data: [2500, 1500, 1800, 2200],
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  const miembros = [
    {
      nombre: "Juan Pérez",
      rol: "Jefe de Familia",
      gastos: "S/. 1,200",
    },
    {
      nombre: "María Pérez",
      rol: "Administrador",
      gastos: "S/. 800",
    },
    {
      nombre: "Pedro Pérez",
      rol: "Miembro",
      gastos: "S/. 650",
    },
    {
      nombre: "Ana Pérez",
      rol: "Miembro",
      gastos: "S/. 400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-900">
          Dashboard Familiar
        </h1>

        <p className="text-gray-500 mt-2">
          Vista exclusiva para el Jefe de Familia.
        </p>
      </header>

      {/* RESUMEN GENERAL */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Ingresos Familiares
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            S/. 15,000
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Gastos Familiares
          </h2>

          <p className="text-3xl font-bold text-red-600 mt-2">
            S/. 8,000
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-sm font-bold text-gray-500 uppercase">
            Balance Familiar
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            S/. 7,000
          </p>
        </div>

      </section>

      {/* GRAFICOS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Miembro
          </h2>

          <Bar data={gastosPorMiembro} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Categoría
          </h2>

          <div className="w-72 mx-auto">
            <Pie data={gastosPorCategoria} />
          </div>
        </div>

      </section>

      {/* TABLA DE MIEMBROS */}
      <section className="bg-white p-6 rounded-xl shadow-sm border">

        <h2 className="text-xl font-bold text-indigo-900 mb-4">
          Resumen de Miembros
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th className="py-3">Miembro</th>
                <th className="py-3">Rol</th>
                <th className="py-3">Gastos</th>
              </tr>
            </thead>

            <tbody>

              {miembros.map((miembro, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">{miembro.nombre}</td>

                  <td className="py-3">{miembro.rol}</td>

                  <td className="py-3">{miembro.gastos}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};

export default AdminDashboard;