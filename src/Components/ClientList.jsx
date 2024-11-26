import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [newClient, setNewClient] = useState({
    code: '',
    raisonSociale: '',
    adresse: '',
    telephone: '',
    email: '',
    rc: '',
    ice: '',
    commercial: '',
  });
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

  const generateTestClients = () => {
    const generatedClients = [];
    for (let i = 1; i <= 20; i++) {
      generatedClients.push({
        id: i,
        code: `C${String(i).padStart(3, '0')}`,
        raisonSociale: `Raison Sociale ${i}`,
        adresse: `Adresse ${i}`,
        telephone: `012345678${i}`,
        email: `client${i}@exemple.com`,
        rc: `RC${i}`,
        ice: `ICE${i}`,
        commercial: `Commercial ${i}`,
      });
    }
    setClients(generatedClients);
  };

  const filteredClients = clients.filter(client =>
    client.raisonSociale.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCancelFilter = () => {
    setSearchTerm('');
  };

  const handleNewClientChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddNewClient = () => {
    setShowForm(true);
    setEditClient(null);
    setNewClient({
      code: '',
      raisonSociale: '',
      adresse: '',
      telephone: '',
      email: '',
      rc: '',
      ice: '',
      commercial: '',
    });
  };

  const handleSaveClient = () => {
    if (Object.values(newClient).some(value => !value)) {
      alert('Please fill in all fields.');
      return;
    }

    let updatedClients;
    if (editClient) {
      updatedClients = clients.map(client =>
        client.id === editClient.id ? { ...client, ...newClient } : client
      );
    } else {
      const clientWithId = { ...newClient, id: clients.length ? clients[clients.length - 1].id + 1 : 1 };
      updatedClients = [...clients, clientWithId];
    }

    setClients(updatedClients);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  const handleEditClient = (id) => {
    const clientToEdit = clients.find(client => client.id === id);
    setEditClient(clientToEdit);
    setNewClient(clientToEdit);
    setShowForm(true);
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const updatedClients = clients.filter(client => client.id !== id);
      setClients(updatedClients);

      // Update current page to prevent empty page after deletion
      if (currentPage > Math.ceil(updatedClients.length / clientsPerPage)) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-10">
      {/* Search and add new client button */}
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-6 rounded-lg shadow-md mt-14">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher sociale"
            className="border w-72 border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleCancelFilter}
            className="bg-amber-100 font-medium link text-slate-800 rounded-md px-4 py-2"
          >
            Annuler
          </button>
        </div>
        <button
          onClick={handleAddNewClient}
          className="bg-slate-800 font-medium link text-amber-100 rounded-md px-4 py-2"
        >
          Nouveau client
        </button>
      </div>

      {/* Add/Edit Client Form */}
      {showForm && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-lg font-medium text-gray-700 mb-4">{editClient ? 'Modifier le client' : 'Ajouter un nouveau client'}</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.keys(newClient).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={newClient[key]}
                onChange={handleNewClientChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="border border-gray-300 rounded-lg p-2 text-gray-700 text-sm"
              />
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCancelForm}
              className="bg-amber-100 font-medium link text-slate-800 rounded-md px-4 py-2"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveClient}
              className="bg-slate-800 font-medium link text-amber-100 rounded-md px-4 py-2"
            >
              {editClient ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-10">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Code client</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Raison sociale</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Adresse</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Téléphone</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">RC</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">ICE</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Commercial</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? currentClients.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.code}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.raisonSociale}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.adresse}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.telephone}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.email}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.rc}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.ice}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.commercial}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium flex space-x-2">
                  <button onClick={() => handleEditClient(client.id)} className="link flex items-center rounded bg-amber-100 text-slate-800 p-2 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteClient(client.id)} className="link bg-slate-800 rounded text-amber-100 p-2">
                    <FaTimes />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center py-4">Aucun client trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-slate-800 text-amber-100 px-4 py-2 rounded-md"
        >
          Précédent
        </button>
        <span className="flex items-center justify-center text-blue-950 font-medium">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-slate-800 text-amber-100 px-4 py-2 rounded-md"
        >
          Suivant
        </button>
      </div>
      </div>

      {/* Pagination */}
     
    </div>
  );
};

export default ClientList;
