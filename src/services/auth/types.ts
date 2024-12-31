import type { User } from '../../types';

export type AuthUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type FirebaseAuthError = {
  code: string;
  message: string;
};