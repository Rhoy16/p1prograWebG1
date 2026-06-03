import { useState } from "react";
import { Link } from "react-router-dom";
const  Metas = () =>{
    const [metas,setMetas] = useState(3000);
    const [ahorrado,setAhorrado] = useState(1200);
    

    return <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">Gestión de Familia</h1>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          ← Volver al Dashboard
        </Link>
      </nav>
      </div>

}
export default Metas;