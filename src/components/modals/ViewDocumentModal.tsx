import React from 'react';
import { X, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GeneratedDocument } from '../../types';
import PDFDocument from '../PDFDocument';

type ViewDocumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  document: GeneratedDocument;
};

export default function ViewDocumentModal({ isOpen, onClose, document }: ViewDocumentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Aperçu du document</h2>
            <PDFDownloadLink
              document={<PDFDocument content={document.content} logo={document.logo} />}
              fileName="document.pdf"
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger le PDF
            </PDFDownloadLink>
          </div>
          
          <div className="border rounded-lg p-8 bg-white shadow-inner min-h-[842px] w-[595px] mx-auto">
            <div className="space-y-6">
              {document.logo && (
                <img
                  src={document.logo}
                  alt="Logo"
                  className="h-16 object-contain"
                />
              )}
              
              <div className="text-right">
                {new Date().toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              
              <div className="prose max-w-none whitespace-pre-wrap">
                {document.content}
              </div>
              
              <div className="mt-12">
                <p>Signature :</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}