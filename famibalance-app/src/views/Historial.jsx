import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { movimientosIniciales } from "../mocks/datosFinancieros";

const meses = [
  { valor: "", texto: "Todos los meses" },
  { valor: "01", texto: "Enero" },
  { valor: "02", texto: "Febrero" },
  { valor: "03", texto: "Marzo" },
  { valor: "04", texto: "Abril" },
  { valor: "05", texto: "Mayo" },
  { valor: "06", texto: "Junio" },
  { valor: "07", texto: "Julio" },
  { valor: "08", texto: "Agosto" },
  { valor: "09", texto: "Septiembre" },
  { valor: "10", texto: "Octubre" },
  { valor: "11", texto: "Noviembre" },
  { valor: "12", texto: "Diciembre" },
];

const registrosPorPagina = 10;

const obtenerMes = (fecha) => {
  const partes = fecha.split("/");
  return partes[1] || "";
};

const Historial = () => {
  const [busqueda, setBusqueda] = useState("");
  const [mes, setMes] = useState("");
  const [categoria, setCategoria] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const movimientos = useMemo(() => {
    const movimientosGuardados = localStorage.getItem("movimientos");
    return movimientosGuardados
      ? JSON.parse(movimientosGuardados)
      : movimientosIniciales;
  }, []);

  const categorias = useMemo(() => {
    return [...new Set(movimientos.map((movimiento) => movimiento.categoria))];
  }, [movimientos]);

  const movimientosFiltrados = useMemo(() => {
    const textoBusqueda = busqueda.toLowerCase().trim();

    return movimientos.filter((movimiento) => {
      const nombre = (movimiento.nombre || movimiento.categoria).toLowerCase();
      const coincideTexto = nombre.includes(textoBusqueda);
      const coincideMes = mes ? obtenerMes(movimiento.fecha) === mes : true;
      const coincideCategoria = categoria
        ? movimiento.categoria === categoria
        : true;

      return coincideTexto && coincideMes && coincideCategoria;
    });
  }, [busqueda, categoria, mes, movimientos]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(movimientosFiltrados.length / registrosPorPagina)
  );
  const paginaSegura = Math.min(paginaActual, totalPaginas);
  const inicio = (paginaSegura - 1) * registrosPorPagina;
  const movimientosVisibles = movimientosFiltrados.slice(
    inicio,
    inicio + registrosPorPagina
  );

  const actualizarFiltro = (callback) => {
    callback();
    setPaginaActual(1);
  };

  const exportarReporte = () => {
    const encabezados = ["Fecha", "Nombre", "Categoria", "Tipo", "Monto"];
    const filas = movimientosVisibles.map((movimiento) => [
      movimiento.fecha,
      movimiento.nombre || movimiento.categoria,
      movimiento.categoria,
      movimiento.tipo,
      movimiento.monto.toFixed(2),
    ]);
    const contenido = [encabezados, ...filas]
      .map((fila) => fila.map((valor) => `"${valor}"`).join(","))
      .join("\n");
    const archivo = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "reporte-historial.csv";
    enlace.click();
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
              value={busqueda}
              onChange={(e) =>
                actualizarFiltro(() => setBusqueda(e.target.value))
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
              value={mes}
              onChange={(e) => actualizarFiltro(() => setMes(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              {meses.map((item) => (
                <option key={item.texto} value={item.valor}>
                  {item.texto}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              value={categoria}
              onChange={(e) =>
                actualizarFiltro(() => setCategoria(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todas las categorias</option>
              {categorias.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={exportarReporte}
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
            {movimientosFiltrados.length} registro(s)
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
              {movimientosVisibles.map((movimiento) => (
                <tr
                  key={movimiento.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3">{movimiento.fecha}</td>
                  <td className="py-3">
                    {movimiento.nombre || movimiento.categoria}
                  </td>
                  <td className="py-3">{movimiento.categoria}</td>
                  <td className="py-3 capitalize">{movimiento.tipo}</td>
                  <td
                    className={`py-3 font-semibold ${
                      movimiento.tipo === "ingreso"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {movimiento.tipo === "ingreso" ? "+" : "-"} S/.{" "}
                    {movimiento.monto.toFixed(2)}
                  </td>
                </tr>
              ))}

              {movimientosVisibles.length === 0 && (
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
            Pagina {paginaSegura} de {totalPaginas}. Se muestran hasta 10
            registros.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setPaginaActual((pagina) => Math.max(1, pagina - 1))
              }
              disabled={paginaSegura === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() =>
                setPaginaActual((pagina) => Math.min(totalPaginas, pagina + 1))
              }
              disabled={paginaSegura === totalPaginas}
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
