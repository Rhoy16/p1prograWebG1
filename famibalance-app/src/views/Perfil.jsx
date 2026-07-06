import { useState } from 'react';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan@familia.com');
  const [originalName, setOriginalName] = useState('Juan Pérez');
  const [originalEmail, setOriginalEmail] = useState('juan@familia.com');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setOriginalName(name);
    setOriginalEmail(email);
    setIsEditing(false);
    setMessage('Perfil actualizado correctamente');
    
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setIsEditing(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessage('Foto de perfil actualizada');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">Mi Perfil</h1>
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
          ← Volver al Dashboard
        </Link>
      </nav>

      <section className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        
        {message && (
          <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg mb-6 text-sm text-center" role="alert" aria-live="assertive">
            {message}
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-3xl font-bold mb-4">
            {name.charAt(0)}
          </div>
          
          <label className="cursor-pointer text-sm text-indigo-600 font-semibold hover:text-indigo-800">
            Cambiar foto
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>

          <div className="flex gap-4">
            {!isEditing ? (
              <button 
                type="button" 
                onClick={() => setIsEditing(true)}
                className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition"
              >
                Editar Datos
              </button>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="w-1/2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Guardar
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Perfil;