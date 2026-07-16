import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBudgets, createBudget, updateBudget } from "../services/budgets.service";
import { getCategories } from "../services/categories.service";

const Presupuestos = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // Form state for creating a new budget
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newMonth, setNewMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    async function load() {
      try {
        const [budgetsData, catsData] = await Promise.all([
          getBudgets(),
          getCategories(),
        ]);
        setBudgets(budgetsData);
        setCategories(catsData);
        if (catsData.length > 0) setNewCategoryId(catsData[0].id);
      } catch (err) {
        setError(err.message || "Error al cargar presupuestos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    if (!newCategoryId || !newLimit) return;
    setError("");
    try {
      const created = await createBudget({
        limitAmount: parseFloat(newLimit),
        month: newMonth,
        categoryId: newCategoryId,
      });
      setBudgets([...budgets, created]);
      setNewLimit("");
    } catch (err) {
      setError(err.message || "Error al crear presupuesto");
    }
  };

  const handleUpdateLimit = async (budget, newLimitValue) => {
    setError("");
    setAlertMsg("");
    try {
      const { budget: updated, alerta } = await updateBudget(budget.id, {
        limitAmount: parseFloat(newLimitValue),
        month: budget.month,
        categoryId: budget.categoryId,
      });
      setBudgets(budgets.map((b) => (b.id === updated.id ? updated : b)));
      if (alerta?.alertTrigger) {
        setAlertMsg(alerta.mensaje || "Alerta de presupuesto");
      }
    } catch (err) {
      setError(err.message || "Error al actualizar presupuesto");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-700">Cargando presupuestos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">
          Presupuestos por Categoría
        </h1>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Volver al Dashboard
        </Link>
      </nav>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}

      {alertMsg && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-xl mb-6" role="alert" aria-live="assertive">
          ⚠ {alertMsg}
        </div>
      )}

      {/* New budget form */}
      <form onSubmit={handleCreateBudget} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Crear nuevo presupuesto</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Límite (S/.)</label>
            <input
              type="number"
              step="0.01"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mes</label>
            <input
              type="month"
              value={newMonth}
              onChange={(e) => setNewMonth(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Crear
          </button>
        </div>
      </form>

      {/* Existing budgets */}
      {budgets.map((budget) => (
        <div
          key={budget.id}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">
              {budget.categoryName}
            </h2>
            <span className="font-semibold text-gray-600">
              Mes: {budget.month} — Límite: S/. {budget.limitAmount}
            </span>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actualizar límite
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                defaultValue={budget.limitAmount}
                onBlur={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val !== budget.limitAmount) {
                    handleUpdateLimit(budget, val);
                  }
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      ))}

      {budgets.length === 0 && (
        <p className="text-gray-500 text-sm">No hay presupuestos configurados. Crea uno arriba.</p>
      )}
    </main>
  );
};

export default Presupuestos;