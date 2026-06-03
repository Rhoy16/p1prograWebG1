import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { movimientosIniciales } from "../mocks/datosFinancieros";

const REGISTROS_POR_PAGINA = 10;

const obtenerMes = (fecha) => {
  const [, mes] = fecha.split("/");
  return mes;
};

const nombreMes = (numeroMes) => {
  const meses = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
  };

  return meses[numeroMes] || numeroMes;
};

const Historial = () => {
  const [busqueda, setBusqueda] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState("todos");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [paginaActual, setPaginaActual] = useState(1);

  const movimientos = useMemo(() => {
    const movimientosGuardados = localStorage.getItem("movimientos");
    return movimientosGuardados ? JSON.parse(movimientosGuardados) : movimientosIniciales;
  }, []);

  const categorias = useMemo(
    () => [...new Set(movimientos.map((movimiento) => movimiento.categoria))],
    [movimientos]
  );

  const meses = useMemo(
    () => [...new Set(movimientos.map((movimiento) => obtenerMes(movimiento.fecha)))],
    [movimientos]
  );

  const movimientosFiltrados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    return movimientos.filter((movimiento) => {
      const nombre = (movimiento.nombre || movimiento.categoria).toLowerCase();
      const coincideTexto = nombre.includes(textoBusqueda);
      const coincideMes =
        mesSeleccionado === "todos" || obtenerMes(movimiento.fecha) === mesSeleccionado;
      const coincideCategoria =
        categoriaSeleccionada === "todas" || movimiento.categoria === categoriaSeleccionada;

      return coincideTexto && coincideMes && coincideCategoria;
    });
  }, [busqueda, categoriaSeleccionada, mesSeleccionado, movimientos]);

  const totalPaginas = Math.max(1, Math.ceil(movimientosFiltrados.length / REGISTROS_POR_PAGINA));
  const inicioPagina = (paginaActual - 1) * REGISTROS_POR_PAGINA;
  const movimientosVisibles = movimientosFiltrados.slice(
    inicioPagina,
    inicioPagina + REGISTROS_POR_PAGINA
  );

  const actualizarFiltro = (callback) => {
    callback();
    setPaginaActual(1);
  };

  const exportarCSV = () => {
    const encabezados = ["Fecha", "Nombre", "Categoria", "Tipo", "Monto"];
    const filas = movimientosVisibles.map((movimiento) => [
      movimiento.fecha,
      movimiento.nombre || movimiento.categoria,
      movimiento.categoria,
      movimiento.tipo,
      movimiento.monto.toFixed(2),
    ]);

    const contenido = [encabezados, ...filas]
      .map((fila) => fila.map((celda) => `"${String(celda).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "historial-movimientos.csv";
    enlace.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">Historial de Movimientos</h1>
          <p className="text-gray-500 mt-2">
            Consulta, filtra y exporta los movimientos registrados.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition shadow-sm"
        >
          Volver al Dashboard
        </Link>
      </header>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => actualizarFiltro(() => setBusqueda(e.target.value))}
              placeholder="Nombre del gasto"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mes</label>
            <select
              value={mesSeleccionado}
              onChange={(e) => actualizarFiltro(() => setMesSeleccionado(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="todos">Todos los meses</option>
              {meses.map((mes) => (
                <option key={mes} value={mes}>
                  {nombreMes(mes)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => actualizarFiltro(() => setCategoriaSeleccionada(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="todas">Todas las categorias</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={exportarCSV}
              disabled={movimientosVisibles.length === 0}
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Exportar visible
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-bold text-indigo-900">Movimientos</h2>
          <span className="text-sm text-gray-500">
            Mostrando {movimientosVisibles.length} de {movimientosFiltrados.length} resultados
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
                <th className="py-3 text-gray-500 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {movimientosVisibles.map((movimiento) => (
                <tr key={movimiento.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">{movimiento.fecha}</td>
                  <td className="py-3 font-medium text-gray-800">
                    {movimiento.nombre || movimiento.categoria}
                  </td>
                  <td className="py-3">{movimiento.categoria}</td>
                  <td className="py-3 capitalize">{movimiento.tipo}</td>
                  <td
                    className={`py-3 font-semibold text-right ${
                      movimiento.tipo === "ingreso" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {movimiento.tipo === "ingreso" ? "+" : "-"} S/. {movimiento.monto.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {movimientosVisibles.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No se encontraron movimientos con los filtros seleccionados.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-6">
          <span className="text-sm text-gray-500">
            Pagina {paginaActual} de {totalPaginas}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPaginaActual((pagina) => Math.max(1, pagina - 1))}
              disabled={paginaActual === 1}
              className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setPaginaActual((pagina) => Math.min(totalPaginas, pagina + 1))}
              disabled={paginaActual === totalPaginas}
              className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
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
