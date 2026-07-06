const GoalCard = ({ goal }) => {
  const percentage = (goal.saved / goal.target) * 100;

  return (
    <li className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-3 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-indigo-900 mb-2">
        {goal.name}
      </h3>

      <p className="text-gray-600">
        Objetivo: <span className="font-semibold">S/ {goal.target}</span>
      </p>

      <p className="text-gray-600">
        Ahorrado: <span className="font-semibold">S/ {goal.saved}</span>
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-700 mt-1">
        {percentage.toFixed(1)}% completado
      </p>
    </li>
  );
};

export default GoalCard;
