import { useState } from "react";
import { Link } from "react-router-dom";

const Categorias = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categorias");
    return savedCategories
      ? JSON.parse(savedCategories)
      : ["Comida", "Transporte", "Estudios", "Servicios"];
  });

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    localStorage.setItem("categorias", JSON.stringify(newCategories));
    setNewCategory("");
  };

  const handleDeleteCategory = (category) => {
    const newCategories = categories.filter((c) => c !== category);
    setCategories(newCategories);
    localStorage.setItem("categorias", JSON.stringify(newCategories));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Gestión de Categorías
        </h1>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Volver al Dashboard
        </Link>
      </div>

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

      {categories.map((category) => (
        <div
          key={category}
          className="bg-white p-4 rounded-xl shadow flex justify-between mb-2"
        >
          <span>{category}</span>
          <button
            onClick={() => handleDeleteCategory(category)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categorias;