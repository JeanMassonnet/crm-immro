import { authTranslations } from '../translations/auth';
import { clientTranslations } from '../translations/clients';
import { commonTranslations } from '../translations/common';
import { documentTranslations } from '../translations/documents';
import { navigationTranslations } from '../translations/navigation';
import { propertyTranslations } from '../translations/properties';
import { settingsTranslations } from '../translations/settings';

export const translations = {
  auth: authTranslations,
  clients: clientTranslations,
  common: commonTranslations,
  documents: documentTranslations,
  navigation: navigationTranslations,
  properties: propertyTranslations,
  settings: settingsTranslations,
  leadSources: {
    referral: 'Recommandation',
    website: 'Site web',
    social_media: 'Réseaux sociaux',
    phone: 'Téléphone',
    email: 'Email',
    other: 'Autre'
  },
  workTypes: {
    new: 'Neuf',
    none: 'Pas de travaux',
    refresh: 'Rafraîchissement',
    major: 'Gros travaux'
  }
};