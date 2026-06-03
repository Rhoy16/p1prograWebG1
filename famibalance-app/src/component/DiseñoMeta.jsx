const DiseñoMeta = ({ meta }) => {
  const porcentaje = (meta.ahorrado / meta.objetivo) * 100;

  return (
    <li className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-3 hover:shadow-lg transition">

      
      <h3 className="text-lg font-bold text-indigo-900 mb-2">
        {meta.nombre}
      </h3>

      <p className="text-gray-600">
        Objetivo: <span className="font-semibold">S/ {meta.objetivo}</span>
      </p>

      {/* Ahorrado */}
      <p className="text-gray-600">
        Ahorrado: <span className="font-semibold">S/ {meta.ahorrado}</span>
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${porcentaje > 100 ? 100 : porcentaje}%` }}
        ></div>

      </div>
      <p className="text-xs text-gray-500 mt-1">
        {porcentaje.toFixed(1)}% completado
      </p>

    </li>
  );
};

export default DiseñoMeta;