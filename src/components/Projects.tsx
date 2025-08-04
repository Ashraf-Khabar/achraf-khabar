import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, GitFork, Eye, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import flaskosqlImage from "@/assets/flaskosql-project.jpg";
import licencePlateImage from "@/assets/licence-plate-recognition-project.jpg";
import studentGradeImage from "@/assets/student-grade-manager-project.jpg";
import dataScienceImage from "@/assets/data-science-docs-project.jpg";
import testAutomationImage from "@/assets/test-automation-lab-project.jpg";
import smartSpenderImage from "@/assets/smartspender-project.jpg";

const Projects = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [visibleProjects, setVisibleProjects] = useState(4);
  const PROJECTS_PER_PAGE = 4;
  
  const projects = [
    {
      id: "test-automation-lab",
      title: "Test Automation Lab",
      description: "Laboratoire d'automatisation des tests utilisant Selenium et autres frameworks de test. Fournit une solution complète pour l'automatisation des tests web et API.",
      technologies: ["HTML", "Selenium", "JavaScript", "Test Automation", "QA"],
      githubUrl: "https://github.com/Ashraf-Khabar/Test-Automation-Lab",
      liveUrl: null,
      stars: 0,
      forks: 0,
      featured: true,
      category: "Test Automation / QA",
      image: testAutomationImage
    },
    {
      id: "flaskosql",
      title: "FLASKOSQL",
      description: "ORM pour bases de données relationnelles (Oracle et MySQL) avec API Flask. Fournit une manipulation simple des bases de données et un mapping simplifié.",
      technologies: ["Python", "Flask", "Oracle", "MySQL", "ORM"],
      githubUrl: "https://github.com/Ashraf-Khabar/FLASKOSQL",
      liveUrl: null,
      stars: 1,
      forks: 1,
      featured: true,
      category: "Backend / Database",
      image: flaskosqlImage
    },
    {
      id: "licence-plate-recognition",
      title: "Licence Plate Recognition",
      description: "Système radar innovant pour la détection et reconnaissance des plaques d'immatriculation. Améliore la sécurité routière et facilite l'identification des véhicules.",
      technologies: ["Python", "Flask", "Machine Learning", "AI", "Computer Vision"],
      githubUrl: "https://github.com/Ashraf-Khabar/Licence-plate-recognition",
      liveUrl: null,
      stars: 2,
      forks: 1,
      featured: true,
      category: "Computer Vision / AI",
      image: licencePlateImage
    },
    {
      id: "smartspender",
      title: "SmartSpender",
      description: "Application web de gestion financière intelligente pour aider les utilisateurs à gérer et organiser leur argent. Inclut des fonctionnalités de suivi de budget et de prévention des problèmes financiers.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
      githubUrl: "https://github.com/Ashraf-Khabar/SmartSpender",
      liveUrl: null,
      stars: 0,
      forks: 1,
      featured: false,
      category: "Web Application / FinTech",
      image: smartSpenderImage
    },
    {
      id: "data-science-docs",
      title: "Data Science Documentation Hub",
      description: "Collection complète de documents, CV et livres sur la science des données. Couvre ML, data mining, warehousing, et business intelligence.",
      technologies: ["Data Science", "Machine Learning", "Jupyter Notebook", "Documentation"],
      githubUrl: "https://github.com/Ashraf-Khabar/Data-Science-Docs",
      liveUrl: null,
      stars: 2,
      forks: 1,
      featured: false,
      category: "Documentation / Education",
      image: dataScienceImage
    },
    {
      id: "portfolio",
      title: "Portfolio Web",
      description: "Mon site web personnel construit avec React.js pour présenter tous mes projets et documents. Interface moderne et responsive pour simplifier l'accès à mes réalisations.",
      technologies: ["React", "JavaScript", "HTML", "CSS", "Git"],
      githubUrl: "https://github.com/Ashraf-Khabar/Portfolio",
      liveUrl: "https://achrafkhabar.com",
      stars: 0,
      forks: 0,
      featured: false,
      category: "Web Development",
      image: testAutomationImage // Using existing image temporarily
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
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
                    {t('projects.featured')}
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
                    {t('projects.details')}
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

        {/* Load More Button */}
        {visibleProjects < projects.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="glass-card group"
              onClick={() => setVisibleProjects(prev => Math.min(prev + PROJECTS_PER_PAGE, projects.length))}
            >
              <ChevronDown className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              {t('projects.more')} ({projects.length - visibleProjects} {t('projects.remaining')})
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold gradient-text mb-4">
              {t('projects.cta.title')}
            </h3>
            <p className="text-foreground/70 mb-6">
              {t('projects.cta.description')}
            </p>
            <Button 
              size="lg" 
              className="glow-border pulse-glow"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('projects.cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;