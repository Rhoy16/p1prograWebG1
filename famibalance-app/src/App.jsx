import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import GrupoFamiliar from './views/GrupoFamiliar'; // 1. Importamos la nueva vista
import Metas from './views/Metas';
import Presupuestos from './views/Presupuestos';
import Categorias from './views/Categorias';
import Register from './views/Register';
import Perfil from './views/Perfil';
import Recuperar from './views/Recuperar';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/familia" element={<GrupoFamiliar />} /> 
        <Route path="/metas" element = {<Metas />}/>
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/perfil" element = {<Perfil />}/>
        <Route path="/recuperar" element = {<Recuperar />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
