import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import GrupoFamiliar from './views/GrupoFamiliar'; // 1. Importamos la nueva vista
import Metas from './views/Metas';
import Presupuestos from './views/Presupuestos';
import Categorias from './views/Categorias';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 2. Agregamos la ruta de la familia */}
        <Route path="/familia" element={<GrupoFamiliar />} /> 
        <Route path="/metas" element = {<Metas />}/>
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
