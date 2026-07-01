import { useState } from "react";
import { Link } from "react-router-dom";

const GrupoFamiliar = () => {
  // Initial state simulating a user database
  const [members, setMembers] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      rol: "Jefe de Familia",
      correo: "juan@familia.com",
    },
    {
      id: 2,
      nombre: "María Gómez",
      rol: "Miembro",
      correo: "maria@familia.com",
    },
  ]);

  const [newEmail, setNewEmail] = useState("");

  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!newEmail) return;

    const newMember = {
      id: Date.now(),
      nombre: "Invitado Pendiente",
      rol: "Miembro",
      correo: newEmail,
    };

    setMembers([...members, newMember]);
    alert("¡Invitación enviada con éxito a " + newEmail + "!");
    setNewEmail("");
  };

  const handleDeleteMember = (id) => {
    const member = members.find((m) => m.id === id);
    if (window.confirm(`¿Deseas eliminar a ${member.nombre}?`)) {
      setMembers(members.filter((m) => m.id !== id));
      alert("Miembro eliminado correctamente");
    }
  };

  const handlePromoteMember = (id) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, rol: "Administrador" } : m
      )
    );
    alert("Miembro ascendido a Administrador");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-1 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Invitar nuevo miembro
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Ingresa el correo de tu familiar para enviarle un enlace de acceso al grupo.
          </p>

          <form onSubmit={handleInviteMember}>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Enviar Invitación
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
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
                  <p className="text-sm text-gray-500">
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

                  {member.rol !== "Jefe de Familia" && (
                    <>
                      <button
                        onClick={() => handlePromoteMember(member.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        Ascender
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrupoFamiliar;