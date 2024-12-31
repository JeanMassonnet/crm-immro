import { create } from 'zustand';
import { DocumentTemplate, GeneratedDocument, DocumentPreview } from '../types';

interface DocumentState {
  templates: DocumentTemplate[];
  generatedDocuments: GeneratedDocument[];
  addTemplate: (template: Omit<DocumentTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, template: Partial<DocumentTemplate>) => void;
  deleteTemplate: (id: string) => void;
  generatePreview: (preview: DocumentPreview) => string;
  saveDocument: (document: Omit<GeneratedDocument, 'id' | 'createdAt'>) => void;
}

const defaultTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Bon de visite',
    content: `Objet : Bon de visite pour la propriété située à {{property.location}}

Cher(e) {{client.firstName}} {{client.lastName}},

Suite à votre demande, nous confirmons par la présente votre visite pour la propriété suivante :
	•	Titre de la propriété : {{property.title}}
	•	Adresse : {{property.location}}
	•	Prix demandé : {{property.price}}
	•	Surface : {{property.size}} m²

Conditions liées à la visite :
En signant ce document, vous reconnaissez que :
	1.	La visite de la propriété est réalisée par l'intermédiaire de notre agence.
	2.	Vous vous engagez à ne pas contacter directement le propriétaire pour des transactions sans notre intervention.
	3.	Toute négociation ou offre devra être effectuée via notre agence.

Nous vous remercions de bien vouloir apposer votre signature pour confirmer votre visite et votre compréhension des conditions ci-dessus.`,
    type: 'visit',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useDocumentStore = create<DocumentState>((set, get) => ({
  templates: defaultTemplates,
  generatedDocuments: [],
  
  addTemplate: (templateData) => {
    set((state) => ({
      templates: [
        ...state.templates,
        {
          ...templateData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));
  },

  updateTemplate: (id, templateData) => {
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? { ...template, ...templateData, updatedAt: new Date() }
          : template
      ),
    }));
  },

  deleteTemplate: (id) => {
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    }));
  },

  generatePreview: ({ templateId, clientId, propertyId, content }) => {
    const template = get().templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }
    return content;
  },

  saveDocument: (documentData) => {
    const newDocument: GeneratedDocument = {
      ...documentData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    set((state) => ({
      generatedDocuments: [...state.generatedDocuments, newDocument],
    }));
  },
}));