/**
 * Card — Contenedor reutilizable con fondo blanco, bordes y sombra.
 *
 * Reemplaza el patrón repetido (~20 instancias):
 *   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">…</div>
 *
 * @param {React.ReactNode} children — Contenido de la tarjeta
 * @param {string} [className] — Clases adicionales (ej. "mb-8", "hover:shadow-md")
 */
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
