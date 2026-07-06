import Card from "./Card";

/**
 * StatCard — Tarjeta de métrica reutilizable (título + valor + color).
 *
 * Estandariza las tarjetas de resumen del Dashboard (4) y AdminDashboard (3).
 *
 * @param {string} title — Título superior (ej. "Ingresos del Mes")
 * @param {string|React.ReactNode} value — Valor a mostrar (ej. "S/. 5,200.00")
 * @param {string} [valueColor="text-green-600"] — Clase de color del valor
 * @param {string} [className] — Clases adicionales sobre el Card
 */
const StatCard = ({ title, value, valueColor = "text-green-600", className = "" }) => {
  return (
    <Card className={`hover:shadow-md transition ${className}`}>
      <h2 className="text-sm font-bold text-gray-700 uppercase">{title}</h2>
      <p className={`text-3xl font-bold ${valueColor} mt-2`}>{value}</p>
    </Card>
  );
};

export default StatCard;
