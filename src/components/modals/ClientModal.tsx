import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Client, ClientTypes, LeadSource } from '../../types';
import { useClientStore } from '../../store/clientStore';
import { translations } from '../../utils/translations';

const { clients: t, common, leadSources } = translations;

type ClientFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  types: ClientTypes;
  leadSource: LeadSource;
  notes?: string;
};

type ClientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  client?: Client;
};

export default function ClientModal({ isOpen, onClose, client }: ClientModalProps) {
  const { register, handleSubmit, reset, watch } = useForm<ClientFormData>();
  const addClient = useClientStore((state) => state.addClient);
  const updateClient = useClientStore((state) => state.updateClient);

  useEffect(() => {
    if (client) {
      reset({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        types: client.types,
        leadSource: client.leadSource,
        notes: client.notes,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        types: { buyer: false, seller: false },
        leadSource: 'referral',
        notes: '',
      });
    }
  }, [client, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: ClientFormData) => {
    if (client) {
      updateClient(client.id, data);
    } else {
      addClient(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {client ? t.editClient : t.addClient}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.firstName}
              </label>
              <input
                {...register('firstName', { required: true })}
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.lastName}
              </label>
              <input
                {...register('lastName', { required: true })}
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {common.email}
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {common.phone}
            </label>
            <input
              {...register('phone', { required: true })}
              type="tel"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.type}
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('types.buyer')}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2">{t.buyer}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('types.seller')}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2">{t.seller}</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.leadSource}
            </label>
            <select
              {...register('leadSource', { required: true })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            >
              {Object.entries(leadSources).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {common.notes}
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {common.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {client ? common.update : common.add}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}