import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Building, Search, Menu, CheckSquare, FileText, Settings, LogOut } from 'lucide-react';
import { translations } from '../utils/translations';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

const { navigation, auth } = translations;

export default function MobileNavigation() {
  const [showMore, setShowMore] = useState(false);
  const { logout } = useAuthStore();

  return (
    <>
      {/* Main navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center">
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <Home className="w-6 h-6 mb-1" />
            {navigation.dashboard}
          </NavLink>
          <NavLink
            to="/app/clients"
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <Users className="w-6 h-6 mb-1" />
            {navigation.clients}
          </NavLink>
          <NavLink
            to="/app/properties"
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <Building className="w-6 h-6 mb-1" />
            {navigation.properties}
          </NavLink>
          <NavLink
            to="/app/searches"
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <Search className="w-6 h-6 mb-1" />
            {navigation.searches}
          </NavLink>
          <button
            className="flex flex-col items-center py-2 px-3 text-xs text-gray-500"
            onClick={() => setShowMore(true)}
          >
            <Menu className="w-6 h-6 mb-1" />
            Plus
          </button>
        </div>
      </nav>

      {/* More menu */}
      {showMore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-4">
            <div className="space-y-4">
              <NavLink
                to="/app/tasks"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setShowMore(false)}
              >
                <CheckSquare className="w-5 h-5 mr-3" />
                {navigation.tasks}
              </NavLink>
              <NavLink
                to="/app/documents"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setShowMore(false)}
              >
                <FileText className="w-5 h-5 mr-3" />
                {navigation.documents}
              </NavLink>
              <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setShowMore(false)}
              >
                <Settings className="w-5 h-5 mr-3" />
                {navigation.settings}
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full"
              >
                <LogOut className="w-5 h-5 mr-3" />
                {auth.logout}
              </button>
            </div>

            <button
              className="mt-4 w-full py-3 text-gray-500 border-t border-gray-200"
              onClick={() => setShowMore(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}