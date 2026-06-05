import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import GrupoFamiliar from './views/GrupoFamiliar'; 
import Metas from './views/Metas';
import Presupuestos from './views/Presupuestos';
import Categorias from './views/Categorias';
import Register from './views/Register';
import Perfil from './views/Perfil';
import Recuperar from './views/Recuperar';
import Historial from './views/Historial';
import Prestamos from './views/Prestamos';
import AdminDashboard from './views/AdminDashboard'; 
function App() {
  return (
    <BrowserRouter>    
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/familia" element={<GrupoFamiliar />} /> 
        <Route path="/metas" element = {<Metas />}/>
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/perfil" element = {<Perfil />}/>
        <Route path="/recuperar" element = {<Recuperar />}/>
        <Route path="/historial" element={<Historial />} />    
        <Route path="/prestamos" element={<Prestamos />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
