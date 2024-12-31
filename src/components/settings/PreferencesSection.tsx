import React from 'react';
import { Bell, Lock, Monitor, Moon, Sun } from 'lucide-react';
import { settingsTranslations as t } from '../../translations/settings';

export default function PreferencesSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">{t.notifications.title}</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary focus:ring-primary"
              defaultChecked
            />
            <span className="ml-2">{t.notifications.email}</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary focus:ring-primary"
              defaultChecked
            />
            <span className="ml-2">{t.notifications.push}</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Lock className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">{t.security.title}</h2>
        </div>
        <div className="space-y-4">
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            {t.security.changePassword}
          </button>
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            {t.security.enable2FA}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Monitor className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">{t.appearance.title}</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.appearance.theme}
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  className="mr-3"
                  defaultChecked
                />
                <Sun className="w-5 h-5 mr-2" />
                <span>{t.appearance.lightMode}</span>
              </label>
              <label className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  className="mr-3"
                />
                <Moon className="w-5 h-5 mr-2" />
                <span>{t.appearance.darkMode}</span>
              </label>
              <label className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  className="mr-3"
                />
                <Monitor className="w-5 h-5 mr-2" />
                <span>{t.appearance.systemMode}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}