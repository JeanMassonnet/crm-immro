import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useClientStore } from '../store/clientStore';
import { translations } from '../utils/translations';
import ClientModal from '../components/modals/ClientModal';
import ClientList from '../components/clients/ClientList';
import ClientSearch from '../components/clients/ClientSearch';
import { Client } from '../types';

const { clients: t } = translations;

export default function Clients() {
  const { clients, deleteClient } = useClientStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(search.toLowerCase()) ||
      client.lastName.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClient(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.title}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t.addClient}
        </button>
      </div>

      <ClientSearch value={search} onChange={setSearch} />

      <ClientList
        clients={filteredClients}
        onEdit={handleEditClient}
        onDelete={deleteClient}
      />

      <ClientModal
        isOpen={showModal}
        onClose={handleCloseModal}
        client={selectedClient}
      />
    </div>
  );
}