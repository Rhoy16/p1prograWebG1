import { useState } from "react";
import { Link } from "react-router-dom";

const Prestamos = () => {
  const [debtor, setDebtor] = useState("");
  const [creditor, setCreditor] = useState("");
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [loans, setLoans] = useState([]);

  const handleAddLoan = (e) => {
    e.preventDefault(); 
    if (!debtor || !creditor || !amount) return;

    const newLoan = {
      id: Date.now(),
      debtor,
      creditor,
      amount: Number(amount),
      concept,
      date: new Date().toLocaleDateString(),
    };

    setLoans([...loans, newLoan]);
    setDebtor("");
    setCreditor("");
    setAmount("");
    setConcept("");
  };

  const handleDeleteLoan = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  const totalAmount = loans.reduce((acc, loan) => acc + loan.amount, 0);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Historial de Préstamos
          </h1>
          <p className="text-gray-700 mt-2">
            Crea, guarda y elimina los préstamos familiares.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Volver al Dashboard
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={handleAddLoan} className="bg-white p-5 rounded-xl shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Registrar préstamo</h2>

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Deudor"
            value={debtor}
            onChange={(e) => setDebtor(e.target.value)}
            required 
          />

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Acreedor"
            value={creditor}
            onChange={(e) => setCreditor(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border p-2 rounded mb-3"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Concepto"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Agregar
          </button>
        </form>

        <section className="md:col-span-2 bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Total: {loans.length}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Suma: S/. {totalAmount.toFixed(2)} 
            </span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th scope="col" className="p-2">Deudor</th>
                <th scope="col" className="p-2">Acreedor</th>
                <th scope="col" className="p-2">Monto</th>
                <th scope="col" className="p-2">Concepto</th>
                <th scope="col" className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{loan.debtor}</td>
                  <td className="p-2">{loan.creditor}</td>
                  <td className="p-2">S/. {loan.amount.toFixed(2)}</td>
                  <td className="p-2">{loan.concept || "-"}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteLoan(loan.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      aria-label="Eliminar préstamo"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}

              {loans.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-700">
                    No hay préstamos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};

export default Prestamos;