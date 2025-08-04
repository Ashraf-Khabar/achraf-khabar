import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Code, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DownloadCV from "./DownloadCV";
import TypingEffect from "./TypingEffect";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Network Grid Background */}
      <div className="absolute inset-0 z-0" style={{
        background: `
          linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px),
          linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.2) 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, rgba(14, 165, 233, 0.2) 2px, transparent 2px),
          linear-gradient(135deg, hsl(240 15% 8%), hsl(240 15% 12%))
        `,
        backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px, 120px 120px, 120px 120px, 100% 100%'
      }}>
        {/* Network Nodes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${5 + (i % 5) * 22}%`,
                top: `${15 + Math.floor(i / 5) * 20}%`,
              }}
            >
              <div 
                className="w-3 h-3 bg-primary/60 rounded-full animate-pulse border border-primary/80"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '4s',
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
                }}
              />
              {/* Connection lines from each node */}
              {i < 15 && (
                <div 
                  className="absolute top-1/2 left-full w-20 h-px opacity-30 animate-pulse"
                  style={{
                    background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.8), transparent)',
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                />
              )}
              {i < 15 && (
                <div 
                  className="absolute top-full left-1/2 w-px h-16 opacity-30 animate-pulse"
                  style={{
                    background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.8), transparent)',
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: '3.5s'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Animated Data Packets */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* Network Circuit Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 L 25 50 L 35 40 L 65 40 L 75 50 L 100 50" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" fill="none"/>
              <path d="M 50 0 L 50 25 L 60 35 L 60 65 L 50 75 L 50 100" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="2" fill="none"/>
              <circle cx="35" cy="40" r="3" fill="rgba(168, 85, 247, 0.6)"/>
              <circle cx="65" cy="40" r="3" fill="rgba(14, 165, 233, 0.6)"/>
              <circle cx="60" cy="35" r="3" fill="rgba(168, 85, 247, 0.6)"/>
              <circle cx="60" cy="65" r="3" fill="rgba(14, 165, 233, 0.6)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-background/60"></div>
      </div>

      {/* Animated Network Lines */}
      <div className="absolute inset-0 z-10">        
        {/* Network connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
              <stop offset="50%" stopColor="rgba(14, 165, 233, 0.8)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#networkGradient)" strokeWidth="2" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" values="0;15" dur="3s" repeatCount="indefinite"/>
          </line>
          <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="url(#networkGradient)" strokeWidth="2" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" values="0;15" dur="4s" repeatCount="indefinite"/>
          </line>
          <line x1="20%" y1="10%" x2="80%" y2="90%" stroke="url(#networkGradient)" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
          </line>
          <line x1="80%" y1="10%" x2="20%" y2="90%" stroke="url(#networkGradient)" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;10" dur="2.5s" repeatCount="indefinite"/>
          </line>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="space-y-8 animate-slide-up">
          {/* Greeting */}
          <div className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent mr-1.5 sm:mr-2 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-xs sm:text-sm text-foreground/80">{t('hero.welcome')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-foreground mb-2 animate-bounce-in">{t('hero.greeting')}</span>
            <span className="gradient-text text-shadow">
              <TypingEffect 
                words={[t('hero.title'), "Software Engineer", "QA Automation", "Cloud Architect"]}
                speed={150}
                deleteSpeed={75}
                delayBetweenWords={2000}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "1s" }}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-slide-up" style={{ animationDelay: "1.5s" }}>
            <Button 
              size="lg" 
              className="glow-border pulse-glow text-lg px-8 py-3 bg-gradient-to-r from-primary to-accent"
              onClick={scrollToAbout}
            >
              <Code className="w-5 h-5 mr-2" />
              {t('hero.cta.projects')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-card text-lg px-8 py-3 hover:scale-105 transition-transform duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="w-5 h-5 mr-2" />
              {t('hero.cta.contact')}
            </Button>
          </div>

          {/* Download CV Section */}
          <div className="mt-8 animate-slide-up" style={{ animationDelay: "1.8s" }}>
            <DownloadCV />
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center mt-8 animate-slide-up" style={{ animationDelay: "2s" }}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="glass-card hover:scale-110 hover-glow transition-all duration-300 group"
              onClick={() => window.open('https://github.com/Ashraf-Khabar/', '_blank')}
            >
              <Github className="w-5 h-5 group-hover:animate-heartbeat" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="glass-card hover:scale-110 hover-glow transition-all duration-300 group"
              onClick={() => window.open('https://www.linkedin.com/in/achraf-khabar/', '_blank')}
            >
              <Linkedin className="w-5 h-5 group-hover:animate-rainbow" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="glass-card hover:scale-110 hover-glow transition-all duration-300 group"
              onClick={() => window.open('mailto:contact@achrafkhabar.com', '_blank')}
            >
              <Mail className="w-5 h-5 group-hover:animate-wiggle" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;