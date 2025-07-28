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
      description: "ORM pour bases de données relationnelles (Oracle et MySQL) avec API Flask. Fournit une manipulation simple des bases de données et un mapping simplifié pour faciliter l'interaction avec les bases de données relationnelles.",
      longDescription: "FLASKOSQL est un ORM complet qui simplifie l'interaction avec les bases de données Oracle et MySQL dans des applications Flask. Il offre des fonctionnalités avancées de mapping objet-relationnel et une API intuitive pour les opérations CRUD.",
      technologies: ["Python", "Flask", "Oracle", "MySQL", "ORM"],
      githubUrl: "https://github.com/Ashraf-Khabar/FLASKOSQL",
      liveUrl: "https://achrafkhabar.com/flaskoSQL",
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
      title: "Vehicle License Plate Recognition Radar",
      description: "Système radar innovant pour la détection et reconnaissance des plaques d'immatriculation de véhicules. Améliore la sécurité routière et facilite l'identification des véhicules dans le trafic.",
      longDescription: "Projet technologique ambitieux qui combine vision par ordinateur et intelligence artificielle pour créer un système de radar capable de détecter et reconnaître automatiquement les plaques d'immatriculation des véhicules en temps réel.",
      technologies: ["Python", "OpenCV", "Machine Learning", "Computer Vision", "OCR"],
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
    "student-grade-manager": {
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
      description: "Collection complète de documents, CV et livres sur la science des données. Couvre l'apprentissage automatique, l'exploration de données, l'entreposage de données, et l'intelligence d'affaires.",
      longDescription: "Repository exhaustif rassemblant une vaste collection de ressources éducatives sur la science des données, incluant des guides pratiques, des documentations techniques, et des références académiques.",
      technologies: ["Data Science", "Machine Learning", "Python", "R", "Documentation"],
      githubUrl: "https://github.com/Ashraf-Khabar/Data-Science-Docs",
      liveUrl: null,
      stars: 3,
      forks: 2,
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