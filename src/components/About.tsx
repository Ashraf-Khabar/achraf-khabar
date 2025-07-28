import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, Palette, Zap, Brain } from "lucide-react";

const About = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
    "Tailwind CSS", "Next.js", "Supabase", "AWS", "Docker"
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Développement Web",
      description: "Applications web modernes et performantes avec les dernières technologies"
    },
    {
      icon: <Palette className="w-8 h-8 text-accent" />,
      title: "UI/UX Design",
      description: "Interfaces utilisateur intuitives et expériences utilisateur optimales"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Optimisation",
      description: "Performance et SEO pour des applications rapides et bien référencées"
    },
    {
      icon: <Brain className="w-8 h-8 text-accent" />,
      title: "Conseil Tech",
      description: "Architecture technique et choix des bonnes technologies pour vos projets"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            À propos de moi
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Développeur passionné avec une expertise dans les technologies modernes
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
              Diplômé en informatique avec plus de 3 ans d'expérience dans le développement web.
              Je me spécialise dans la création d'applications modernes, performantes et user-friendly.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Ma passion pour la technologie me pousse à rester constamment à jour avec les 
              dernières tendances et meilleures pratiques du développement web.
            </p>
            
            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Technologies Maîtrisées</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="glass-card hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="relative animate-fade-in-scale" style={{ animationDelay: "0.4s" }}>
            <div className="aspect-square rounded-2xl glass-card p-8 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Code className="w-20 h-20 text-foreground/60" />
              </div>
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
                className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 group"
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