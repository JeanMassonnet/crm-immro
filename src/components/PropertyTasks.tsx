import React, { useState } from 'react';
import { Plus, CheckCircle2, User } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { useClientStore } from '../store/clientStore';
import { Task, TaskStatus } from '../types';
import TaskModal, { TaskFormData } from './modals/TaskModal';
import CommonTasksModal from './modals/CommonTasksModal';

type PropertyTasksProps = {
  propertyId: string;
};

export default function PropertyTasks({ propertyId }: PropertyTasksProps) {
  const { tasks, addTask, updateTask } = useTaskStore();
  const { clients } = useClientStore();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCommonTasksModal, setShowCommonTasksModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const propertyTasks = tasks.filter(task => task.propertyId === propertyId)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const handleOpenTaskModal = (task?: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(undefined);
    setShowTaskModal(false);
  };

  const handleSubmitTask = (formData: TaskFormData) => {
    if (selectedTask) {
      updateTask(selectedTask.id, {
        ...formData,
        dueDate: new Date(formData.dueDate),
      });
    } else {
      addTask({
        propertyId,
        ...formData,
        dueDate: new Date(formData.dueDate),
      });
    }
    handleCloseTaskModal();
  };

  const handleSubmitCommonTasks = (selectedTasks: Array<{ title: string; description: string; dueOffset: number }>) => {
    const now = new Date();
    selectedTasks.forEach(task => {
      const dueDate = new Date(now);
      dueDate.setDate(dueDate.getDate() + task.dueOffset);
      
      addTask({
        propertyId,
        title: task.title,
        description: task.description,
        dueDate,
        status: 'pending',
        assignee: 'agent',
        clientId: '',
      });
    });
  };

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

  const getAssigneeText = (task: Task) => {
    if (task.assignee === 'agent') {
      return 'Agent';
    }
    if (task.clientId) {
      const client = clients.find(c => c.id === task.clientId);
      return client ? `${client.firstName} ${client.lastName}` : 'Client';
    }
    return 'Non assigné';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tâches en cours</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCommonTasksModal(true)}
            className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tâches courantes
          </button>
          <button
            onClick={() => handleOpenTaskModal()}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tâche personnalisée
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {propertyTasks.map((task) => (
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
            <div 
              className="flex-1 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
              onClick={() => handleOpenTaskModal(task)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Échéance : {formatDate(task.dueDate)}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{getAssigneeText(task)}</span>
                    </div>
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
        ))}
        {propertyTasks.length === 0 && (
          <p className="text-center text-gray-500 py-4">Aucune tâche enregistrée</p>
        )}
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={handleCloseTaskModal}
        task={selectedTask}
        onSubmit={handleSubmitTask}
      />

      <CommonTasksModal
        isOpen={showCommonTasksModal}
        onClose={() => setShowCommonTasksModal(false)}
        onSubmit={handleSubmitCommonTasks}
      />
    </div>
  );
}