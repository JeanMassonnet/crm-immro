import React from 'react';
import { Property, Visit, Task } from '../../types';
import { useClientStore } from '../../store/clientStore';
import { Calendar, CheckSquare } from 'lucide-react';

type RecentActivityProps = {
  properties: Property[];
  visits: Visit[];
  tasks: Task[];
};

export default function RecentActivity({ properties, visits, tasks }: RecentActivityProps) {
  const { clients } = useClientStore();

  const sortedVisits = [...visits]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const sortedTasks = [...tasks]
    .filter(task => task.status === 'completed')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Activité récente</h3>
      <div className="space-y-6">
        {sortedVisits.map((visit) => {
          const property = properties.find(p => p.id === visit.propertyId);
          const client = clients.find(c => c.id === visit.clientId);
          
          if (!property || !client) return null;

          return (
            <div key={visit.id} className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">
                  Visite - {property.title}
                </p>
                <p className="text-sm text-gray-600">
                  {client.firstName} {client.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(visit.date)}
                </p>
              </div>
            </div>
          );
        })}

        {sortedTasks.map((task) => {
          const property = properties.find(p => p.id === task.propertyId);
          
          if (!property) return null;

          return (
            <div key={task.id} className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">
                  {property.title}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(task.updatedAt)}
                </p>
              </div>
            </div>
          );
        })}

        {sortedVisits.length === 0 && sortedTasks.length === 0 && (
          <p className="text-center text-gray-500">
            Aucune activité récente
          </p>
        )}
      </div>
    </div>
  );
}