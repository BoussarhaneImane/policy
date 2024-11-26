import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

const Departements = ({ directions = [] }) => {
  const initialClients = directions.map((direction, index) => ({
    id: direction.id || index + 1,
    nomDirection: direction.nomDirection,
    nomDepartement: direction.nomDepartement || `Departement ${index + 1}`,
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [newClient, setNewClient] = useState({ nomDirection: '', nomDepartement: '', fonction: '' });
  const [clients, setClients] = useState(initialClients);
  const [editClient, setEditClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    const parsedClients = storedClients ? JSON.parse(storedClients) : [];
    if (parsedClients.length === 0 && directions.length > 0) {
      setClients(initialClients);
    } else {
      setClients(parsedClients);
    }
  }, [directions]);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const filteredClients = clients.filter(client =>
    (client.nomDirection?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
    (client.nomDepartement?.toLowerCase() || '').includes(searchTerm2.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange2 = (e) => {
    setSearchTerm2(e.target.value);
    setCurrentPage(1);
  };

  const handleCancelFilter = () => {
    setSearchTerm('');
    setSearchTerm2('');
  };

  const handleSaveClient = () => {
    if (!newClient.nomDirection || !newClient.nomDepartement) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (editClient) {
      setClients(prev => prev.map(client =>
        client.id === editClient.id ? { ...client, ...newClient } : client
      ));
    } else {
      const clientWithId = { ...newClient, id: clients.length ? clients[clients.length - 1].id + 1 : 1 };
      setClients(prev => [...prev, clientWithId]);
    }

    setEditClient(null);
    setNewClient({ nomDirection: '', nomDepartement: '', fonction: '' });
    setCurrentPage(1);
  };

  const handleEditClient = (id) => {
    const clientToEdit = clients.find(client => client.id === id);
    setEditClient(clientToEdit);
    setNewClient(clientToEdit);
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette direction ?')) {
      setClients(prev => prev.filter(client => client.id !== id));
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mt-14 space-y-4 md:space-y-0 w-full">
         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher par nom de direction"
            className="border w-full sm:w-60 border-gray-300 rounded-md p-2 placeholder:text-sm"
          />
          <input
            type="text"
            value={searchTerm2}
            onChange={handleSearchChange2}
            placeholder="Rechercher par nom de departement"
            className="border w-full sm:w-60 border-gray-300 rounded-md p-2 placeholder:text-sm"
          />
          <button
            onClick={handleCancelFilter}
            className="bg-amber-100 font-medium text-slate-800 rounded-md px-4 py-2 w-full sm:w-auto link"
          >
            Annuler
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
          <select
            value={newClient.nomDirection}
            onChange={(e) => setNewClient({ ...newClient, nomDirection: e.target.value })}
            className="border w-full sm:w-72 border-gray-300 rounded-md p-2"
          >
            <option value="">Choisissez une direction</option>
            {directions.length > 0 ? (
              directions.map((direction, index) => (
                <option key={index} value={direction.nomDirection}>
                  {direction.nomDirection}
                </option>
              ))
            ) : (
              <option value="">Aucune direction disponible</option>
            )}
          </select>

          <input
            type="text"
            value={newClient.nomDepartement}
            onChange={(e) => setNewClient({ ...newClient, nomDepartement: e.target.value })}
            placeholder="Nom de departement"
            className="border w-full sm:w-60 border-gray-300 rounded-md p-2 placeholder:text-sm"
          />
          <button
            onClick={handleSaveClient}
            className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2 w-full sm:w-auto link"
          >
            {editClient ? 'Mettre à jour' : 'Enregistrer'}
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md mt-10 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-2 sm:px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800 text-xs sm:text-base">Direction</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800 text-xs sm:text-base">Département</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800 text-xs sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium text-xs sm:text-base">{client.nomDirection}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium text-xs sm:text-base">{client.nomDepartement}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium flex space-x-2 text-xs sm:text-base">
                  <button onClick={() => handleEditClient(client.id)} className="flex items-center rounded bg-amber-100 text-slate-800 p-2 link">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteClient(client.id)} className="bg-slate-800 rounded text-amber-100 p-2 link">
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2 w-full sm:w-auto">
            Précédent
          </button>
          <span className='text-blue-950 font-medium text-center'>
            Page {currentPage} sur {totalPages}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2 w-full sm:w-auto">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Departements;
