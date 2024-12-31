import React, { useState } from 'react';
import { X } from 'lucide-react';

type CommonTasksModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedTasks: CommonTask[]) => void;
};

type CommonTask = {
  id: string;
  title: string;
  description: string;
  dueOffset: number; // Days from now
};

const commonTasks: CommonTask[] = [
  {
    id: '1',
    title: 'Vérification des documents',
    description: 'Vérifier tous les documents nécessaires pour la vente',
    dueOffset: 2,
  },
  {
    id: '2',
    title: 'Photos professionnelles',
    description: 'Organiser une séance photo professionnelle du bien',
    dueOffset: 5,
  },
  {
    id: '3',
    title: 'Diagnostic énergétique',
    description: 'Programmer le diagnostic de performance énergétique',
    dueOffset: 7,
  },
  {
    id: '4',
    title: 'Publication des annonces',
    description: 'Publier les annonces sur les différents portails immobiliers',
    dueOffset: 3,
  },
  {
    id: '5',
    title: 'Rapport de commercialisation',
    description: 'Préparer un rapport de commercialisation pour le propriétaire',
    dueOffset: 14,
  },
];

export default function CommonTasksModal({ isOpen, onClose, onSubmit }: CommonTasksModalProps) {
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tasksToCreate = commonTasks.filter(task => selectedTasks.has(task.id));
    onSubmit(tasksToCreate);
    setSelectedTasks(new Set());
    onClose();
  };

  const toggleTask = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
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
        
        <h2 className="text-xl font-semibold mb-4">Tâches courantes</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {commonTasks.map((task) => (
              <label
                key={task.id}
                className="flex items-start p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Échéance : {task.dueOffset} jours
                  </p>
                </div>
              </label>
            ))}
          </div>

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
              disabled={selectedTasks.size === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Créer les tâches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}