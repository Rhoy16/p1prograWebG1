import { useState } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../components/GoalCard";

const Metas = () => {
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [goalText, setGoalText] = useState("");
  const [goalsList, setGoalsList] = useState([
    {
      name: "Vacaciones",
      target: 3000,
      saved: 1200
    },
    {
      name: "Laptop",
      target: 4000,
      saved: 500
    }
  ]);

  const handleGoalTextChange = (e) => {
    setGoalText(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">Gestión de Ahorros</h1>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          ← Volver al Dashboard
        </Link>
      </nav>

      <section className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Cree una meta de ahorro: </h2>
        <form className="space-y-3">
          <input
            type="text" 
            placeholder="Ej. Vacaciones 2026" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
            value={goalText}
            onChange={handleGoalTextChange}
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

          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition" 
            onClick={() => {
              setGoalsList([
                ...goalsList,
                {
                  name: goalText,
                  target: Number(targetAmount),
                  saved: Number(savedAmount)
                }
              ]);
              setGoalText("");
              setTargetAmount("");
              setSavedAmount("");
            }}
          >
            Crear Meta
          </button>
        </form>
        <ul>
          {goalsList.map((goal) => {
            return <GoalCard key={goal.name} goal={goal} />;
          })}
        </ul>
      </section>
    </main>
  );
};

export default Metas;