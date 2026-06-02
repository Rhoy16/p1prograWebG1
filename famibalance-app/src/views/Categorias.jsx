import { useState } from "react";
import { Link } from "react-router-dom";

const Categorias = () => {
  const [categorias,setCategorias] = useState([
    "Comida",
    "Transporte",
    "Estudios",
    "Servicios"
  ]);

  const [nuevaCategoria,setNuevaCategoria] = useState("");
  const agregarCategoria = () => {

    if(!nuevaCategoria.trim()) return;

    setCategorias([
      ...categorias,
      nuevaCategoria
    ]);

    setNuevaCategoria("");
  };

  const eliminarCategoria = (categoria) => {
    setCategorias(
      categorias.filter(
        cat => cat !== categoria
      )
    );
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
          value={nuevaCategoria}
          onChange={(e)=>setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría"
          className="border p-2 rounded"
        />
        <button
          onClick={agregarCategoria}
          className="bg-green-600 text-white px-4 rounded"
        >
          Agregar
        </button>

      </div>
      {categorias.map((categoria)=>(
        
        <div
          key={categoria}
          className="bg-white p-4 rounded-xl shadow flex justify-between mb-2"
        >
          <span>{categoria}</span>
          <button
            onClick={()=>eliminarCategoria(categoria)}
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