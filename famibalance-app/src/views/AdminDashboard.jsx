import { Pie, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const expensesByMember = {
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

  const expensesByCategory = {
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

  const members = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "Jefe de Familia",
      expenses: "S/. 1,200",
    },
    {
      id: 2,
      name: "María Pérez",
      role: "Administrador",
      expenses: "S/. 800",
    },
    {
      id: 3,
      name: "Pedro Pérez",
      role: "Miembro",
      expenses: "S/. 650",
    },
    {
      id: 4,
      name: "Ana Pérez",
      role: "Miembro",
      expenses: "S/. 400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Dashboard Familiar
          </h1>
          <p className="text-gray-500 mt-2">
            Vista exclusiva para el Jefe de Familia.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm"
        >
          ← Volver al Dashboard
        </Link>
      </header>

      {/* GENERAL SUMMARY */}
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

      {/* CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Miembro
          </h2>
          <Bar data={expensesByMember} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Categoría
          </h2>
          <div className="w-72 mx-auto">
            <Pie data={expensesByCategory} />
          </div>
        </div>
      </section>

      {/* MEMBERS TABLE */}
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
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">{member.name}</td>
                  <td className="py-3">{member.role}</td>
                  <td className="py-3">{member.expenses}</td>
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