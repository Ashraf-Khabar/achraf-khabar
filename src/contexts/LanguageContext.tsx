import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hello, I\'m',
    'hero.title': 'DevOps/SRE & QA Automation Engineer',
    'hero.description': 'Currently employed as a Test Automation Engineer with responsibilities including ensuring solution reliability, guaranteeing continuous integration and deployment (CI/CD) in production.',
    'hero.cta.contact': 'Contact Me',
    'hero.cta.projects': 'View Projects',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'DevOps/SRE & QA Automation Engineer passionate about reliability and automation',
    'about.journey': 'My Journey',
    'about.description1': 'Test Automation Engineer currently employed, with responsibilities including ensuring solution reliability, guaranteeing continuous integration and deployment (CI/CD) in production.',
    'about.description2': 'I develop automation scripts using Python and the Selenium library, with a strong interest in DevOps and software architecture.',
    'about.skills': 'Mastered Technologies',
    'about.services': 'What I Offer',
    'about.service.automation.title': 'Test Automation',
    'about.service.automation.desc': 'Automation test scripts with Python and Selenium to ensure quality',
    'about.service.devops.title': 'DevOps & SRE',
    'about.service.devops.desc': 'Continuous integration and deployment (CI/CD) for reliable deliveries',
    'about.service.database.title': 'Databases',
    'about.service.database.desc': 'Oracle DB and MySQL expertise with custom ORM development',
    'about.service.architecture.title': 'System Architecture',
    'about.service.architecture.desc': 'Designing robust architectures and maintaining production standards',
    
    // Hero
    'hero.welcome': 'Welcome to my portfolio',
    
    // Contact
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Have a project, a question, or just want to chat? Feel free to contact me!',
    'contact.form.title': 'Send me a message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.phone': 'Phone',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.info.title': 'Contact Information',
    'contact.info.location': 'Location',
    'contact.social.title': 'Find me on',
    'contact.availability.title': 'Availability',
    'contact.availability.status': 'Currently under contract but open to discussions',
    'contact.availability.freelance': 'Available for freelance',
    'contact.response.title': 'Response Time',
    'contact.response.desc': 'I usually respond within 24 hours to messages received Monday to Friday.',
    
    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Manage your blog posts and profile',
    'admin.profile.title': 'Profile Settings',
    'admin.profile.availability': 'Availability Status',
    'admin.profile.details': 'Availability Details',
    'admin.profile.phone': 'Phone',
    'admin.profile.location': 'Location',
    'admin.profile.bio': 'Bio',
    'admin.profile.github': 'GitHub URL',
    'admin.profile.linkedin': 'LinkedIn URL',
    'admin.profile.twitter': 'Twitter URL',
    'admin.profile.save': 'Save Profile',
    'admin.blog.title': 'Blog Posts',
    'admin.blog.new': 'New Article',
    'admin.availability.available': 'Available',
    'admin.availability.busy': 'Busy',
    'admin.availability.freelance': 'Available for Freelance',
    'admin.availability.cdi': 'Looking for CDI',
    'admin.availability.portage': 'Available for Portage',
    'admin.availability.contract': 'Under Contract - Open to Discussions',
    
    // Toast messages
    'toast.success': 'Success',
    'toast.error': 'Error',
    'toast.message.sent': 'Message sent!',
    'toast.message.sent.desc': 'I will reply to you as soon as possible.',
    'toast.message.error': 'Unable to send message. Please try again.',
    'toast.profile.saved': 'Profile updated successfully',
    'toast.signin.success': 'Login successful',
    'toast.signin.success.desc': 'Welcome to the admin interface!',
    'toast.signin.error': 'Login error',
    'toast.signout': 'Logged out',
    'toast.signout.desc': 'See you soon!',
  },
  fr: {
    // Header
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Salut, je suis',
    'hero.title': 'DevOps/SRE & Ingénieur QA Automation',
    'hero.description': 'Ingénieur Test Automation actuellement en poste, avec des responsabilités incluant l\'assurance de la fiabilité des solutions, la garantie de l\'intégration et du déploiement continus (CI/CD) en production.',
    'hero.cta.contact': 'Me Contacter',
    'hero.cta.projects': 'Voir les Projets',
    
    // About
    'about.title': 'À propos de moi',
    'about.subtitle': 'DevOps/SRE & QA Automation Engineer passionné par la fiabilité et l\'automatisation',
    'about.journey': 'Mon Parcours',
    'about.description1': 'Ingénieur Test Automation actuellement en poste, avec des responsabilités incluant l\'assurance de la fiabilité des solutions, la garantie de l\'intégration et du déploiement continus (CI/CD) en production.',
    'about.description2': 'Je développe des scripts d\'automatisation en utilisant Python et la bibliothèque Selenium, avec un fort intérêt pour le DevOps et l\'architecture logicielle.',
    'about.skills': 'Technologies Maîtrisées',
    'about.services': 'Ce que je propose',
    'about.service.automation.title': 'Test Automation',
    'about.service.automation.desc': 'Scripts d\'automatisation des tests avec Python et Selenium pour garantir la qualité',
    'about.service.devops.title': 'DevOps & SRE',
    'about.service.devops.desc': 'Intégration et déploiement continus (CI/CD) pour des livraisons fiables',
    'about.service.database.title': 'Bases de Données',
    'about.service.database.desc': 'Expertise Oracle DB et MySQL avec développement d\'ORM personnalisés',
    'about.service.architecture.title': 'Architecture Système',
    'about.service.architecture.desc': 'Conception d\'architectures robustes et maintien des standards de production',
    
    // Hero
    'hero.welcome': 'Bienvenue sur mon portfolio',
    
    // Contact
    'contact.title': 'Contactez-moi',
    'contact.subtitle': 'Vous avez un projet, une question ou simplement envie de discuter ? N\'hésitez pas à me contacter !',
    'contact.form.title': 'Envoyez-moi un message',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Décrivez votre projet ou votre demande...',
    'contact.form.phone': 'Téléphone',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.info.title': 'Informations de contact',
    'contact.info.location': 'Localisation',
    'contact.social.title': 'Retrouvez-moi sur',
    'contact.availability.title': 'Disponibilité',
    'contact.availability.status': 'Actuellement en contrat mais ouvert aux discussions',
    'contact.availability.freelance': 'Disponible pour freelance',
    'contact.response.title': 'Temps de réponse',
    'contact.response.desc': 'Je réponds généralement sous 24 heures aux messages reçus du lundi au vendredi.',
    
    // Admin
    'admin.title': 'Dashboard Admin',
    'admin.subtitle': 'Gérez vos articles de blog et votre profil',
    'admin.profile.title': 'Paramètres du Profil',
    'admin.profile.availability': 'Statut de Disponibilité',
    'admin.profile.details': 'Détails de Disponibilité',
    'admin.profile.phone': 'Téléphone',
    'admin.profile.location': 'Localisation',
    'admin.profile.bio': 'Bio',
    'admin.profile.github': 'URL GitHub',
    'admin.profile.linkedin': 'URL LinkedIn',
    'admin.profile.twitter': 'URL Twitter',
    'admin.profile.save': 'Sauvegarder le Profil',
    'admin.blog.title': 'Articles de Blog',
    'admin.blog.new': 'Nouvel Article',
    'admin.availability.available': 'Disponible',
    'admin.availability.busy': 'Occupé',
    'admin.availability.freelance': 'Disponible pour Freelance',
    'admin.availability.cdi': 'Recherche CDI',
    'admin.availability.portage': 'Disponible pour Portage',
    'admin.availability.contract': 'En Contrat - Ouvert aux Discussions',
    
    // Toast messages
    'toast.success': 'Succès',
    'toast.error': 'Erreur',
    'toast.message.sent': 'Message envoyé !',
    'toast.message.sent.desc': 'Je vous répondrai dans les plus brefs délais.',
    'toast.message.error': 'Impossible d\'envoyer le message. Veuillez réessayer.',
    'toast.profile.saved': 'Profil mis à jour avec succès',
    'toast.signin.success': 'Connexion réussie',
    'toast.signin.success.desc': 'Bienvenue dans l\'interface d\'administration !',
    'toast.signin.error': 'Erreur de connexion',
    'toast.signout': 'Déconnexion',
    'toast.signout.desc': 'À bientôt !',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};