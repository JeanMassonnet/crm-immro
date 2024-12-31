import React, { useState } from 'react';
import { Upload, FileText, Download, Eye } from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';
import { useDocumentStore } from '../store/documentStore';
import ViewDocumentModal from './modals/ViewDocumentModal';

type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

const energyClasses: EnergyClass[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const classColors: Record<EnergyClass, string> = {
  A: 'bg-green-500',
  B: 'bg-green-400',
  C: 'bg-yellow-400',
  D: 'bg-yellow-500',
  E: 'bg-orange-500',
  F: 'bg-red-500',
  G: 'bg-red-600',
};

type PropertyDocumentsProps = {
  propertyId: string;
};

export default function PropertyDocuments({ propertyId }: PropertyDocumentsProps) {
  const [energyClass, setEnergyClass] = useState<EnergyClass>('D');
  const [dpeFile, setDpeFile] = useState<File | null>(null);
  const [georisqueFile, setGeorisqueFile] = useState<File | null>(null);
  const { generatedDocuments } = useDocumentStore();
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const propertyDocuments = generatedDocuments.filter(doc => doc.propertyId === propertyId);

  const handleDPEUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDpeFile(e.target.files[0]);
    }
  };

  const handleGeorisqueUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGeorisqueFile(e.target.files[0]);
    }
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-8">
      {/* DPE Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">DPE</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Classe énergétique
            </label>
            <div className="flex space-x-2">
              {energyClasses.map((classLabel) => (
                <button
                  key={classLabel}
                  onClick={() => setEnergyClass(classLabel)}
                  className={`w-12 h-12 rounded-lg font-bold text-white transition-transform ${
                    classColors[classLabel]
                  } ${
                    energyClass === classLabel ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                  }`}
                >
                  {classLabel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rapport DPE
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Upload className="w-5 h-5" />
                    <span>{dpeFile ? dpeFile.name : 'Importer le rapport DPE'}</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleDPEUpload}
                  />
                </div>
              </label>
              {dpeFile && (
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Georisque Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Géorisque</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rapport Géorisque
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex-1">
              <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Upload className="w-5 h-5" />
                  <span>{georisqueFile ? georisqueFile.name : 'Importer le rapport Géorisque'}</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleGeorisqueUpload}
                />
              </div>
            </label>
            {georisqueFile && (
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Download className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Generated Documents Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Documents générés</h3>
        <div className="space-y-4">
          {propertyDocuments.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">
                    Document du {document.createdAt.toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDocument(document)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Voir le document"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Télécharger"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {propertyDocuments.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Aucun document disponible
            </p>
          )}
        </div>
      </div>

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