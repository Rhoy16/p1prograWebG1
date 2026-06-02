import { useState } from "react";
import { Link } from "react-router-dom";

const Presupuestos = () => {

  const [presupuestos, setPresupuestos] = useState({
    Comida: 500,
    Transporte: 200,
    Estudios: 300,
    Servicios: 150,
  });

  const gastos = {
    Comida: 250,
    Transporte: 80,
    Estudios: 120,
    Servicios: 50,
  };

  const actualizarPresupuesto = (categoria, valor) => {
    setPresupuestos({
      ...presupuestos,
      [categoria]: Number(valor),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Encabezado */}
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

      {Object.keys(presupuestos).map((categoria) => {

        const presupuesto = presupuestos[categoria];
        const gasto = gastos[categoria];

        const porcentaje =
          presupuesto > 0
            ? Math.min((gasto / presupuesto) * 100, 100)
            : 0;

        return (
          <div
            key={categoria}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6"
          >

            <div className="flex justify-between mb-2">

              <h2 className="text-xl font-bold text-gray-800">
                {categoria}
              </h2>
              <span className="font-semibold text-gray-600">
                S/. {gasto} / S/. {presupuesto}
              </span>

            </div>

            {/* Barra */}
            <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

              <div
                className={`h-5 transition-all duration-500 ${
                  porcentaje >= 100
                    ? "bg-red-500"
                    : porcentaje >= 80
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${porcentaje}%`,
                }}
              ></div>

            </div>

            <p className="mt-2 text-sm text-gray-500">
              {porcentaje.toFixed(0)}% utilizado
            </p>

            {/* Actualizar presupuesto */}
            <div className="mt-4">

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo presupuesto
              </label>
              <input
                type="number"
                defaultValue={presupuesto}
                onChange={(e) =>
                  actualizarPresupuesto(
                    categoria,
                    e.target.value
                  )
                }
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