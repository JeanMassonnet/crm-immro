import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Building2 } from 'lucide-react';
import { translations } from '../utils/translations';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const { auth } = translations;

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  companyName: z.string().min(2, "Le nom de l'entreprise est requis"),
  siret: z.string().length(14, 'Le numéro SIRET doit contenir 14 chiffres'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Login() {
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register: registerUser } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('register') === 'true') {
      setIsRegistering(true);
    }
  }, [location]);

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await registerUser(data);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <Building2 className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">
          CRM Immobilier - {isRegistering ? auth.register : auth.login}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isRegistering ? (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {auth.firstName}
                </label>
                <input
                  {...registerForm.register('firstName')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                {registerForm.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {auth.lastName}
                </label>
                <input
                  {...registerForm.register('lastName')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                {registerForm.formState.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.email}
              </label>
              <input
                {...registerForm.register('email')}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {registerForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.phone}
              </label>
              <input
                {...registerForm.register('phone')}
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {registerForm.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {registerForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.companyName}
              </label>
              <input
                {...registerForm.register('companyName')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {registerForm.formState.errors.companyName && (
                <p className="mt-1 text-sm text-red-600">
                  {registerForm.formState.errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.siret}
              </label>
              <input
                {...registerForm.register('siret')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {registerForm.formState.errors.siret && (
                <p className="mt-1 text-sm text-red-600">
                  {registerForm.formState.errors.siret.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.password}
              </label>
              <input
                {...registerForm.register('password')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {registerForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {auth.signUp}
            </button>

            <p className="text-center text-sm text-gray-600">
              {auth.alreadyHaveAccount}{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-primary hover:text-primary-dark"
              >
                {auth.login}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.email}
              </label>
              <input
                {...loginForm.register('email')}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {auth.password}
              </label>
              <input
                {...loginForm.register('password')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {loginForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {auth.signIn}
            </button>

            <p className="text-center text-sm text-gray-600">
              {auth.noAccount}{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-primary hover:text-primary-dark"
              >
                {auth.signUp}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}