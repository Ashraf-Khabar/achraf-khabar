import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github, Star, GitFork, Calendar, Code } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = {
    "flaskosql": {
      title: "FLASKOSQL",
      description: "ORM pour bases de données relationnelles (Oracle et MySQL) avec API Flask. Fournit une manipulation simple des bases de données et un mapping simplifié.",
      longDescription: "FLASKOSQL est un ORM complet qui simplifie l'interaction avec les bases de données Oracle et MySQL dans des applications Flask. Il offre des fonctionnalités avancées de mapping objet-relationnel et une API intuitive pour les opérations CRUD.",
      technologies: ["Python", "Flask", "Oracle", "MySQL", "ORM"],
      githubUrl: "https://github.com/Ashraf-Khabar/FLASKOSQL",
      liveUrl: null,
      stars: 1,
      forks: 1,
      commits: 68,
      lastUpdate: "2024",
      features: [
        "Support Oracle et MySQL",
        "Mapping objet-relationnel automatique",
        "API Flask intégrée",
        "Opérations CRUD simplifiées",
        "Configuration flexible",
        "Documentation complète"
      ],
      category: "Backend / Database"
    },
    "licence-plate-recognition": {
      title: "Licence Plate Recognition",
      description: "Système radar innovant pour la détection et reconnaissance des plaques d'immatriculation. Améliore la sécurité routière et facilite l'identification des véhicules.",
      longDescription: "Projet technologique ambitieux qui combine vision par ordinateur et intelligence artificielle pour créer un système de radar capable de détecter et reconnaître automatiquement les plaques d'immatriculation des véhicules en temps réel.",
      technologies: ["Python", "Flask", "Machine Learning", "AI", "Computer Vision"],
      githubUrl: "https://github.com/Ashraf-Khabar/Licence-plate-recognition",
      liveUrl: null,
      stars: 2,
      forks: 1,
      commits: 45,
      lastUpdate: "2024",
      features: [
        "Détection automatique des plaques",
        "Reconnaissance OCR avancée",
        "Traitement en temps réel",
        "Interface utilisateur intuitive",
        "Logging et historique",
        "Haute précision de reconnaissance"
      ],
      category: "Computer Vision / AI"
    },
    "studentgrademanager": {
      title: "Student Grade Manager",
      description: "Application web complète pour la gestion des notes étudiantes par modules, matières et enseignants. Construite avec Laravel et Oracle DB.",
      longDescription: "Système complet de gestion académique permettant aux enseignants de visualiser les notes de leurs étudiants, aux étudiants de consulter leurs résultats organisés par matières, et aux administrateurs de gérer l'application.",
      technologies: ["Laravel", "PHP", "Oracle DB", "Bootstrap", "JavaScript"],
      githubUrl: "https://github.com/Ashraf-Khabar/StudentGradeManager",
      liveUrl: null,
      stars: 1,
      forks: 0,
      commits: 32,
      lastUpdate: "2024",
      features: [
        "Gestion multi-rôles (Admin, Enseignant, Étudiant)",
        "Interface intuitive par matière",
        "Statistiques et rapports",
        "Système d'authentification sécurisé",
        "Base de données Oracle optimisée",
        "Design responsive"
      ],
      category: "Web Application"
    },
    "data-science-docs": {
      title: "Data Science Documentation Hub",
      description: "Collection complète de documents, CV et livres sur la science des données. Couvre ML, data mining, warehousing, et business intelligence.",
      longDescription: "Repository exhaustif rassemblant une vaste collection de ressources éducatives sur la science des données, incluant des guides pratiques, des documentations techniques, et des références académiques.",
      technologies: ["Data Science", "Machine Learning", "Python", "R", "Documentation"],
      githubUrl: "https://github.com/Ashraf-Khabar/Data-Science-Docs",
      liveUrl: null,
      stars: 2,
      forks: 1,
      commits: 28,
      lastUpdate: "2024",
      features: [
        "Guides d'apprentissage automatique",
        "Documentation d'exploration de données",
        "Ressources d'entreposage de données",
        "Guides d'intelligence d'affaires",
        "Exemples pratiques et cas d'usage",
        "Ressources académiques et professionnelles"
      ],
      category: "Documentation / Education"
    },
    "test-automation-lab": {
      title: "Test Automation Lab",
      description: "Laboratoire d'automatisation des tests utilisant Selenium et autres frameworks de test. Fournit une solution complète pour l'automatisation des tests web et API.",
      longDescription: "Projet complet dédié à l'automatisation des tests avec des frameworks modernes. Inclut des exemples pratiques, des templates et des bonnes pratiques pour l'automatisation des tests web et API.",
      technologies: ["HTML", "Selenium", "JavaScript", "Test Automation", "QA"],
      githubUrl: "https://github.com/Ashraf-Khabar/Test-Automation-Lab",
      liveUrl: null,
      stars: 0,
      forks: 0,
      commits: 25,
      lastUpdate: "2024",
      features: [
        "Framework Selenium intégré",
        "Tests automatisés web et API",
        "Rapports de tests détaillés",
        "Templates réutilisables",
        "Bonnes pratiques QA",
        "Configuration CI/CD"
      ],
      category: "Test Automation / QA"
    },
    "smartspender": {
      title: "SmartSpender",
      description: "Application web de gestion financière intelligente pour aider les utilisateurs à gérer et organiser leur argent. Inclut des fonctionnalités de suivi de budget et de prévention des problèmes financiers.",
      longDescription: "Application complète de gestion financière personnelle avec des fonctionnalités avancées de suivi budgétaire, analyse des dépenses et recommandations intelligentes pour optimiser les finances personnelles.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
      githubUrl: "https://github.com/Ashraf-Khabar/SmartSpender",
      liveUrl: null,
      stars: 0,
      forks: 1,
      commits: 42,
      lastUpdate: "2024",
      features: [
        "Suivi des dépenses en temps réel",
        "Budgets personnalisables",
        "Analyses et rapports financiers",
        "Alertes de dépassement",
        "Catégorisation automatique",
        "Interface utilisateur moderne"
      ],
      category: "Web Application / FinTech"
    },
    "portfolio": {
      title: "Portfolio Web",
      description: "Mon site web personnel construit avec React.js pour présenter tous mes projets et documents. Interface moderne et responsive pour simplifier l'accès à mes réalisations.",
      longDescription: "Portfolio personnel développé avec React et les dernières technologies web. Présente une interface moderne et responsive pour mettre en valeur mes projets, compétences et réalisations professionnelles.",
      technologies: ["React", "JavaScript", "HTML", "CSS", "Git"],
      githubUrl: "https://github.com/Ashraf-Khabar/Portfolio",
      liveUrl: "https://achrafkhabar.com",
      stars: 0,
      forks: 0,
      commits: 15,
      lastUpdate: "2024",
      features: [
        "Design responsive moderne",
        "Présentation interactive des projets",
        "Section blog intégrée",
        "Contact et CV téléchargeable",
        "Performance optimisée",
        "SEO friendly"
      ],
      category: "Web Development"
    },
    "blogosss": {
      title: "Blogosss",
      description: "Plateforme de blog moderne développée pour la création et gestion de contenu. Interface utilisateur intuitive avec système de commentaires et gestion d'articles.",
      longDescription: "Application de blogging complète avec un système de gestion de contenu moderne, permettant la création, édition et publication d'articles avec une interface utilisateur soignée.",
      technologies: ["Web Development", "Content Management", "Blog"],
      githubUrl: "https://github.com/Ashraf-Khabar/Blogosss",
      liveUrl: null,
      stars: 0,
      forks: 0,
      commits: 20,
      lastUpdate: "2024",
      features: [
        "Éditeur de contenu riche",
        "Système de commentaires",
        "Gestion des catégories",
        "Interface d'administration",
        "Responsive design",
        "SEO optimisé"
      ],
      category: "Web Development / CMS"
    },
    "funcplot-plottingfunctionsmadeeasy": {
      title: "FuncPlot - Plotting Functions Made Easy",
      description: "Application conviviale construite avec Kivy et KivyMD qui permet de tracer et visualiser facilement des fonctions mathématiques sur desktop ou mobile.",
      longDescription: "Application mobile et desktop pour la visualisation de fonctions mathématiques avec une interface intuitive. Supporte de multiples fonctions et aide à explorer des concepts mathématiques complexes.",
      technologies: ["Python", "Kivy", "KivyMD", "Mathematics", "Visualization"],
      githubUrl: "https://github.com/Ashraf-Khabar/FuncPlot-PlottingFunctionsMadeEasy",
      liveUrl: null,
      stars: 1,
      forks: 0,
      commits: 30,
      lastUpdate: "2024",
      features: [
        "Tracé de fonctions mathématiques",
        "Interface utilisateur intuitive",
        "Support mobile et desktop",
        "Zoom et navigation interactive",
        "Export des graphiques",
        "Fonctions multiples simultanées"
      ],
      category: "Mobile / Desktop Application"
    },
    "ensat_internship": {
      title: "ENSAT Internship",
      description: "Projet développé dans le cadre d'un stage à l'ENSAT. Comprend des travaux de recherche et développement dans le domaine technique.",
      longDescription: "Projet académique et professionnel réalisé durant un stage à l'École Nationale des Sciences Appliquées de Tanger (ENSAT), incluant des recherches et développements techniques.",
      technologies: ["Research", "Development", "Academic"],
      githubUrl: "https://github.com/Ashraf-Khabar/ENSAT_Internship",
      liveUrl: null,
      stars: 0,
      forks: 0,
      commits: 18,
      lastUpdate: "2024",
      features: [
        "Recherche académique",
        "Développement technique",
        "Documentation complète",
        "Méthodologie scientifique",
        "Analyse de données",
        "Rapport de stage"
      ],
      category: "Academic / Research"
    }
  };

  const project = projects[id as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Projet non trouvé</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="glass-card mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Retour aux projets
        </Button>

        {/* Project Header */}
        <Card className="glass-card p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">{project.title}</h1>
                  <Badge variant="secondary" className="mt-2">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="glass-card">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>{project.stars} stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4" />
                  <span>{project.forks} forks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>{project.commits} commits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Mis à jour en {project.lastUpdate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:min-w-[200px]">
              <Button 
                className="glow-border"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Voir sur GitHub
              </Button>
              {project.liveUrl && (
                <Button 
                  variant="outline" 
                  className="glass-card"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Démo en ligne
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Description */}
          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold mb-4 gradient-text">
              Description détaillée
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {project.longDescription}
            </p>
          </Card>

          {/* Features */}
          <Card className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-xl font-semibold mb-4 gradient-text">
              Fonctionnalités principales
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="glass-card p-8 mt-8 text-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-2xl font-semibold gradient-text mb-4">
            Intéressé par ce projet ?
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            N'hésitez pas à consulter le code source sur GitHub ou à me contacter 
            pour discuter de ce projet ou d'une collaboration similaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="glow-border"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              Explorer le code
            </Button>
            <Button 
              variant="outline" 
              className="glass-card"
              onClick={() => navigate("/#contact")}
            >
              Me contacter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;