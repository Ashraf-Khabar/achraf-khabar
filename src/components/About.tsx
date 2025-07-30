import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Settings, TestTube, Database, Cloud, Cpu } from "lucide-react";

const About = () => {
  const skills = [
    "Python", "Selenium", "Docker", "Kubernetes", "Terraform", "Ansible",
    "Jenkins", "GitHub Actions", "GitLab CI", "CI/CD", "AWS", "Azure", 
    "Oracle DB", "MySQL", "Laravel", "PHP", "Machine Learning", 
    "Nexus Sonatype", "SonarQube", "Prometheus", "Grafana", "ELK Stack"
  ];

  const services = [
    {
      icon: <TestTube className="w-8 h-8 text-primary" />,
      title: "Test Automation",
      description: "Scripts d'automatisation des tests avec Python et Selenium pour garantir la qualité"
    },
    {
      icon: <Settings className="w-8 h-8 text-accent" />,
      title: "DevOps & SRE",
      description: "Intégration et déploiement continus (CI/CD) pour des livraisons fiables"
    },
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Bases de Données",
      description: "Expertise Oracle DB et MySQL avec développement d'ORM personnalisés"
    },
    {
      icon: <Cloud className="w-8 h-8 text-accent" />,
      title: "Architecture Système",
      description: "Conception d'architectures robustes et maintien des standards de production"
    }
  ];

  return (
    <section id="about" className="py-20 px-6 relative z-10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-shadow">
            À propos de moi
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            DevOps/SRE & QA Automation Engineer passionné par la fiabilité et l'automatisation
          </p>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-semibold text-foreground">
              Mon Parcours
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Ingénieur Test Automation actuellement en poste, avec des responsabilités incluant 
              l'assurance de la fiabilité des solutions, la garantie de l'intégration et du 
              déploiement continus (CI/CD) en production.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Je développe des scripts d'automatisation en utilisant Python et la bibliothèque Selenium, 
              avec un fort intérêt pour le DevOps et l'architecture logicielle.
            </p>
            
            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Technologies Maîtrisées</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="glass-card hover:scale-105 transition-transform duration-300 animate-bounce-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative animate-fade-in-scale" style={{ animationDelay: "0.4s" }}>
            <div className="aspect-square rounded-2xl glass-card p-2 bg-gradient-to-br from-primary/10 to-accent/10">
              <img 
                src="/lovable-uploads/5e06a28a-8b08-435d-a468-84c80b091cea.png" 
                alt="Ashraf Khabar - DevOps/SRE & QA Automation Engineer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            {/* Social Links */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button 
                size="sm" 
                variant="outline" 
                className="glass-card hover:scale-110 transition-all duration-300"
                onClick={() => window.open('https://github.com/Ashraf-Khabar/', '_blank')}
              >
                GitHub
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="glass-card hover:scale-110 transition-all duration-300"
                onClick={() => window.open('https://www.linkedin.com/in/achraf-khabar/', '_blank')}
              >
                LinkedIn
              </Button>
            </div>
            
            {/* Floating elements around profile */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/40 blur-sm animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-accent/40 blur-sm animate-float" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>

        {/* Services */}
        <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-3xl font-bold text-center gradient-text mb-12">
            Ce que je propose
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 group animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-foreground/70">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;