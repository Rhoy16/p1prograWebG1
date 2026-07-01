import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { initialTransactions } from "../mocks/datosFinancieros";

const months = [
  { value: "", text: "Todos los meses" },
  { value: "01", text: "Enero" },
  { value: "02", text: "Febrero" },
  { value: "03", text: "Marzo" },
  { value: "04", text: "Abril" },
  { value: "05", text: "Mayo" },
  { value: "06", text: "Junio" },
  { value: "07", text: "Julio" },
  { value: "08", text: "Agosto" },
  { value: "09", text: "Septiembre" },
  { value: "10", text: "Octubre" },
  { value: "11", text: "Noviembre" },
  { value: "12", text: "Diciembre" },
];

const recordsPerPage = 10;

const getMonth = (date) => {
  const parts = date.split("/");
  return parts[1] || "";
};

const Historial = () => {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const transactions = useMemo(() => {
    const savedTransactions = localStorage.getItem("movimientos");
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions);
      return parsed.map((t) =>
        t.monto !== undefined
          ? {
              id: t.id,
              name: t.nombre,
              date: t.fecha,
              category: t.categoria,
              amount: t.monto,
              type: t.tipo,
            }
          : t
      );
    }
    return initialTransactions;
  }, []);

  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return transactions.filter((t) => {
      const name = (t.name || t.category).toLowerCase();
      const matchesText = name.includes(searchText);
      const matchesMonth = month ? getMonth(t.date) === month : true;
      const matchesCategory = category ? t.category === category : true;

      return matchesText && matchesMonth && matchesCategory;
    });
  }, [search, category, month, transactions]);

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

  const handleExportReport = () => {
    const headers = ["Fecha", "Nombre", "Categoria", "Tipo", "Monto"];
    const rows = visibleTransactions.map((t) => [
      t.date,
      t.name || t.category,
      t.category,
      t.type,
      t.amount.toFixed(2),
    ]);
    const content = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");
    const file = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "reporte-historial.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Historial de Movimientos
          </h1>
          <p className="text-gray-500 mt-2">
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
              Mes
            </label>
            <select
              value={month}
              onChange={(e) => handleFilterUpdate(() => setMonth(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              {months.map((item) => (
                <option key={item.text} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
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
              onClick={handleExportReport}
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Exportar visible
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-900">
            Movimientos encontrados
          </h2>
          <span className="text-sm text-gray-500">
            {filteredTransactions.length} registro(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-gray-500">Fecha</th>
                <th className="py-3 text-gray-500">Nombre</th>
                <th className="py-3 text-gray-500">Categoria</th>
                <th className="py-3 text-gray-500">Tipo</th>
                <th className="py-3 text-gray-500">Monto</th>
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
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.type === "ingreso" ? "+" : "-"} S/.{" "}
                    {t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}

              {visibleTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    No hay movimientos para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
          <p className="text-sm text-gray-500">
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
    </div>
  );
};

export default Historial;
