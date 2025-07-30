import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Code, Sparkles } from "lucide-react";
import DownloadCV from "./DownloadCV";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-accent/20 blur-xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-primary/30 blur-lg animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-60 right-10 w-24 h-24 rounded-full bg-accent/25 blur-xl animate-float" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="space-y-8 animate-slide-up">
          {/* Greeting */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-accent mr-2 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-sm text-foreground/80">Bienvenue sur mon portfolio</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-foreground mb-2">Salut, je suis</span>
            <span className="gradient-text animate-fade-in-scale" style={{ animationDelay: "0.5s" }}>
              Software Engineer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "1s" }}>
            Passionné par la création d'expériences web modernes et innovantes. 
            Je transforme les idées en réalité numérique.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-slide-up" style={{ animationDelay: "1.5s" }}>
            <Button 
              size="lg" 
              className="glow-border pulse-glow text-lg px-8 py-3 bg-gradient-to-r from-primary to-accent"
              onClick={scrollToAbout}
            >
              <Code className="w-5 h-5 mr-2" />
              Découvrir mon travail
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-card text-lg px-8 py-3 hover:scale-105 transition-transform duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Me contacter
            </Button>
          </div>

          {/* Download CV Section */}
          <div className="mt-8 animate-slide-up" style={{ animationDelay: "1.8s" }}>
            <DownloadCV />
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center mt-8 animate-slide-up" style={{ animationDelay: "2s" }}>
            <Button variant="ghost" size="sm" className="glass-card hover:scale-110 transition-transform duration-300">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="glass-card hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="glass-card hover:scale-110 transition-transform duration-300">
              <Mail className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;