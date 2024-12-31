import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Client } from '../../types';
import { translations } from '../../utils/translations';

const { clients: t, common, leadSources } = translations;

type ClientListProps = {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
};

export default function ClientList({ clients, onEdit, onDelete }: ClientListProps) {
  const getClientTypes = (client: Client) => {
    const types = [];
    if (client.types.buyer) types.push(t.buyer);
    if (client.types.seller) types.push(t.seller);
    return types;
  };

  const getTypeColor = (type: string) => {
    return type === t.buyer
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.firstName} {t.lastName}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.type}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.leadSource}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {common.email}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {common.phone}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {client.firstName} {client.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {getClientTypes(client).map((type, index) => (
                      <span
                        key={index}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(type)}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {leadSources[client.leadSource]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(client)}
                    className="text-primary hover:text-primary-dark mr-4"
                    title={common.edit}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(client.id)}
                    className="text-red-600 hover:text-red-900"
                    title={common.delete}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}