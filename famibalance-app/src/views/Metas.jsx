import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../components/GoalCard";
import { getGoals, createGoal, deleteGoal } from "../services/goals.service";

const Metas = () => {
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [goalText, setGoalText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getGoals();
        setGoalsList(data);
      } catch (err) {
        setError(err.message || "Error al cargar metas");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreateGoal = async () => {
    if (!goalText.trim() || !targetAmount || !deadline) return;
    setError("");
    try {
      const newGoal = await createGoal({
        name: goalText.trim(),
        target: Number(targetAmount),
        saved: Number(savedAmount) || 0,
        deadline,
      });
      setGoalsList([...goalsList, newGoal]);
      setGoalText("");
      setTargetAmount("");
      setSavedAmount("");
      setDeadline("");
    } catch (err) {
      setError(err.message || "Error al crear meta");
    }
  };

  const handleDeleteGoal = async (id) => {
    setError("");
    try {
      await deleteGoal(id);
      setGoalsList(goalsList.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar meta");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-700">Cargando metas...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">Gestión de Ahorros</h1>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          ← Volver al Dashboard
        </Link>
      </nav>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}

      <section className="bg-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Cree una meta de ahorro: </h2>
        <form className="space-y-3">
          <input
            type="text" 
            placeholder="Ej. Vacaciones 2026" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
          />
          <input
            type="number"
            placeholder="Objetivo"
            className="w-full px-4 py-2 border rounded-lg" 
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />

          <input
            type="number"
            placeholder="Ahorrado"
            className="w-full px-4 py-2 border rounded-lg" 
            value={savedAmount}
            onChange={(e) => setSavedAmount(e.target.value)}
          />

          <input
            type="date"
            placeholder="Fecha límite"
            className="w-full px-4 py-2 border rounded-lg"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition" 
            onClick={handleCreateGoal}
          >
            Crear Meta
          </button>
        </form>
        <ul>
          {goalsList.map((goal) => {
            return (
              <div key={goal.id} className="relative">
                <GoalCard goal={goal} />
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  aria-label="Eliminar meta"
                >
                  Eliminar
                </button>
              </div>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Metas;