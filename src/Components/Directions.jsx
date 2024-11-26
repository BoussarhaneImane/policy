import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

const Directions = ({ onDirectionsChange = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [editClient, setEditClient] = useState(null);
  const [newClient, setNewClient] = useState({ nomDirection: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    const parsedClients = storedClients ? JSON.parse(storedClients) : [];
    if (parsedClients.length === 0) {
      generateTestClients();
    } else {
      setClients(parsedClients);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  // Function to generate test clients
  const generateTestClients = () => {
    const generatedClients = [];
    for (let i = 1; i <= 20; i++) {
      generatedClients.push({
        id: i,
        nomDirection: `Direction ${String.fromCharCode(65 + (i % 26))}`,
      });
    }
    setClients(generatedClients);
  };

  const filteredClients = clients.filter(client =>
    client.nomDirection && client.nomDirection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // Update external state when clients change
  useEffect(() => {
    onDirectionsChange(clients);
    localStorage.setItem('clients', JSON.stringify(clients)); // Keep localStorage updated
  }, [clients, onDirectionsChange]);

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCancelFilter = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Handle save or update client
  const handleSaveClient = () => {
    if (!newClient.nomDirection) {
      alert('Veuillez remplir le nom de la direction.');
      return;
    }

    if (editClient) {
      // Update existing client
      setClients(prev => prev.map(client =>
        client.id === editClient.id ? { ...client, ...newClient } : client
      ));
    } else {
      // Add new client
      const clientWithId = { ...newClient, id: clients.length ? clients[clients.length - 1].id + 1 : 1 };
      setClients(prev => [...prev, clientWithId]);
    }

    // Reset form and editing state
    setEditClient(null);
    setNewClient({ nomDirection: '' });
    setCurrentPage(1);
  };

  // Handle edit client
  const handleEditClient = (id) => {
    const clientToEdit = clients.find(client => client.id === id);
    setEditClient(clientToEdit);
    setNewClient(clientToEdit);
  };

  // Handle delete client
  const handleDeleteClient = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette direction ?')) {
      setClients(prev => prev.filter(client => client.id !== id));
    }
  };

  // Handle page change
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
            className="border w-full md:w-72 border-gray-300 rounded-md p-2 "
          />
          <button
            onClick={handleCancelFilter}
            className="bg-amber-100 font-medium text-slate-800 rounded-md px-4 py-2 w-full sm:w-auto link"
          >
            Annuler
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
          <input
            type="text"
            value={newClient.nomDirection}
            onChange={(e) => setNewClient({ ...newClient, nomDirection: e.target.value })}
            placeholder="Nom de direction"
            className="border w-full md:w-72 border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleSaveClient}
            className="bg-slate-800  font-medium text-amber-100 rounded-md px-4 py-2 w-full sm:w-auto link"
          >
            {editClient ? 'Mettre à jour' : 'Enregistrer'}
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mt-10 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Direction</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.nomDirection}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium flex space-x-2">
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

        {/* Pagination controls */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2 w-full md:w-auto">
            Précédent
          </button>
          <span className='text-blue-950 font-medium'>{`Page ${currentPage} sur ${totalPages}`}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2 w-full md:w-auto">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Directions;
