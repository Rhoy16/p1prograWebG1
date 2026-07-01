import { useState } from "react";
import { Link } from "react-router-dom";

const Presupuestos = () => {
  const [budgets, setBudgets] = useState({
    Comida: 500,
    Transporte: 200,
    Estudios: 300,
    Servicios: 150,
  });

  const expenses = {
    Comida: 250,
    Transporte: 80,
    Estudios: 120,
    Servicios: 50,
  };

  const handleUpdateBudget = (category, value) => {
    setBudgets({
      ...budgets,
      [category]: Number(value),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">
          Presupuestos por Categoría
        </h1>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Volver al Dashboard
        </Link>
      </div>

      {Object.keys(budgets).map((category) => {
        const budget = budgets[category];
        const expense = expenses[category];
        const percentage = budget > 0 ? Math.min((expense / budget) * 100, 100) : 0;

        return (
          <div
            key={category}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6"
          >
            <div className="flex justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-800">
                {category}
              </h2>
              <span className="font-semibold text-gray-600">
                S/. {expense} / S/. {budget}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
              <div
                className={`h-5 transition-all duration-500 ${
                  percentage >= 100
                    ? "bg-red-500"
                    : percentage >= 80
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {percentage.toFixed(0)}% utilizado
            </p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo presupuesto
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => handleUpdateBudget(category, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Presupuestos;