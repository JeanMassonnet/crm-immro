import React from 'react';
import { X } from 'lucide-react';
import { DocumentPreview } from '../../types';
import PDFDocument from '../PDFDocument';
import { PDFViewer } from '@react-pdf/renderer';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  preview: DocumentPreview;
  onSave: () => void;
  onContentChange: (content: string) => void;
};

export default function PreviewModal({ isOpen, onClose, preview, onSave, onContentChange }: PreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Aperçu du document</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu
            </label>
            <textarea
              value={preview.content}
              onChange={(e) => onContentChange(e.target.value)}
              rows={30}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 font-mono"
            />
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[842px]">
              <PDFViewer width="100%" height="100%">
                <PDFDocument content={preview.content} logo={preview.logo} />
              </PDFViewer>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Valider et enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}