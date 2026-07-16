import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { getFamilyMembers, getFamilyAnalytics } from "../services/family.service";
import { getTransactions } from "../services/transactions.service";

const COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#84cc16", "#f97316",
];

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [membersData, analyticsData, txData] = await Promise.all([
          getFamilyMembers(),
          getFamilyAnalytics(),
          getTransactions({ scope: "family" }),
        ]);
        setMembers(membersData);
        setAnalytics(analyticsData);
        setTransactions(txData);
      } catch (err) {
        setError(err.message || "Error al cargar el dashboard familiar");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Compute totals from real transactions
  const totalIncome = transactions
    .filter((t) => t.type === "ingreso")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "gasto")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Build member name lookup from members list
  const memberNameMap = {};
  members.forEach((m) => { memberNameMap[m.id] = m.nombre; });

  // Map analytics (grouped by userId) to chart data
  const memberLabels = analytics.map((a) => memberNameMap[a.userId] || a.userId);
  const memberAmounts = analytics.map((a) => a._sum?.amount || 0);

  const expensesByMember = {
    labels: memberLabels,
    datasets: [
      {
        label: "Gastos",
        data: memberAmounts,
        backgroundColor: COLORS.slice(0, memberLabels.length),
      },
    ],
  };

  // Expenses by category from transactions
  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "gasto")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const expensesByCategory = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: COLORS.slice(0, Object.keys(categoryTotals).length),
      },
    ],
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-700">Cargando dashboard familiar...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Dashboard Familiar
          </h1>
          <p className="text-gray-700 mt-2">
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

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}

      {/* GENERAL SUMMARY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-sm font-bold text-gray-700 uppercase">
            Ingresos Familiares
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            S/. {totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-sm font-bold text-gray-700 uppercase">
            Gastos Familiares
          </h2>
          <p className="text-3xl font-bold text-red-600 mt-2">
            S/. {totalExpenses.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-sm font-bold text-gray-700 uppercase">
            Balance Familiar
          </h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            S/. {totalBalance.toFixed(2)}
          </p>
        </div>
      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Miembro
          </h2>
          {memberLabels.length > 0 ? (
            <Bar data={expensesByMember} />
          ) : (
            <p className="text-gray-500 text-sm">No hay datos de miembros aún.</p>
          )}
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">
            Gastos por Categoría
          </h2>
          <div className="w-72 mx-auto">
            {Object.keys(categoryTotals).length > 0 ? (
              <Pie data={expensesByCategory} />
            ) : (
              <p className="text-gray-500 text-sm text-center">No hay gastos registrados.</p>
            )}
          </div>
        </section>
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
                <th scope="col" className="py-3">Miembro</th>
                <th scope="col" className="py-3">Rol</th>
                <th scope="col" className="py-3">Correo</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">{member.nombre}</td>
                  <td className="py-3">{member.rol}</td>
                  <td className="py-3">{member.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;