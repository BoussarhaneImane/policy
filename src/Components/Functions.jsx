import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

const Fonctions = ({ directions }) => {
  // Initialize clients with directions, adding the required fields
  const initialClients = directions.map((direction, index) => ({
    id: direction.id || index + 1,
    nomDirection: direction.nomDirection,
    nomDepartement: direction.nomDepartement || `Département ${index + 1}`, // Add a default value if nomDepartement is not provided
    fonction: direction.fonction || `Fonction ${String.fromCharCode(65 + (index % 26))}`, // Cyclic letters (A-Z) for function names
  }));

  const [newClient, setNewClient] = useState({ nomDepartement: '', fonction: '', nomDirection: '' });
  const [editClient, setEditClient] = useState(null);
  const [searchTerm3, setSearchTerm3] = useState('');
  const [searchDirection, setSearchDirection] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');

  const [clients, setClients] = useState(initialClients);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    const parsedClients = storedClients ? JSON.parse(storedClients) : [];
    console.log("Stored clients:", parsedClients); // Debugging line
    setClients(parsedClients.length > 0 ? parsedClients : initialClients);
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  console.log(clients)

  const filteredClients = clients.filter((client) =>
    (client.nomDirection?.toLowerCase() || '').includes(searchDirection.toLowerCase()) &&
    (client.nomDepartement?.toLowerCase() || '').includes(searchDepartment.toLowerCase()) &&
    (client.fonction?.toLowerCase() || '').includes(searchTerm3.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const handleSaveClient = () => {
    if (!newClient.fonction || !newClient.nomDepartement) {
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
    setNewClient({ nomDepartement: '', fonction: '' });
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

  const handleSearchChange2 = (e) => {
    setSearchTerm3(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchDirectionChange = (e) => {
    setSearchDirection(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchDepartmentChange = (e) => {
    setSearchDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleCancelFilter = () => {
    setSearchTerm3('');
    setSearchDirection('');
    setSearchDepartment('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

 


  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mt-14 space-y-4 md:space-y-0 w-full">
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Fonction <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={newClient.fonction}
              onChange={(e) => setNewClient({ ...newClient, fonction: e.target.value })}
              placeholder="Fonction"
              className="border w-72 border-gray-300 rounded-md p-2 placeholder:text-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Département<span className="text-red-500">*</span></label>
            <select
            value={newClient.nomDepartement}
            onChange={(e) => setNewClient({ ...newClient, nomDepartement: e.target.value })}
            className="border w-72 border-gray-300 rounded-md p-2"
          >
            <option value="">Choisissez une Departement </option>
            {directions.length > 0 ? (
              directions.map((direction, index) => (
                <option key={index} value={direction.nomDepartement}>
                  {direction.nomDepartement}
                </option>
              ))
            ) : (
              <option value="">Aucune direction disponible</option>
            )}
          </select>

          </div>



<button onClick={handleSaveClient} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2   w-full sm:w-auto link" style={{marginTop:'1.5rem'}}>
            {editClient ? 'Mettre à jour' : 'Enregistrer'}
          </button>

          <button onClick={handleCancelFilter} className="bg-amber-100 font-medium text-slate-800 rounded-md px-4 py-2 w-full sm:w-auto link" style={{marginTop:'1.5rem'}}>
            Annuler
          </button>

         
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-6 rounded-lg shadow-md mt-14">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full">
      
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Fonction <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={searchTerm3}
                onChange={handleSearchChange2}
                placeholder="Rechercher par nom de Fonction"
                className="border w-60 border-gray-300 rounded-md p-2 placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Direction <span className="text-red-500">*</span></label>
              <select
                value={searchDirection}
                onChange={handleSearchDirectionChange}
                className="border w-72 border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Sélectionnez une direction</option>
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
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Département <span className="text-red-500">*</span></label>
              <select
  value={searchDepartment}
  onChange={handleSearchDepartmentChange}
  className="border w-72 border-gray-300 rounded-md p-2"
  required
>
<option value="">Sélectionnez une Departement </option>
            {directions.length > 0 ? (
              directions.map((direction, index) => (
                <option key={index} value={direction.nomDepartement}>
                  {direction.nomDepartement}
                </option>
              ))
            ) : (
              <option value="">Aucune direction disponible</option>
            )}
</select>

            </div>
          </div>
          <button onClick={handleCancelFilter} className="bg-amber-100 font-medium text-slate-800 rounded-md w-full px-4 py-2 mt-6 link sm:w-auto link">
            Annuler
          </button>
        </div>
      

      {/* Clients Table */}
   
      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md mt-10 overflow-x-auto">
      
      <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Fonction</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Département</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Direction</th>
              <th className="px-4 py-2 border border-gray-300 text-gray-300 bg-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.fonction}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.nomDepartement}</td>
                <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium">{client.nomDirection}</td>
               <td className="border border-gray-300 p-2 bg-white text-blue-950 font-medium flex space-x-2">
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
        <div className="mt-8 flex justify-between">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2">Précédent</button>
          <span className='text-blue-950 font-medium'>
            Page {currentPage} sur {totalPages}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-slate-800 font-medium text-amber-100 rounded-md px-4 py-2">Suivant</button>
        </div>
      </div>

      {/* Pagination Controls */}
      
    </div>
  );
};

export default Fonctions;
