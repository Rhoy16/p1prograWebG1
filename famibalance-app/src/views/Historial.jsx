import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTransactions } from "../services/transactions.service";
import { exportReport } from "../services/reports.service";

const recordsPerPage = 10;

const Historial = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message || "Error al cargar el historial");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return transactions.filter((t) => {
      const name = (t.name || t.category).toLowerCase();
      const matchesText = name.includes(searchText);
      const matchesCategory = category ? t.category === category : true;

      return matchesText && matchesCategory;
    });
  }, [search, category, transactions]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / recordsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * recordsPerPage;
  const visibleTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleFilterUpdate = (callback) => {
    callback();
    setCurrentPage(1);
  };

  const handleExportReport = async (format = 'csv') => {
    setExporting(true);
    setError("");
    try {
      await exportReport(format);
    } catch (err) {
      setError(err.message || "Error al exportar el reporte");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-700">Cargando historial...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Historial de Movimientos
          </h1>
          <p className="text-gray-700 mt-2">
            Consulta, filtra y exporta los movimientos registrados.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Volver al Dashboard
        </Link>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por nombre
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleFilterUpdate(() => setSearch(e.target.value))
              }
              placeholder="Ej. mercado"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) =>
                handleFilterUpdate(() => setCategory(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todas las categorias</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => handleExportReport('csv')}
              disabled={exporting}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {exporting ? 'Exportando...' : 'Exportar CSV'}
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => handleExportReport('pdf')}
              disabled={exporting}
              className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {exporting ? 'Exportando...' : 'Exportar PDF'}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-900">
            Movimientos encontrados
          </h2>
          <span className="text-sm text-gray-700">
            {filteredTransactions.length} registro(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th scope="col" className="py-3 text-gray-700">Fecha</th>
                <th scope="col" className="py-3 text-gray-700">Nombre</th>
                <th scope="col" className="py-3 text-gray-700">Categoria</th>
                <th scope="col" className="py-3 text-gray-700">Tipo</th>
                <th scope="col" className="py-3 text-gray-700">Monto</th>
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3">{t.date}</td>
                  <td className="py-3">
                    {t.name || t.category}
                  </td>
                  <td className="py-3">{t.category}</td>
                  <td className="py-3 capitalize">{t.type}</td>
                  <td
                    className={`py-3 font-semibold ${
                      t.type === "ingreso"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {t.type === "ingreso" ? "+" : "-"} S/.{" "}
                    {t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}

              {visibleTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-700">
                    No hay movimientos para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
          <p className="text-sm text-gray-700">
            Pagina {safePage} de {totalPages}. Se muestran hasta 10
            registros.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={safePage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={safePage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Historial;
