import React, { useState, useEffect, useRef } from 'react';
import { X, Search, UserPlus } from 'lucide-react';
import { Client, PropertyContact } from '../types';
import { useClientStore } from '../store/clientStore';

type PropertyContactSelectProps = {
  selectedContacts: PropertyContact[];
  onChange: (contacts: PropertyContact[]) => void;
  maxContacts?: number;
};

export default function PropertyContactSelect({
  selectedContacts,
  onChange,
  maxContacts = 4
}: PropertyContactSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { clients } = useClientStore();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    !selectedContacts.find(c => c.id === client.id) &&
    (client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     client.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddContact = (clientId: string) => {
    if (selectedContacts.length >= maxContacts) return;
    
    onChange([...selectedContacts, { id: clientId, role: 'owner' }]);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleRemoveContact = (contactId: string) => {
    onChange(selectedContacts.filter(c => c.id !== contactId));
  };

  const handleRoleChange = (contactId: string, role: PropertyContact['role']) => {
    onChange(selectedContacts.map(contact =>
      contact.id === contactId ? { ...contact, role } : contact
    ));
  };

  return (
    <div className="space-y-4">
      {/* Selected Contacts */}
      <div className="flex flex-wrap gap-2">
        {selectedContacts.map((contact) => {
          const client = clients.find(c => c.id === contact.id);
          if (!client) return null;

          return (
            <div
              key={contact.id}
              className="flex items-center gap-2 bg-gray-100 rounded-lg p-2"
            >
              <span className="font-medium">
                {client.firstName} {client.lastName}
              </span>
              <select
                value={contact.role}
                onChange={(e) => handleRoleChange(contact.id, e.target.value as PropertyContact['role'])}
                className="text-sm border-gray-300 rounded-md"
              >
                <option value="owner">Propriétaire</option>
                <option value="tenant">Locataire</option>
                <option value="agent">Agent</option>
              </select>
              <button
                onClick={() => handleRemoveContact(contact.id)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Search Input */}
      {selectedContacts.length < maxContacts && (
        <div ref={searchRef} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Rechercher un contact..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Search Results */}
          {showResults && searchQuery && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleAddContact(client.id)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {client.firstName} {client.lastName}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  Aucun contact trouvé
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}