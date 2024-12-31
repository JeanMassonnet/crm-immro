import React from 'react';
import { useAuthStore } from '../store/authStore';
import { settingsTranslations as t } from '../translations/settings';
import ProfileSection from '../components/settings/ProfileSection';
import PreferencesSection from '../components/settings/PreferencesSection';
import type { ProfileFormData } from '../types/settings';

export default function Settings() {
  const { user, updateProfile } = useAuthStore();

  const handleProfileSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection
          initialData={user || undefined}
          onSubmit={handleProfileSubmit}
        />
        <PreferencesSection />
      </div>
    </div>
  );
}