import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit, FaUser } from 'react-icons/fa';

const Employes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [newClient, setNewClient] = useState({
    nom: '',
    email: '',
    salaire: '',
    dateNaissance: '',
    departement: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  // Load clients from localStorage when the component mounts
  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    try {
      const parsedClients = storedClients ? JSON.parse(storedClients) : [];
      console.log(parsedClients);  // Check if the data is being loaded
      setClients(parsedClients);
    } catch (error) {
      console.error("Failed to parse clients from localStorage:", error);
      setClients([]);
    }
  }, []); // This will run once when the component mounts

  // Store clients back to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  // Generate 20 test clients only if localStorage is empty
  useEffect(() => {
    if (clients.length === 0) {
      const generateTestClients = () => {
        const generatedClients = [];
        for (let i = 1; i <= 20; i++) {
          generatedClients.push({
            id: i,
            nom: `Client ${String.fromCharCode(65 + (i % 26))}`,
            email: `client${i}@example.com`,
            salaire: `${3000 + i * 100} MAD`,
            dateNaissance: `199${i % 10}-0${(i % 9) + 1}-15`,
            departement: `Département ${String.fromCharCode(65 + (i % 5))}`,
          });
        }
        setClients(generatedClients);
      };
      generateTestClients();
    }
  }, [clients.length]); // Empty dependency array ensures this runs only once on initial load

  const filteredClients = clients.filter(client =>
    client.nom?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSaveClient = () => {
    if (!newClient.nom || !newClient.email || !newClient.salaire || !newClient.dateNaissance || !newClient.departement) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // If we are in edit mode, update the existing client
    if (editClient) {
      setClients(prev => prev.map(client =>
        client.id === editClient.id ? { ...client, ...newClient } : client
      ));
    } else {
      // Add a new client with a unique id
      const clientWithId = { 
        ...newClient, 
        id: clients.length ? clients[clients.length - 1].id + 1 : 1
      };
      setClients(prev => [...prev, clientWithId]);
    }

    // Reset the form and editing state
    setEditClient(null);
    setNewClient({ nom: '', email: '', salaire: '', dateNaissance: '', departement: '' });
    setCurrentPage(1);  // Reset to the first page after adding
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
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
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
            placeholder="Rechercher Nom"
            className="border w-72 border-gray-300 rounded-md p-2"
          />
          <button onClick={handleCancelFilter} className="bg-amber-100 link font-medium text-slate-800 rounded-md px-4 py-2 w-full sm:w-auto">
            Annuler
          </button>
        </div>
        <button onClick={handleShowForm} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2 w-full sm:w-auto link">
          Nouveau employé
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-lg font-medium text-gray-700 mb-4">{editClient ? 'Modifier l\'employé' : 'Ajouter un nouvel employé'}</h2>
          <div className="grid grid-cols-3 gap-4">
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
            <button onClick={handleCancelForm} className="bg-amber-100  font-medium text-slate-800 rounded-md px-4 py-2  w-full sm:w-auto link">
              Annuler
            </button>
            <button onClick={handleSaveClient} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2   w-full sm:w-auto link">
              {editClient ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </div>
      )}

      {/* Client table */}
 
      <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mt-10 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Nom</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">E-mail</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Salaire</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Date de naissance</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Département</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.nom}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.email}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.salaire}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.dateNaissance}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.departement}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium flex space-x-2">
                <button onClick={() => handleEditClient(client.id)} className="link flex items-center rounded bg-yellow-500 text-slate-800 p-2 mr-2">
                <FaUser />
                  </button>
              
                  <button onClick={() => handleEditClient(client.id)} className="link flex items-center rounded bg-amber-100 text-slate-800 p-2 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteClient(client.id)} className="link bg-slate-800 rounded text-amber-100 p-2">
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-slate-800 text-white rounded-md"
        >
          Précédent
        </button>
        <span className="px-4 py-2 text-blue-950 font-medium">{currentPage} sur {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-slate-800 text-white rounded-md"
        >
          Suivant
        </button>
      </div>
      </div>

      {/* Pagination */}
     
    </div>
  );
};

export default Employes;
