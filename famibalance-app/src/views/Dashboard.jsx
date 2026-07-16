import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { PageLayout, Card, StatCard } from "../components/ui";
import { api } from "../services/api";
import {
  getTransactions,
  createTransaction,
  scanReceipt,
} from "../services/transactions.service";

const COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#06b6d4", "#84cc16", "#f97316", "#ec4899", "#14b8a6",
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newType, setNewType] = useState("gasto");
  const [isProcessing, setIsProcessing] = useState(false);
  const [budget, setBudget] = useState(1000);
  const [iaMessage, setIaMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [txs, catsResp] = await Promise.all([
          getTransactions(),
          api.get("/categories"),
        ]);
        setTransactions(txs);
        setCategories(catsResp.data || []);
        if (catsResp.data && catsResp.data.length > 0) {
          setNewCategoryId(catsResp.data[0].id);
        }
      } catch (err) {
        setLoadError(err.message || "No se pudieron cargar los datos del servidor");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleRegisterTransaction = async (e) => {
    e.preventDefault();
    if (!newAmount || isNaN(newAmount)) return;
    if (!newCategoryId) {
      setLoadError("Primero crea una categoría en la sección Categorías.");
      return;
    }

    setIsProcessing(true);
    setAlertMessage("");
    try {
      const { transaction, alertTrigger, mensaje } = await createTransaction({
        name: newName.trim() || "Movimiento",
        amount: parseFloat(newAmount),
        type: newType,
        categoryId: newCategoryId,
        paymentMethod: "CASH",
      });

      setTransactions([transaction, ...transactions]);
      setNewAmount("");
      setNewName("");

      if (alertTrigger) {
        setAlertMessage(mensaje || "Alerta de presupuesto");
      }
    } catch (err) {
      setLoadError(err.message || "No se pudo registrar la transacción");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePDFRead = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    setIsProcessing(true);
    try {
      const extracted = await scanReceipt(file);
      setNewType("gasto");
      setNewName(extracted.description || "Recibo escaneado");
      setNewAmount(extracted.amount ? String(extracted.amount) : "");
      setIaMessage("IA: Recibo analizado con éxito. Por favor, revisa y confirma los datos.");
      setTimeout(() => setIaMessage(""), 3000);
    } catch (err) {
      setLoadError(err.message || "No se pudo procesar el recibo");
    } finally {
      setIsProcessing(false);
      e.target.value = null;
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "ingreso")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "gasto")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;
  const budgetPercentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const onlyExpenses = transactions.filter((t) => t.type === "gasto");
  const expensesByCategory = onlyExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: "Gastos (S/.)",
        data: Object.values(expensesByCategory),
        backgroundColor: COLORS.slice(0, Object.keys(expensesByCategory).length),
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <PageLayout className="!p-6">
        <p className="text-gray-700">Cargando datos...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="!p-6">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">Resumen Financiero</h1>
          <p className="text-gray-700 mt-2">Bienvenido a tu panel de control familiar.</p>
        </div>
        <nav className="flex gap-4">
          <Link to="/admin" className="hidden md:block bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm">
            Dashboard Familiar
          </Link>
          <Link to="/perfil" className="hidden md:block bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm">
            Mi Perfil
          </Link>
          <Link to="/metas" className="hidden md:block bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm">
            Metas de Ahorro
          </Link>
          <Link to="/familia" className="hidden md:block bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm">
            Gestionar Familia
          </Link>
        </nav>
      </header>

      <nav className="flex gap-4 mb-6">
        <Link to="/presupuestos" className="bg-indigo-600 text-white px-4 py-2 rounded">Presupuestos</Link>
        <Link to="/categorias" className="bg-green-600 text-white px-4 py-2 rounded">Categorías</Link>
        <Link to="/historial" className="bg-slate-700 text-white px-4 py-2 rounded">Historial</Link>
        <Link to="/prestamos" className="bg-blue-700 text-white px-4 py-2 rounded">Prestamos</Link>
      </nav>

      <Card className="mb-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">Presupuesto Mensual</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-60"
          />
          <div className="font-semibold">Presupuesto Actual: S/. {budget.toFixed(2)}</div>
        </div>
      </Card>

      {loadError && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-xl mb-6" role="alert">
          {loadError}
        </div>
      )}

      {iaMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl mb-6 text-sm" role="alert" aria-live="assertive">
          {iaMessage}
        </div>
      )}

      {alertMessage && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-xl mb-6" role="alert" aria-live="assertive">
          ⚠ {alertMessage}
        </div>
      )}

      {budgetPercentage >= 100 && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-xl mb-6" role="alert" aria-live="assertive">
          🚨 Has excedido el presupuesto mensual.
        </div>
      )}

      <Card className="mb-8">
        <form onSubmit={handleRegisterTransaction} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full border-r pr-4 border-gray-200">
            <label className="block text-sm font-bold text-indigo-700 mb-1 flex items-center gap-2">
              ✨ Auto-Llenado IA (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePDFRead}
              disabled={isProcessing}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer disabled:opacity-50"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="gasto">Gasto (-)</option>
              <option value="ingreso">Ingreso (+)</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ej. Recibo de luz"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              {categories.length === 0 && <option value="">Sin categorías</option>}
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto (S/.)</label>
            <input
              type="number"
              step="0.01"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Ej. 50.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full md:w-auto text-white font-bold py-2 px-6 rounded-lg transition h-[42px] ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isProcessing ? 'Procesando...' : 'Agregar'}
          </button>
        </form>
      </Card>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Ingresos del Mes" value={`S/. ${totalIncome.toFixed(2)}`} valueColor="text-green-600" />
        <StatCard title="Gastos del Mes" value={`S/. ${totalExpenses.toFixed(2)}`} valueColor="text-red-600" />
        <StatCard title="Balance Total" value={`S/. ${totalBalance.toFixed(2)}`} valueColor="text-blue-600" />
        <StatCard title="Presupuesto Usado" value={`${budgetPercentage.toFixed(0)}%`} valueColor="text-orange-500" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card as="section">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Gastos por Categoría</h2>
          <div className="w-72 mx-auto">
            <Pie data={chartData} />
          </div>
        </Card>

        <Card as="section">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Movimientos Recientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="py-3 text-gray-700">Fecha</th>
                  <th scope="col" className="py-3 text-gray-700">Nombre</th>
                  <th scope="col" className="py-3 text-gray-700">Categoría</th>
                  <th scope="col" className="py-3 text-gray-700">Monto</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.name || transaction.category}</td>
                    <td className="py-3">{transaction.category}</td>
                    <td className={`py-3 font-semibold ${transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'ingreso' ? '+' : '-'} S/. {transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </PageLayout>
  );
};

export default Dashboard;