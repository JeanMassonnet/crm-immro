import React, { useEffect, useRef } from 'react';
import { X, Plus, Upload, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { DocumentTemplate } from '../../types';
import { translations } from '../../utils/translations';
import { processLogo } from '../../utils/imageUtils';

const { documents: t, common } = translations;

type TemplateFormData = {
  name: string;
  content: string;
  type: DocumentTemplate['type'];
  logo?: string;
};

type TemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  template?: DocumentTemplate;
  onSubmit: (data: TemplateFormData) => void;
};

const availableVariables = [
  { key: 'client.firstName', label: 'Prénom du client' },
  { key: 'client.lastName', label: 'Nom du client' },
  { key: 'client.email', label: 'Email du client' },
  { key: 'client.phone', label: 'Téléphone du client' },
  { key: 'property.title', label: 'Titre du bien' },
  { key: 'property.location', label: 'Emplacement du bien' },
  { key: 'property.price', label: 'Prix du bien' },
  { key: 'property.size', label: 'Surface du bien' },
  { key: 'date', label: 'Date du jour' },
];

export default function TemplateModal({ isOpen, onClose, template, onSubmit }: TemplateModalProps) {
  const { register, handleSubmit, setValue, watch, getValues } = useForm<TemplateFormData>();
  const content = watch('content', '');
  const logo = watch('logo');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (template) {
      setValue('name', template.name);
      setValue('content', template.content);
      setValue('type', template.type);
      setValue('logo', template.logo);
    } else {
      setValue('name', '');
      setValue('content', '');
      setValue('type', 'custom');
      setValue('logo', undefined);
    }
  }, [template, setValue]);

  if (!isOpen) return null;

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      const logoUrl = await processLogo(e.target.files[0]);
      setValue('logo', logoUrl);
    } catch (error) {
      console.error('Error processing logo:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const insertVariable = (variable: string) => {
    const textArea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const currentContent = content;
    const newContent = 
      currentContent.substring(0, start) +
      `{{${variable}}}` +
      currentContent.substring(end);

    setValue('content', newContent);
    
    setTimeout(() => {
      textArea.focus();
      const newPosition = start + variable.length + 4;
      textArea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleSave = () => {
    const currentValues = getValues();
    onSubmit(currentValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {template ? t.editTemplate : t.addTemplate}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue-500 border-dashed cursor-pointer hover:bg-blue-50">
                  <Upload className="w-8 h-8 text-blue-500" />
                  <span className="mt-2 text-base text-blue-500">Sélectionner un logo</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
              {logo && (
                <div className="w-32">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.templateName}
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.templateType}
            </label>
            <select
              {...register('type')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="visit">{t.visitForm}</option>
              <option value="offer">{t.offerForm}</option>
              <option value="custom">{t.customForm}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variables disponibles
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {availableVariables.map((variable) => (
                <button
                  key={variable.key}
                  type="button"
                  onClick={() => insertVariable(variable.key)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {variable.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.templateContent}
            </label>
            <textarea
              {...register('content', { required: true })}
              rows={12}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 font-mono"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {common.cancel}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {common.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}