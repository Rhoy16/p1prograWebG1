import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: Cuando entres a la web, muestra el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta del panel: Cuando el login sea exitoso, muestra el Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;