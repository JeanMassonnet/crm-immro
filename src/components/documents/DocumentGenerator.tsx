import React from 'react';
import { DocumentTemplate, Client, Property } from '../../types';
import { documentTranslations as t } from '../../translations/documents';

type DocumentGeneratorProps = {
  templates: DocumentTemplate[];
  clients: Client[];
  properties: Property[];
  selectedTemplateId: string;
  selectedClientId: string;
  selectedPropertyId: string;
  onTemplateChange: (id: string) => void;
  onClientChange: (id: string) => void;
  onPropertyChange: (id: string) => void;
  onPreview: () => void;
};

export default function DocumentGenerator({
  templates,
  clients,
  properties,
  selectedTemplateId,
  selectedClientId,
  selectedPropertyId,
  onTemplateChange,
  onClientChange,
  onPropertyChange,
  onPreview,
}: DocumentGeneratorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.templateType}
        </label>
        <select
          value={selectedTemplateId}
          onChange={(e) => onTemplateChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">{t.selectTemplate}</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.selectClient}
        </label>
        <select
          value={selectedClientId}
          onChange={(e) => onClientChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">{t.selectClient}</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstName} {client.lastName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.selectProperty}
        </label>
        <select
          value={selectedPropertyId}
          onChange={(e) => onPropertyChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">{t.selectProperty}</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onPreview}
        disabled={!selectedTemplateId || !selectedClientId || !selectedPropertyId}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t.preview}
      </button>
    </div>
  );
}