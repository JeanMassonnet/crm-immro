import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText, CheckSquare, BarChart3, Shield, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Gestion immobilière intelligente',
    description: 'Une solution intuitive pour gérer votre portefeuille immobilier avec excellence et professionnalisme.',
  },
  {
    icon: Users,
    title: 'Relations clients privilégiées',
    description: 'Offrez une expérience personnalisée à chacun de vos clients grâce à notre système de suivi avancé.',
  },
  {
    icon: FileText,
    title: 'Documents sur mesure',
    description: 'Générez des documents professionnels personnalisés en quelques clics avec nos modèles élégants.',
  },
  {
    icon: CheckSquare,
    title: 'Organisation optimisée',
    description: 'Planifiez et suivez vos tâches efficacement pour une gestion du temps optimale.',
  },
  {
    icon: BarChart3,
    title: 'Analyses stratégiques',
    description: 'Prenez des décisions éclairées grâce à nos tableaux de bord et rapports détaillés.',
  },
  {
    icon: Shield,
    title: 'Sécurité renforcée',
    description: 'Vos données sont protégées par les technologies de sécurité les plus avancées.',
  },
];

const testimonials = [
  {
    name: 'Sophie Laurent',
    role: 'Directrice d\'agence premium',
    content: 'Un outil indispensable qui a révolutionné notre approche du luxe immobilier. La qualité des documents générés impressionne nos clients les plus exigeants.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    name: 'Alexandre Dubois',
    role: 'Agent immobilier spécialisé',
    content: 'La solution parfaite pour les professionnels qui visent l\'excellence. L\'interface élégante et les fonctionnalités avancées en font un outil de choix.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90" />
        <div 
          className="relative min-h-screen flex items-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          
          <nav className="absolute top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Building2 className="w-10 h-10 text-white" />
                  <span className="ml-3 text-2xl font-bold text-white">CRM Immobilier</span>
                </div>
                <div>
                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-lg bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    Connexion
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                L'excellence immobilière à portée de main
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
                Découvrez une solution CRM premium conçue pour les professionnels 
                de l'immobilier qui visent l'excellence.
              </p>
              <Link
                to="/login?register=true"
                className="group inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Créer un compte
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Une suite complète d'outils premium
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment notre CRM peut transformer votre activité immobilière
              et vous permettre d'atteindre de nouveaux sommets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.1)] hover:shadow-[0_0_50px_0_rgba(0,0,0,0.15)] transition-shadow duration-500"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-20">
            L'excellence reconnue par nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-10 rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-center mb-8">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/10"
                  />
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à transformer votre activité ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Rejoignez les professionnels de l'immobilier qui ont choisi l'excellence
            et la performance.
          </p>
          <Link
            to="/login?register=true"
            className="group inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Créer un compte
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8" />
                <span className="ml-3 text-xl font-bold">CRM Immobilier</span>
              </div>
              <p className="text-gray-400 max-w-md">
                La solution CRM premium pour les professionnels de l'immobilier
                qui visent l'excellence et la performance.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Liens rapides</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link to="/login" className="hover:text-white transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li>contact@crm-immobilier.fr</li>
                <li>01 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CRM Immobilier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}