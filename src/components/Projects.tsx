import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, GitFork, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import flaskosqlImage from "@/assets/flaskosql-project.jpg";
import licencePlateImage from "@/assets/licence-plate-recognition-project.jpg";
import studentGradeImage from "@/assets/student-grade-manager-project.jpg";
import dataScienceImage from "@/assets/data-science-docs-project.jpg";

const Projects = () => {
  const navigate = useNavigate();
  const projects = [
    {
      id: "flaskosql",
      title: "FLASKOSQL",
      description: "ORM pour bases de données relationnelles (Oracle et MySQL) avec API Flask. Fournit une manipulation simple des bases de données et un mapping simplifié.",
      technologies: ["Python", "Flask", "Oracle", "MySQL", "ORM"],
      githubUrl: "https://github.com/Ashraf-Khabar/FLASKOSQL",
      liveUrl: "https://achrafkhabar.com/flaskoSQL",
      stars: 1,
      forks: 1,
      featured: true,
      category: "Backend / Database",
      image: flaskosqlImage
    },
    {
      id: "licence-plate-recognition",
      title: "Vehicle License Plate Recognition",
      description: "Système radar innovant pour la détection et reconnaissance des plaques d'immatriculation. Améliore la sécurité routière et facilite l'identification des véhicules.",
      technologies: ["Python", "OpenCV", "Machine Learning", "Computer Vision", "OCR"],
      githubUrl: "https://github.com/Ashraf-Khabar/Licence-plate-recognition",
      liveUrl: null,
      stars: 2,
      forks: 1,
      featured: true,
      category: "Computer Vision / AI",
      image: licencePlateImage
    },
    {
      id: "student-grade-manager",
      title: "Student Grade Manager",
      description: "Application web complète pour la gestion des notes étudiantes par modules, matières et enseignants. Construite avec Laravel et Oracle DB.",
      technologies: ["Laravel", "PHP", "Oracle DB", "Bootstrap", "JavaScript"],
      githubUrl: "https://github.com/Ashraf-Khabar/StudentGradeManager",
      liveUrl: null,
      stars: 1,
      forks: 0,
      featured: false,
      category: "Web Application",
      image: studentGradeImage
    },
    {
      id: "data-science-docs",
      title: "Data Science Documentation Hub",
      description: "Collection complète de documents, CV et livres sur la science des données. Couvre ML, data mining, warehousing, et business intelligence.",
      technologies: ["Data Science", "Machine Learning", "Python", "R", "Documentation"],
      githubUrl: "https://github.com/Ashraf-Khabar/Data-Science-Docs",
      liveUrl: null,
      stars: 3,
      forks: 2,
      featured: false,
      category: "Documentation / Education",
      image: dataScienceImage
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Mes Projets
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Une sélection de mes réalisations récentes et projets personnels
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className={`glass-card overflow-hidden hover:scale-105 transition-all duration-500 group ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                  
                {/* GitHub Stats */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.stars}
                  </Badge>
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    {project.forks}
                  </Badge>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Projet Phare
                    </Badge>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="outline" className="glass-card text-xs">
                    {project.category}
                  </Badge>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass-card"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {project.liveUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="glass-card"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass-card"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 glow-border text-xs sm:text-sm"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Voir les détails
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="glass-card"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold gradient-text mb-4">
              Vous avez un projet en tête ?
            </h3>
            <p className="text-foreground/70 mb-6">
              N'hésitez pas à me contacter pour discuter de votre idée. 
              Je serais ravi de vous aider à la concrétiser !
            </p>
            <Button 
              size="lg" 
              className="glow-border pulse-glow"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Discutons de votre projet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;