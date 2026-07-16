import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, createCategory } from "../services/categories.service";

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || "Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setError("");
    try {
      const created = await createCategory(newCategory.trim());
      setCategories([...categories, created]);
      setNewCategory("");
    } catch (err) {
      setError(err.message || "Error al crear categoría");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-100">
        <p className="text-gray-700">Cargando categorías...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Gestión de Categorías
        </h1>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Volver al Dashboard
        </Link>
      </nav>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-600 text-white px-4 rounded"
        >
          Agregar
        </button>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between mb-2"
        >
          <span>{cat.name}</span>
          {cat.isCustom && (
            <span className="text-xs text-gray-500 self-center">Personalizada</span>
          )}
        </div>
      ))}

      {categories.length === 0 && (
        <p className="text-gray-500 text-sm">No hay categorías registradas. Crea una nueva arriba.</p>
      )}
    </main>
  );
};

export default Categorias;