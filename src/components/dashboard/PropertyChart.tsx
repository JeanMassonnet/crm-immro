import React from 'react';
import { Property } from '../../types';

type PropertyChartProps = {
  properties: Property[];
};

export default function PropertyChart({ properties }: PropertyChartProps) {
  const statusCounts = {
    available: properties.filter(p => p.status === 'available').length,
    underContract: properties.filter(p => p.status === 'underContract').length,
    underOffer: properties.filter(p => p.status === 'underOffer').length,
    sold: properties.filter(p => p.status === 'sold').length,
  };

  const total = Object.values(statusCounts).reduce((acc, curr) => acc + curr, 0);

  const getPercentage = (value: number) => ((value / total) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Répartition des biens</h3>
      <div className="space-y-4">
        <div className="flex h-4 rounded-full overflow-hidden">
          <div 
            style={{ width: `${getPercentage(statusCounts.available)}%` }}
            className="bg-blue-500"
          />
          <div 
            style={{ width: `${getPercentage(statusCounts.underContract)}%` }}
            className="bg-yellow-500"
          />
          <div 
            style={{ width: `${getPercentage(statusCounts.underOffer)}%` }}
            className="bg-orange-500"
          />
          <div 
            style={{ width: `${getPercentage(statusCounts.sold)}%` }}
            className="bg-green-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-sm text-gray-600">
              Avis de valeur ({statusCounts.available})
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">
              Sous mandat ({statusCounts.underContract})
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-orange-500 mr-2" />
            <span className="text-sm text-gray-600">
              Sous compromis ({statusCounts.underOffer})
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-sm text-gray-600">
              Vendus ({statusCounts.sold})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}