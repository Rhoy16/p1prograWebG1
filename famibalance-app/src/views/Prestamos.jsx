import { useState } from "react";
import { Link } from "react-router-dom";

const Prestamos = () => {
  const [deudor, setDeudor] = useState("");
  const [acreedor, setAcreedor] = useState("");
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [prestamos, setPrestamos] = useState([]);

  const agregarPrestamo = (e) => {
    e.preventDefault(); 

    if (!deudor || !acreedor || !monto) return;

    const nuevo = {
      id: Date.now(),
      deudor,
      acreedor,
      monto: Number(monto),
      concepto,
      fecha: new Date().toLocaleDateString(),
    };

    setPrestamos([...prestamos, nuevo]);

    // Limpiar inputs
    setDeudor("");
    setAcreedor("");
    setMonto("");
    setConcepto("");
  };

  const eliminarPrestamo = (id) => {
    setPrestamos(prestamos.filter((p) => p.id !== id));
  };

  const total = prestamos.reduce((acc, p) => acc + p.monto, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Historial de Préstamos
          </h1>
          <p className="text-gray-500 mt-2">
            Consulta, filtra y exporta los préstamos registrados.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Volver al Dashboard
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={agregarPrestamo} className="bg-white p-5 rounded-xl shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Registrar préstamo</h2>

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Deudor"
            value={deudor}
            onChange={(e) => setDeudor(e.target.value)}
            required 
          />

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Acreedor"
            value={acreedor}
            onChange={(e) => setAcreedor(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border p-2 rounded mb-3"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Concepto"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Agregar
          </button>
        </form>

        <div className="md:col-span-2 bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Total: {prestamos.length}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Suma: S/. {total.toFixed(2)} 
            </span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Deudor</th>
                <th className="p-2">Acreedor</th>
                <th className="p-2">Monto</th>
                <th className="p-2">Concepto</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.deudor}</td>
                  <td className="p-2">{p.acreedor}</td>
                  <td className="p-2">S/. {p.monto.toFixed(2)}</td>
                  <td className="p-2">{p.concepto || "-"}</td>
                  <td className="p-2">
                    <button
                      onClick={() => eliminarPrestamo(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}

              {prestamos.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No hay préstamos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prestamos;