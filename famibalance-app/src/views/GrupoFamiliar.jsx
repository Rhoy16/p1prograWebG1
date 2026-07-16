import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFamilyMembers, createFamily } from "../services/family.service";

const GrupoFamiliar = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasFamily, setHasFamily] = useState(false);

  // Create-family form
  const [familyName, setFamilyName] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getFamilyMembers();
        setMembers(data);
        setHasFamily(true);
      } catch (err) {
        // If the user has no family yet, the endpoint may fail
        if (err.status === 400 || err.status === 404) {
          setHasFamily(false);
        } else {
          setError(err.message || "Error al cargar miembros");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreateFamily = async (e) => {
    e.preventDefault();
    if (!familyName.trim()) return;
    setError("");
    try {
      await createFamily(familyName.trim());
      setSuccessMessage("¡Grupo familiar creado! Ahora eres el Jefe de Familia.");
      setTimeout(() => setSuccessMessage(""), 3000);
      setHasFamily(true);
      setFamilyName("");
      // Reload members
      const data = await getFamilyMembers();
      setMembers(data);
    } catch (err) {
      setError(err.message || "Error al crear grupo familiar");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-700">Cargando grupo familiar...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900">
          Gestión de Familia
        </h1>
        <Link
          to="/dashboard"
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Volver al Dashboard
        </Link>
      </nav>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl mb-6 text-sm" role="alert" aria-live="assertive">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}

      {!hasFamily ? (
        /* No family yet — show creation form */
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-md mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Aún no perteneces a un grupo familiar
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Crea un grupo familiar para invitar a tus familiares y gestionar las finanzas juntos.
          </p>
          <form onSubmit={handleCreateFamily}>
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="Nombre del grupo (ej. Familia Pérez)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Crear Grupo Familiar
            </button>
          </form>
        </section>
      ) : (
        /* Has a family — show members */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-1 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Información del grupo
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Tu grupo familiar tiene {members.length} miembro(s). Los nuevos integrantes deben registrarse y ser agregados por el administrador de la base de datos por ahora.
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Miembros Actuales ({members.length})
            </h2>

            <div className="flex flex-col gap-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50"
                >
                  <div>
                    <p className="font-bold text-gray-800">
                      {member.nombre}
                    </p>
                    <p className="text-sm text-gray-700">
                      {member.correo}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        member.rol === "Jefe de Familia"
                          ? "bg-purple-100 text-purple-700"
                          : member.rol === "Administrador"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {member.rol}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default GrupoFamiliar;