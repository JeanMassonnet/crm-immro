import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Home, LogOut, Building, Settings, CheckSquare, FileText, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { translations } from '../utils/translations';

const { navigation, auth } = translations;

export default function Sidebar() {
  const { logout } = useAuthStore();

  return (
    <div className="hidden md:flex w-64 bg-white h-full shadow-lg flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">CRM Immobilier</h1>
      </div>
      <nav className="flex-1">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <Home className="w-5 h-5 mr-3" />
          {navigation.dashboard}
        </NavLink>
        <NavLink
          to="/app/clients"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <Users className="w-5 h-5 mr-3" />
          {navigation.clients}
        </NavLink>
        <NavLink
          to="/app/properties"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <Building className="w-5 h-5 mr-3" />
          {navigation.properties}
        </NavLink>
        <NavLink
          to="/app/searches"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <Search className="w-5 h-5 mr-3" />
          {navigation.searches}
        </NavLink>
        <NavLink
          to="/app/tasks"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <CheckSquare className="w-5 h-5 mr-3" />
          {navigation.tasks}
        </NavLink>
        <NavLink
          to="/app/documents"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <FileText className="w-5 h-5 mr-3" />
          {navigation.documents}
        </NavLink>
      </nav>
      <div className="mt-auto border-t border-gray-200">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100' : ''
            }`
          }
        >
          <Settings className="w-5 h-5 mr-3" />
          {navigation.settings}
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {auth.logout}
        </button>
      </div>
    </div>
  );
}