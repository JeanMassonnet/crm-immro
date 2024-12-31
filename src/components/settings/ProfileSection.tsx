import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';
import { settingsTranslations as t } from '../../translations/settings';
import type { ProfileFormData } from '../../types/settings';

type ProfileSectionProps = {
  initialData?: ProfileFormData;
  onSubmit: (data: ProfileFormData) => void;
};

export default function ProfileSection({ initialData, onSubmit }: ProfileSectionProps) {
  const { register, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: initialData,
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <User className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold">{t.profile.title}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t.profile.firstName}
            </label>
            <input
              {...register('firstName')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t.profile.lastName}
            </label>
            <input
              {...register('lastName')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.profile.phone}
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">{t.profile.address}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.profile.street}
              </label>
              <input
                {...register('address.street')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.profile.streetNumber}
              </label>
              <input
                {...register('address.streetNumber')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t.profile.additionalInfo}
            </label>
            <input
              {...register('address.additionalInfo')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.profile.zipCode}
              </label>
              <input
                {...register('address.zipCode')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.profile.city}
              </label>
              <input
                {...register('address.city')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t.profile.country}
            </label>
            <input
              {...register('address.country')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {t.profile.saveChanges}
          </button>
        </div>
      </form>
    </div>
  );
}