import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { useClientStore } from '../store/clientStore';
import { usePropertyStore } from '../store/propertyStore';
import { documentTranslations as t } from '../translations/documents';
import TemplateModal from '../components/modals/TemplateModal';
import PreviewModal from '../components/modals/PreviewModal';
import ViewDocumentModal from '../components/modals/ViewDocumentModal';
import TemplateList from '../components/documents/TemplateList';
import DocumentGenerator from '../components/documents/DocumentGenerator';
import { DocumentTemplate, DocumentPreview, GeneratedDocument } from '../types';

export default function Documents() {
  const { templates, addTemplate, updateTemplate, generatePreview, saveDocument, generatedDocuments } = useDocumentStore();
  const { clients } = useClientStore();
  const { properties } = usePropertyStore();
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | undefined>();
  
  // Document generation state
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  // Document viewing state
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<GeneratedDocument | null>(null);

  const handleEditTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(undefined);
    setShowTemplateModal(false);
  };

  const handleSubmitTemplate = (data: Omit<DocumentTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.id, data);
    } else {
      addTemplate(data);
    }
    handleCloseModal();
  };

  const handlePreview = () => {
    if (!selectedTemplateId || !selectedClientId || !selectedPropertyId) return;

    const template = templates.find(t => t.id === selectedTemplateId);
    if (!template) return;

    const preview = generatePreview({
      templateId: selectedTemplateId,
      clientId: selectedClientId,
      propertyId: selectedPropertyId,
      content: template.content,
      logo: template.logo,
    });

    setPreviewContent(preview);
    setShowPreviewModal(true);
  };

  const handleSaveDocument = () => {
    saveDocument({
      templateId: selectedTemplateId,
      clientId: selectedClientId,
      propertyId: selectedPropertyId,
      content: previewContent,
      logo: templates.find(t => t.id === selectedTemplateId)?.logo,
    });
    setShowPreviewModal(false);
    setSelectedTemplateId('');
    setSelectedClientId('');
    setSelectedPropertyId('');
    setPreviewContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.title}</h1>
        <button
          onClick={() => setShowTemplateModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t.addTemplate}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t.templates}</h2>
          <TemplateList
            templates={templates}
            onEditTemplate={handleEditTemplate}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{t.generateDocument}</h2>
          <DocumentGenerator
            templates={templates}
            clients={clients}
            properties={properties}
            selectedTemplateId={selectedTemplateId}
            selectedClientId={selectedClientId}
            selectedPropertyId={selectedPropertyId}
            onTemplateChange={setSelectedTemplateId}
            onClientChange={setSelectedClientId}
            onPropertyChange={setSelectedPropertyId}
            onPreview={handlePreview}
          />
        </div>
      </div>

      {/* Modals */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={handleCloseModal}
        template={selectedTemplate}
        onSubmit={handleSubmitTemplate}
      />

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        preview={{
          templateId: selectedTemplateId,
          clientId: selectedClientId,
          propertyId: selectedPropertyId,
          content: previewContent,
          logo: templates.find(t => t.id === selectedTemplateId)?.logo,
        }}
        onSave={handleSaveDocument}
        onContentChange={setPreviewContent}
      />

      {selectedDocument && (
        <ViewDocumentModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedDocument(null);
          }}
          document={selectedDocument}
        />
      )}
    </div>
  );
}