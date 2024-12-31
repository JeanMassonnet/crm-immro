import React from 'react';
import { useClientStore } from '../store/clientStore';
import { usePropertyStore } from '../store/propertyStore';
import { useVisitStore } from '../store/visitStore';
import { useTaskStore } from '../store/taskStore';
import { Building2, Users, Euro, TrendingUp } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import PropertyChart from '../components/dashboard/PropertyChart';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function Dashboard() {
  const { clients } = useClientStore();
  const { properties } = usePropertyStore();
  const { visits } = useVisitStore();
  const { tasks } = useTaskStore();

  // Calcul des statistiques
  const totalProperties = properties.length;
  const totalClients = clients.length;
  const activeProperties = properties.filter(p => p.status !== 'sold').length;
  
  // Calcul du montant total des ventes
  const soldProperties = properties.filter(p => p.status === 'sold');
  const totalSales = soldProperties.reduce((acc, prop) => acc + prop.price, 0);
  
  // Calcul des tendances (simulées pour la démo)
  const propertyTrend = { value: 12, isPositive: true };
  const clientTrend = { value: 8, isPositive: true };
  const salesTrend = { value: 15, isPositive: true };
  const activeTrend = { value: 5, isPositive: true };

  // Formatage des valeurs monétaires
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total des biens"
          value={totalProperties}
          icon={<Building2 className="w-6 h-6 text-primary" />}
          trend={propertyTrend}
        />
        <StatCard
          title="Contacts"
          value={totalClients}
          icon={<Users className="w-6 h-6 text-primary" />}
          trend={clientTrend}
        />
        <StatCard
          title="Chiffre d'affaires"
          value={formatPrice(totalSales)}
          icon={<Euro className="w-6 h-6 text-primary" />}
          trend={salesTrend}
        />
        <StatCard
          title="Biens actifs"
          value={activeProperties}
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          trend={activeTrend}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertyChart properties={properties} />
        <RecentActivity
          properties={properties}
          visits={visits}
          tasks={tasks}
        />
      </div>
    </div>
  );
}