import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useClientStore } from '../store/clientStore';
import { usePropertyStore } from '../store/propertyStore';
import { Task, TaskStatus } from '../types';
import { CheckCircle2, User, Building, Plus } from 'lucide-react';
import TaskModal from '../components/modals/TaskModal';

export default function Tasks() {
  const { tasks, updateTask } = useTaskStore();
  const { clients } = useClientStore();
  const { properties } = usePropertyStore();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [propertyFilter, setPropertyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Filter tasks assigned to the agent
  const agentTasks = tasks.filter(task => task.assignee === 'agent');

  // Apply filters
  const filteredTasks = agentTasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesProperty = propertyFilter === 'all' || task.propertyId === propertyFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesProperty && matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in_progress':
        return 'En cours';
      default:
        return 'À faire';
    }
  };

  const handleSubmitTask = (formData: any) => {
    // Handle task submission
    setShowTaskModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Mes Tâches</h1>
        <button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle tâche
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">À faire</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Propriété
            </label>
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">Toutes les propriétés</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rechercher
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une tâche..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const property = properties.find(p => p.id === task.propertyId);
            return (
              <div key={task.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <button
                  onClick={() => updateTask(task.id, {
                    status: task.status === 'completed' ? 'pending' : 'completed'
                  })}
                  className="mt-1"
                >
                  <CheckCircle2 
                    className={`w-5 h-5 ${
                      task.status === 'completed' 
                        ? 'text-green-500' 
                        : 'text-gray-300 hover:text-gray-400'
                    }`} 
                  />
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Échéance : {formatDate(task.dueDate)}</span>
                        {property && (
                          <>
                            <span>•</span>
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              <span>{property.title}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  {task.description && (
                    <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                  )}
                </div>
              </div>
            );
          })}
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 py-4">Aucune tâche trouvée</p>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
}