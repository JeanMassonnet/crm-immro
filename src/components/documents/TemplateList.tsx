import React from 'react';
import { FileText } from 'lucide-react';
import { DocumentTemplate } from '../../types';
import { documentTranslations as t } from '../../translations/documents';

type TemplateListProps = {
  templates: DocumentTemplate[];
  onEditTemplate: (template: DocumentTemplate) => void;
};

export default function TemplateList({ templates, onEditTemplate }: TemplateListProps) {
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onEditTemplate(template)}
          className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          <FileText className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">{template.name}</p>
            <p className="text-sm text-gray-500">{t[template.type + 'Form']}</p>
          </div>
        </div>
      ))}
      {templates.length === 0 && (
        <p className="text-center text-gray-500 py-4">{t.noTemplates}</p>
      )}
    </div>
  );
}