import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Modern",
      description: "Application e-commerce complète avec panier, paiement Stripe et interface admin. Design moderne et responsive.",
      technologies: ["React", "TypeScript", "Stripe", "Supabase", "Tailwind"],
      image: "/api/placeholder/400/250",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard complet avec graphiques interactifs, filtres avancés et export de données en temps réel.",
      technologies: ["Next.js", "Chart.js", "PostgreSQL", "TypeScript"],
      image: "/api/placeholder/400/250",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      title: "Application Mobile",
      description: "App mobile cross-platform pour la gestion de tâches avec synchronisation cloud et notifications push.",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      image: "/api/placeholder/400/250",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false
    },
    {
      title: "API REST",
      description: "API robuste avec authentification JWT, documentation Swagger et tests automatisés complets.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Jest"],
      image: "/api/placeholder/400/250",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false
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
        <div className="grid md:grid-cols-2 gap-8">
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
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center relative">
                  {/* Code Pattern Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 h-full">
                      {[...Array(32)].map((_, i) => (
                        <div
                          key={i}
                          className="border-r border-b border-white/10 animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Icon */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">
                      {project.title.charAt(0)}
                    </span>
                  </div>
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

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="glass-card">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="glass-card">
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
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 glow-border"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </Button>
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