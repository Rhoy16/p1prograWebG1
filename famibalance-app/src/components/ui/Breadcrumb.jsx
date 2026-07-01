import { Link } from "react-router-dom";

/**
 * Breadcrumb — Cabecera reutilizable con título y enlace "Volver al Dashboard".
 *
 * Variantes:
 *   - "nav"    → barra blanca compacta (Perfil, Metas, GrupoFamiliar)
 *   - "header" → encabezado grande con subtítulo (Historial, Prestamos, AdminDashboard)
 *
 * @param {string}  title     — Título de la página
 * @param {string}  [subtitle] — Subtítulo descriptivo (solo variante "header")
 * @param {string}  [variant="nav"] — "nav" | "header"
 * @param {string}  [backTo="/dashboard"] — Ruta de regreso
 * @param {string}  [backLabel="← Volver al Dashboard"] — Texto del enlace
 * @param {string}  [className] — Clases adicionales
 * @param {React.ReactNode} [children] — Contenido extra (ej. botones adicionales)
 */
const Breadcrumb = ({
  title,
  subtitle,
  variant = "nav",
  backTo = "/dashboard",
  backLabel = "← Volver al Dashboard",
  className = "",
  children,
}) => {
  // Variante A: barra de navegación compacta (Perfil, Metas, GrupoFamiliar)
  if (variant === "nav") {
    return (
      <nav
        className={`mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 ${className}`}
      >
        <h1 className="text-2xl font-bold text-indigo-900">{title}</h1>
        <Link
          to={backTo}
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          {backLabel}
        </Link>
      </nav>
    );
  }

  // Variante B: encabezado grande con subtítulo (Historial, Prestamos, AdminDashboard)
  return (
    <header
      className={`mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div>
        <h1 className="text-4xl font-extrabold text-indigo-900">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {children}
        <Link
          to={backTo}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          {backLabel}
        </Link>
      </div>
    </header>
  );
};

export default Breadcrumb;
