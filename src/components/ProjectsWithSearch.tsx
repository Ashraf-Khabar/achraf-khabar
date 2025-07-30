import { useState, useMemo } from "react";
import { ExternalLink, Github, Star, GitFork, ChevronDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchProjects from "./SearchProjects";
import { useNavigate } from "react-router-dom";
import flaskosqlImage from "@/assets/flaskosql-project.jpg";
import licencePlateImage from "@/assets/licence-plate-recognition-project.jpg";
import studentGradeImage from "@/assets/student-grade-manager-project.jpg";
import dataScienceImage from "@/assets/data-science-docs-project.jpg";
import testAutomationImage from "@/assets/test-automation-lab-project.jpg";
import smartSpenderImage from "@/assets/smartspender-project.jpg";

const ProjectsWithSearch = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilter, setTechFilter] = useState<string | null>(null);

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
      image: testAutomationImage
    }
  ];

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects based on search and technology filter
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTech = techFilter === null || techFilter === "" || 
        project.technologies.includes(techFilter);

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, techFilter]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Mes Projets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations techniques, allant du développement web à l'intelligence artificielle
          </p>
        </div>

        {/* Search and Filter Component */}
        <div className="mb-12">
          <SearchProjects
            onSearch={setSearchQuery}
            onFilterByTech={(tech) => setTechFilter(tech || null)}
            availableTechnologies={allTechnologies}
            activeTechFilter={techFilter}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Stats Badges */}
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
                    <Badge className="bg-primary text-primary-foreground">
                      Vedette
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => setTechFilter(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Détails
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > 4 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {showAll ? 'Voir moins' : `Voir tous les projets (${filteredProjects.length})`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun projet trouvé pour "{searchQuery}" {techFilter && `avec la technologie "${techFilter}"`}
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => {
                setSearchQuery("");
                setTechFilter(null);
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsWithSearch;