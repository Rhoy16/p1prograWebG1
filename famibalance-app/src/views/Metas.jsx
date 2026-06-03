import { useState } from "react";
import { Link } from "react-router-dom";
import DiseñoMeta from "../component/DiseñoMeta";
const  Metas = () =>{
    const [objetivo, setObjetivo] = useState("");
    const [ahorrado, setAhorrado] = useState("");
    const [textoMetas,setTextoMetas]=useState("");
    const [listaMetas,setListaMetas] = useState([
  {
    nombre: "Vacaciones",
    objetivo: 3000,
    ahorrado: 1200
  },
  {
    nombre: "Laptop",
    objetivo: 4000,
    ahorrado: 500
  }
    ]);

    const handleTextoMeta = (e) => {
        setTextoMetas(e.target.value);
    }


    return <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">Gestión de Ahorros</h1>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          ← Volver al Dashboard
        </Link>
      </nav>

      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Cree una meta de ahorro: </h2>
            <form className="space-y-3">
        <input
            type="text" 
            placeholder="Ej. Vacaciones 2026" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
            value={textoMetas} onChange={handleTextoMeta}
        ></input>
        <input type="number" placeholder="Objetivo" className="w-full px-4 py-2 border rounded-lg" 
        value={objetivo} onChange={(e) => setObjetivo(e.target.value)}/>

        <input type="number" placeholder="Ahorrado" className="w-full px-4 py-2 border rounded-lg" 
        value={ahorrado} onChange={(e) => setAhorrado(e.target.value)}/>

        <button type = "button"className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition" 
         onClick={() => {
    setListaMetas([...listaMetas,{nombre: textoMetas,
        objetivo: Number(objetivo),
        ahorrado: Number(ahorrado)}
    ]);
    setTextoMetas("");
    setObjetivo("");
    setAhorrado("");
}}>Crear Meta
</button>
    </form>
    <ul>
        {listaMetas.map((meta) => {
            return <DiseñoMeta meta={meta} />
        })}
    </ul>

      </div>
    </div>

}
export default Metas;