import React, { useState } from 'react';
import { Plus, Calendar, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { useVisitStore } from '../store/visitStore';
import { useClientStore } from '../store/clientStore';
import { Visit } from '../types';

type PropertyVisitsProps = {
  propertyId: string;
};

type VisitFormData = {
  date: string;
  clientId: string;
  notes: string;
  interested: boolean;
};

export default function PropertyVisits({ propertyId }: PropertyVisitsProps) {
  const { visits, addVisit, updateVisit } = useVisitStore();
  const { clients } = useClientStore();
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [visitForm, setVisitForm] = useState<VisitFormData>({
    date: new Date().toISOString().split('T')[0],
    clientId: '',
    notes: '',
    interested: true,
  });

  const propertyVisits = visits
    .filter(visit => visit.propertyId === propertyId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleOpenForm = (visit?: Visit) => {
    if (visit) {
      setSelectedVisit(visit);
      setVisitForm({
        date: visit.date.toISOString().split('T')[0],
        clientId: visit.clientId,
        notes: visit.notes,
        interested: visit.interested,
      });
    } else {
      setSelectedVisit(null);
      setVisitForm({
        date: new Date().toISOString().split('T')[0],
        clientId: '',
        notes: '',
        interested: true,
      });
    }
    setShowVisitForm(true);
  };

  const handleCloseForm = () => {
    setShowVisitForm(false);
    setSelectedVisit(null);
    setVisitForm({
      date: new Date().toISOString().split('T')[0],
      clientId: '',
      notes: '',
      interested: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVisit) {
      updateVisit(selectedVisit.id, {
        ...visitForm,
        date: new Date(visitForm.date),
      });
    } else {
      addVisit({
        propertyId,
        ...visitForm,
        date: new Date(visitForm.date),
      });
    }
    handleCloseForm();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Historique des visites</h3>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une visite
        </button>
      </div>

      {showVisitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl font-semibold mb-4">
              {selectedVisit ? 'Modifier la visite' : 'Ajouter une visite'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de visite
                </label>
                <input
                  type="date"
                  value={visitForm.date}
                  onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select
                  value={visitForm.clientId}
                  onChange={(e) => setVisitForm({ ...visitForm, clientId: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={visitForm.notes}
                  onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intéressé
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={visitForm.interested}
                      onChange={() => setVisitForm({ ...visitForm, interested: true })}
                      className="mr-2"
                    />
                    Oui
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!visitForm.interested}
                      onChange={() => setVisitForm({ ...visitForm, interested: false })}
                      className="mr-2"
                    />
                    Non
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedVisit ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {propertyVisits.map((visit) => {
          const client = clients.find(c => c.id === visit.clientId);
          return (
            <div
              key={visit.id}
              onClick={() => handleOpenForm(visit)}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            >
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {client ? `${client.firstName} ${client.lastName}` : 'Client inconnu'}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(visit.date)}</p>
                  </div>
                  {visit.interested ? (
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <ThumbsDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                {visit.notes && (
                  <p className="mt-2 text-sm text-gray-600">{visit.notes}</p>
                )}
              </div>
            </div>
          );
        })}
        {propertyVisits.length === 0 && (
          <p className="text-center text-gray-500 py-4">Aucune visite enregistrée</p>
        )}
      </div>
    </div>
  );
}