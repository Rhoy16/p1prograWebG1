/**
 * PageLayout — Contenedor principal que envuelve cada vista.
 *
 * Reemplaza el patrón repetido:
 *   <div className="min-h-screen bg-gray-100 p-8">…</div>
 *
 * @param {React.ReactNode} children — Contenido de la página
 * @param {string} [className] — Clases adicionales (ej. "!p-6" para Dashboard)
 */
const PageLayout = ({ children, className = "" }) => {
  return (
    <main className={`min-h-screen bg-gray-100 p-8 ${className}`}>
      {children}
    </main>
  );
};

export default PageLayout;
