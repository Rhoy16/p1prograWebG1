import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import GrupoFamiliar from './views/GrupoFamiliar'; // 1. Importamos la nueva vista

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 2. Agregamos la ruta de la familia */}
        <Route path="/familia" element={<GrupoFamiliar />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
