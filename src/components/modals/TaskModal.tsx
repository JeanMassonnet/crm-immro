import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, TaskStatus, TaskAssignee } from '../../types';
import { useClientStore } from '../../store/clientStore';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
};

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  assignee: TaskAssignee;
  clientId: string;
};

export default function TaskModal({ isOpen, onClose, task, onSubmit }: TaskModalProps) {
  const { clients } = useClientStore();
  const [formData, setFormData] = React.useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    assignee: 'agent',
    clientId: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toISOString().split('T')[0],
        status: task.status,
        assignee: task.assignee,
        clientId: task.clientId || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        assignee: 'agent',
        clientId: '',
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">
          {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date d'échéance
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pending">À faire</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigné à
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.assignee === 'agent'}
                  onChange={() => setFormData({ ...formData, assignee: 'agent', clientId: '' })}
                  className="mr-2"
                />
                Agent
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.assignee === 'client'}
                  onChange={() => setFormData({ ...formData, assignee: 'client' })}
                  className="mr-2"
                />
                Client
              </label>
            </div>
          </div>

          {formData.assignee === 'client' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sélectionner le client
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Choisir un client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {task ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}