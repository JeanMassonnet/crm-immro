// Map Firebase auth error codes to user-friendly messages in French
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Email ou mot de passe incorrect',
  'auth/user-not-found': 'Aucun compte trouvé avec cet email',
  'auth/wrong-password': 'Mot de passe incorrect',
  'auth/email-already-in-use': 'Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser une autre adresse email.',
  'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères',
  'auth/invalid-email': 'Format d\'email invalide',
  'auth/network-request-failed': 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  'auth/too-many-requests': 'Trop de tentatives. Veuillez réessayer plus tard.',
  'auth/operation-not-allowed': 'Cette opération n\'est pas autorisée.',
  'default': 'Une erreur inattendue est survenue. Veuillez réessayer.'
};

export function getAuthErrorMessage(error: any): string {
  if (error?.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code];
  }
  
  if (error?.message?.includes('INVALID_LOGIN_CREDENTIALS')) {
    return AUTH_ERROR_MESSAGES['auth/invalid-credential'];
  }
  
  return error?.message || AUTH_ERROR_MESSAGES.default;
}